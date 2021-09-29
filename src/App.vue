<template>
  <div id="app">
    <div id="todos">todos</div>
    <Box
        :todo-list="todoList"
        :filtering="filtering"
        @click-enter="onClickEnter"
        @click-checked="onClickChecked"
        @list-x-clicked="onListXClicked"
        @filter-clicked="onFilterClicked"
        @clear-clicked="onClearClicked"
        @icon-clicked="onIconClicked"
        @fix-enter="onFixEnter"
    />
  </div>
</template>

<script>
import Box from './components/Box.vue';
import {uuid} from 'vue-uuid';
import {todoGet, todoPost, todoDelete, todoUpdate, todoPatchContent, todoPatchStatus} from './service/todoService';

export default {
  name: 'App',
  data(){
    return{
      filtering: 'All',
      todoList:[]
      /* {
            content: string,
            type: string,  (Active / Completed)
            checked: null / true
         }
         details
         id
         status
      */,
      fixState:false,
    }
  },
  async mounted(){
    const res = await todoGet();
    res.data.map((todo) => {
      this.todoList.push({
        idx: todo.id,
        content:todo.details,
        type: todo.status === 'active' ? 'Active' : 'Completed',
        checked: todo.status === 'active' ? null : true,
      })
    })
  },
  components: { Box },
  methods:{
    async onClickEnter(event){
      if(event.key === 'Enter'){
        let inputTag = document.querySelector('#inputBox');
        if(inputTag.value === '') return;
        let newId = uuid.v1();
        let newContent = inputTag.value;
        this.todoList.push({
          idx: newId,
          content:newContent,
          type: 'Active',
          checked: null
        })
        inputTag.value = '';

        await todoPost(newId, newContent);
      }
    },
    async onClickChecked(id, checked){
      let updateTargetIndex = this.todoList.findIndex(todo => todo.idx === id);
      if(checked){
        this.$set(this.todoList, updateTargetIndex, {
          ...this.todoList[updateTargetIndex],
          type: 'Completed',
          checked: true
        })

        await todoPatchStatus(id, 'done');
      }
      else {
        this.$set(this.todoList, updateTargetIndex, {
          ...this.todoList[updateTargetIndex],
          type: 'Active',
          checked: null
        })
        await todoPatchStatus(id, 'active');
      }
    },
    async onListXClicked(id){
      let removeTargetIndex = this.todoList.findIndex(todo => todo.idx === id);
      this.todoList.splice(removeTargetIndex, 1);

      await todoDelete(id);
    },
    onFilterClicked(filtering){
      this.filtering = filtering;
    },
    onClearClicked(){
      this.todoList.forEach(async (todo) => {
        if(todo.type === 'Completed'){
          await todoDelete(todo.idx);
        }
      })
      this.todoList = this.todoList.filter(todo => todo.type === 'Active')
    },
    onIconClicked(){
      let currState = this.todoList.filter(todo => todo.checked === true).length;
      let checkBtn = document.querySelector('#allCheckIcon');
      if(currState === this.todoList.length){
        this.todoList.forEach(async (todo) => {
          todo.type = 'Active';
          todo.checked = null;

          await todoUpdate(todo.idx, todo.content, todo.type)
        })
        checkBtn.style.opacity = 0.4;
      }else{
        this.todoList.forEach(async (todo) => {
          todo.type = 'Completed';
          todo.checked = true;

          await todoUpdate(todo.idx, todo.content, todo.type)
        })
        checkBtn.style.opacity = 1.0;
      }
    },
    async onFixEnter(event){
      if(event.key === 'Enter') {
        let id = event.target.getAttribute('wrapId');
        let val = event.target.value;
        let fixTargetIndex = this.todoList.findIndex(todo => todo.idx === id);
        this.$set(this.todoList, fixTargetIndex, {
          ...this.todoList[fixTargetIndex],
          content: val,
        })
        event.target.blur();

        await todoPatchContent(id, val);
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  user-select: none;
}
#todos{
  font-size: 125px;
  color: rgba(255, 0, 0, 0.3);
}
</style>
