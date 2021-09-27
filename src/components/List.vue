<template>
  <div id="listBox" v-if="showFilteringBox">
    <div v-for="(todo, key, index) in filteredToDoList" :key="index" @mouseenter="showXBtnIdx = todo.idx" @mouseleave="showXBtnIdx = null">
      <li>
        <input class="firstInput" :id="todo.idx" v-model="todo['checked']" type="checkbox" @change="onClickChecked"/>
        <input class="secondInput" :value="todo.content" />
        <span v-show="showXBtnIdx === todo.idx" :id="todo.idx" class="listX" @click="onListXClicked">x</span>
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
  data(){
    return{
      showXBtnIdx: null
    }
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
  padding-left: 2%;
  list-style: none;
  border-top: 1px solid lightgray;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
li > .firstInput{
  width: 1.6em;
  height: 1.6em;
  background-color: white;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid rgba(0, 255, 0, 0.7);
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  margin-right: 3%;
}
li > .secondInput{
  width: 70%;
  height: 100%;
  border: none;
}
li > .firstInput:checked{
  background: url('../assets/check.png');
  background-size: 1.6em;
  overflow: hidden;
}
li > .firstInput:checked + .secondInput{
  color: gray;
  opacity: 0.5;
  text-decoration: line-through;
  transition: opacity 0.3s;
}
.listX{
  float:right;
  margin-right:10px;
  color: rgba(255,0,0,0.3);
}
#filterBoxContainer{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2%;

  box-shadow:
      0 1px 1px rgba(0,0,0,0.1),
      0 10px 0 -5px #fff,
      0 10px 1px -4px rgba(0,0,0,0.2),
      0 20px 0 -10px #fff,
      0 20px 1px -9px rgba(0,0,0,0.2);
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