<template>
  <div id="box">
    <input id="inputBox" placeholder="What needs to be done?"/>
    <List
      :todo-list="todoList"
      @check-clicked="onCheckClicked"
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
    onCheckClicked(target){
      if(target.checked){
        target.parentElement.style.textDecoration="line-through";
      }else{
        target.parentElement.style.textDecoration="none";
      }
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