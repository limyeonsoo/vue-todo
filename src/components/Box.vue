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
    width: 60%;
    border: 1px solid lightgray;
  }
  #inputBoxContainer{
    position: relative;
  }
  #inputBox{
    width:90%;
    height:50px;
    padding-left: 10%;
    padding-right: 0;
    font-size: 24px;
    border: none;
    border-bottom: 1px;
    overflow: hidden;

    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #inputBox::placeholder{
    text-overflow:ellipsis;
  }
  #inputBox:focus{
    outline:none;
  }
  #inputBoxContainer > i{
    position: absolute;
    left: 4%;
    top: 15px;
    font-weight: bolder;
    color: rgba(111, 111, 111, 0.5);
  }
</style>