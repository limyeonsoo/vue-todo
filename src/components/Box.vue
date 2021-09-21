<template>
  <div id="box">
    <input id="inputBox"
           placeholder="What needs to be done?"
           @keypress="onClickEnter"
    />
    <List
      :todo-list="todoList"
      :filtering="filtering"
      @check-clicked="onCheckClicked"
      @mouse-entered="onMouseEntered"
      @mouse-leaved="onMouseLeaved"
      @list-x-clicked="onListXClicked"
      @filter-clicked="onFilterClicked"
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
  props:{
    todoList: Array,
    filtering: String
  },
  methods:{
    onClickEnter(event){
      this.$emit('click-enter', event);
    },
    onCheckClicked(id, checked){
      this.$emit('click-checked', id, checked);
    },
    onListXClicked(target){
      this.$emit('list-x-clicked', target);
    },
    onMouseEntered(target){
      target.lastChild.classList.remove('hideX');
      target.lastChild.classList.add('showX');
    },
    onMouseLeaved(target){
      target.lastChild.classList.remove('showX');
      target.lastChild.classList.add('hideX');
    },
    onFilterClicked(filtering){
      this.$emit('filter-clicked', filtering);
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