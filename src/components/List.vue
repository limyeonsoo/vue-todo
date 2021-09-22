<template>
  <div id="listBox">
    <div v-for="(todo, key, index) in filteredToDoList" :key="index">
      <li :style="{textDecoration: todo.type === 'Completed' ? 'line-through' : 'none'}" @mouseenter="onMouseOver" @mouseleave="onMouseOut">
        <input :id="todo.idx" v-model="todo['checked']" type="checkbox" @change="onClickChecked"/>
        <label :for="todo.idx">{{todo.content}}</label>
        <span class="listX hideX" @click="onListXClicked">x</span>
      </li>
    </div>
    <div id="filterBoxContainer" v-show="filteredToDoList">
      <div id="filterInfo" style="font-size:x-small">{{filteredToDoList.length}} items left</div>
      <div id="filterBox" @click="onFilterClicked">
        <div class="filterBoxChild">All</div>
        <div class="filterBoxChild">Active</div>
        <div class="filterBoxChild">Completed</div>
      </div>
      <div>&nbsp;</div>
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
      this.$emit('list-x-clicked', event.target);
    },
    onFilterClicked(event){
      this.$emit('filter-clicked', event.target.textContent);
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
  padding-left: 0;
  list-style: none;
  border: 1px solid lightgray;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  padding: 2%;
}

#filterInfo{
  width: 33%;
}
#filterBox{
  width: 33%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
}
.filterBoxChild:hover{
  outline: 1px solid red;
}
</style>