<template>
  <div id="box">
    <input id="inputBox"
           placeholder="What needs to be done?"
           @input="onChangeInput($event)"
           @keypress="onClickEnter"
    />
    <List
      :todo-list="todoList"
      @check-clicked="onCheckClicked"
      @mouse-entered="onMouseEntered"
      @mouse-leaved="onMouseLeaved"
      @list-x-clicked="onListXClicked"
    />
  </div>
</template>

<script>
import List from './List';
export default {
  name: "Box",
  components:{
    List,
  },
  data(){
    return{
      todoList:[
        { idx:'1', content: 'clover' },
        { idx:'2', content: 'milo' },
        { idx:'3', content: 'kwang' },
        { idx:'4', content: 'monc' },
      ]
    }
  },
  methods:{
    onChangeInput(){
      const value = document.querySelector('#inputBox').value;
      console.log(value)
    },
    onClickEnter(event){
      if(event.key === 'Enter'){
        let inputTag = document.querySelector('#inputBox');
        if(inputTag.value === '') return;
        this.todoList.push({idx:this.todoList.length+1, content:inputTag.value})
        inputTag.value = '';
      }
    },
    onCheckClicked(target){
      if(target.checked){
        target.parentElement.style.textDecoration="line-through";
      }else{
        target.parentElement.style.textDecoration="none";
      }
    },
    onMouseEntered(target){
      console.log(target);
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

<style scoped>
  #box{
    margin-right: auto;
    margin-left: auto;
    width: 50%;
    border: 1px solid lightgray;
  }
  #inputBox{
    width:89%;
    height:40px;
    padding-left: 10%;
    font-size: x-large;
  }
</style>