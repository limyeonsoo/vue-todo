<template>
  <div id="box">
    <div id="inputBoxContainer">
      <img v-show="showIcon" @click="onIconClicked" src="../assets/check.png"/>
      <input id="inputBox"
             placeholder="What needs to be done?"
             @keypress="onClickEnter"
      />

    </div>
    <List
      :todo-list="todoList"
      :filtering="filtering"
      @check-clicked="onCheckClicked"
      @list-x-clicked="onListXClicked"
      @filter-clicked="onFilterClicked"
      @clear-clicked="onClearClicked"
      @fix-enter="onFixEnter"
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
    filtering: String,
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
    },
    onFixEnter(event){
      this.$emit('fix-enter', event);
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
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 2%;
  }
  #inputBoxContainer > img{
    margin-right: 3%;
    width: 1em;
    height: 1em;
    opacity: 0.4;
  }
  #inputBox{
    height:50px;
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
    font-style: italic;
    opacity: 0.6;
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