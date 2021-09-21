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
    />
  </div>
</template>

<script>
import Box from './components/Box.vue';

export default {
  name: 'App',
  data(){
    return{
      filtering: 'All',
      todoList:[]
      /* {
            content: string,
            type: string,  (Active / Completed)
      */
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
          idx: this.todoList.length,
          content:inputTag.value,
          type: 'Active',
          checked: null
        })
        inputTag.value = '';
      }
    },
    onClickChecked(id, checked){
      console.log(id, checked);
      if(checked){

        console.log(Object.values(this.todoList));
        this.$set(this.todoList, id, {
          ...this.todoList[id],
          type: 'Completed',
          checked: true
        })
        console.log(Object.values(this.todoList));
      }
      else {
        //this.todoList[id].type = 'Active';
        //this.todoList[id].checked = null;
        //this.todoList.$set(this.todoList, 'checked', null);

        console.log(Object.values(this.todoList));
        this.$set(this.todoList, id, {
          ...this.todoList[id],
          type: 'Active',
          checked: null
        })
        console.log(Object.values(this.todoList));
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
    onListXClicked(target){
      let removedTargetId = target.getAttribute('id');
      this.todoList.splice(removedTargetId, 1);
    },
    onFilterClicked(filtering){
      this.filtering = filtering;
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
