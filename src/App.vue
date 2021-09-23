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
    />
  </div>
</template>

<script>
import Box from './components/Box.vue';
import {uuid} from 'vue-uuid';

export default {
  name: 'App',
  data(){
    return{
      filtering: 'All',
      todoList:[]
      /* {
            content: string,
            type: string,  (Active / Completed)
      */,
    }
  },
  components: { Box },
  methods:{
    onClickEnter(event){
      if(event.key === 'Enter'){
        // 이거 고쳐야함. input에 value를 data로 선언적으로.
        let inputTag = document.querySelector('#inputBox');
        if(inputTag.value === '') return;
        this.todoList.push({
          idx: uuid.v1(),
          content:inputTag.value,
          type: 'Active',
          checked: null
        })
        inputTag.value = '';
      }
    },
    onClickChecked(id, checked){
      console.log(id);
      console.log(checked);
      let updateTargetIndex = this.todoList.findIndex(todo => todo.idx === id);
      if(checked){
        this.$set(this.todoList, updateTargetIndex, {
          ...this.todoList[updateTargetIndex],
          type: 'Completed',
          checked: true
        })
      }
      else {
        this.$set(this.todoList, updateTargetIndex, {
          ...this.todoList[updateTargetIndex],
          type: 'Active',
          checked: null
        })
      }
    },
    onMouseEntered(target){
      target.lastChild.classList.remove('hideX');
      target.lastChild.classList.add('showX');
    },
    onMouseLeaved(target){
      target.lastChild.classList.remove('showX');
      target.lastChild.classList.add('hideX');
    },
    onListXClicked(id){
      let removeTargetIndex = this.todoList.findIndex(todo => todo.idx === id);
      this.todoList.splice(removeTargetIndex, 1);
    },
    onFilterClicked(filtering){
      this.filtering = filtering;
    },
    onClearClicked(){
      this.todoList = this.todoList.filter(todo => todo.type === 'Active')
    },
    onIconClicked(){
      let currState = this.todoList.filter(todo => todo.checked === true).length;
      console.log(currState, this.todoList.length);
      if(currState === this.todoList.length){
        this.todoList.forEach(todo => {
          todo.type = 'Active';
          todo.checked = null;
        })
      }else{
        this.todoList.forEach(todo => {
          todo.type = 'Completed';
          todo.checked = true;
        })
      }
      console.log(JSON.stringify(this.todoList));
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
}
#todos{
  font-size: 125px;
  color: rgba(255, 0, 0, 0.3);
}
</style>
