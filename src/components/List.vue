<template>
  <div id="listBox" v-if="showFilteringBox">
    <div v-for="(todo, key, index) in filteredToDoList" :key="index">
      <li :style="{textDecoration: todo.type === 'Completed' ? 'line-through' : 'none'}" @mouseenter="onMouseOver" @mouseleave="onMouseOut">
        <input :id="todo.idx" v-model="todo['checked']" type="checkbox" @change="onClickChecked"/>
        <label :for="todo.idx">{{todo.content}}</label>
        <span :id="todo.idx" class="listX hideX" @click="onListXClicked">x</span>
      </li>
    </div>
    <div id="filterBoxContainer">
      <span id="filterInfo" style="font-size:x-small">{{filteredToDoList.length}} items left</span>
      <div id="filterBox" @click="onFilterClicked">
        <div class="filterBoxChild">All</div>
        <div class="filterBoxChild">Active</div>
        <div class="filterBoxChild">Completed</div>
      </div>
      <div id="allClearBox" @click="onClearClicked">Clear completed</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    todoList: Array,
    filtering: String
  },
  computed:{
    filteredToDoList(){
      if(this.filtering === 'All')
        return this.todoList;
      else
        return this.todoList.filter(todo => todo.type === this.filtering);
    },
    showFilteringBox(){
      return this.todoList.length !== 0;
    },
  },
  methods:{
    onClickChecked(event){
      this.$emit('check-clicked', event.target.id, event.target.checked)
    },
    onMouseOver(event){
      this.$emit('mouse-entered', event.target)
    },
    onMouseOut(event){
      this.$emit('mouse-leaved', event.target);
    },
    onListXClicked(event) {
      this.$emit('list-x-clicked', event.target.id);
    },
    onFilterClicked(event){
      this.$emit('filter-clicked', event.target.textContent);
    },
    onClearClicked(){
      this.$emit('clear-clicked');
    }
  }
}
</script>

<style scoped>
#listBox{
  width: 100%;
  text-align: left;
}
li{
  font-size: x-large;
  padding-left: 4%;
  list-style: none;
  border: 1px solid lightgray;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
li > input{
  width: 1.3em;
  height: 1.3em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid rgba(0, 255, 0, 0.7);
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
}
li > input:checked{
  background: url('../assets/check.png');
  background-size: 1.3em;
  overflow: hidden;
}
li > input:checked + label{
  color: gray;
  opacity: 0.5;
  transition: opacity 0.3s;
}
.listX{
  float:right;
  margin-right:10px;
  color: rgba(255,0,0,0.3);
}
.hideX{
  display: none;
}
.showDecoration{
  text-decoration: line-through;
}
#filterBoxContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2%;
  margin-left: 3%;
}

#filterBox{
  display: flex;
  justify-content: space-evenly;
  padding: 5px 10%;
  flex-grow: 1;
}
.filterBoxChild:hover {
  outline: 1px solid red;
}
</style>