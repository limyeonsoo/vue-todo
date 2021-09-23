<template>
  <div id="box">
    <div id="inputBoxContainer">
      <input id="inputBox"
             placeholder="What needs to be done?"
             @keypress="onClickEnter"
      />
      <i v-if="showIcon" for="inputBox" @click="onIconClicked">V</i>
    </div>
    <List
      :todo-list="todoList"
      :filtering="filtering"
      @check-clicked="onCheckClicked"
      @mouse-entered="onMouseEntered"
      @mouse-leaved="onMouseLeaved"
      @list-x-clicked="onListXClicked"
      @filter-clicked="onFilterClicked"
      @clear-clicked="onClearClicked"
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
  computed:{
    showIcon(){
      return this.todoList.length;
    }
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
    },
    onClearClicked(){
      this.$emit('clear-clicked');
    },
    onIconClicked(){
      this.$emit('icon-clicked');
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
  #inputBoxContainer{
    position: relative;
  }
  #inputBox{
    width:89%;
    height:40px;
    padding-left: 10%;
    font-size: x-large;
  }
  #inputBoxContainer > i{
    position: absolute;
    left: 5%;
    top: 15px;
    font-weight: bolder;
    color: rgba(111, 111, 111, 0.5);
  }
</style>