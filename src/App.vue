<template>
  <div id="app">
    <div id="todos">todos</div>
    <Box
        :todo-list="todoList"
        @change-input="onChangeInput"
        @click-enter="onClickEnter"
        @click-check="onClickCheck"
        @list-x-clicked="onListXClicked"
    />
  </div>
</template>

<script>
import Box from './components/Box.vue';

export default {
  name: 'App',
  components: { Box },
  data(){
    return{
      todoList:[]
    }
  },
  methods:{
    onChangeInput(){
      const value = document.querySelector('#inputBox').value;
      console.log(value)
    },
    onClickEnter(event){
      console.log(event);
      if(event.key === 'Enter'){
        let inputTag = document.querySelector('#inputBox');
        if(inputTag.value === '') return;
        this.todoList.push({idx:String(this.todoList.length+1), content:inputTag.value})
        inputTag.value = '';
      }
    },
    onClickCheck(target){
      if(target.checked){
        target.parentElement.style.textDecoration="line-through";
      }else{
        target.parentElement.style.textDecoration="none";
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
