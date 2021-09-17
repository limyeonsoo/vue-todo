<template>
  <div id="listBox">
    <div v-for="(todo, index) in todoList" :key="index">
      <li @mouseenter="onMouseOver" @mouseleave="onMouseOut">
        <input type="checkbox" @change="onClickChecked"/>
        {{todo.content}}
        <span :id="index" class="listX hideX" @click="onListXClicked">x</span>
      </li>
    </div>
    <div id="filterBoxContainer" v-if="showToolBox">
      <span style="font-size:x-small">{{this.todoList.length}} items left</span>
      <div id="filterBox">
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
  },
  computed:{
    showToolBox(){ return this.todoList.length;}
  },
  methods:{
    onClickChecked(event){
      this.$emit('check-clicked', event.target)
    },
    onMouseOver(event){
      this.$emit('mouse-entered', event.target)
    },
    onMouseOut(event){
      this.$emit('mouse-leaved', event.target);
    },
    onListXClicked(event){
      this.$emit('list-x-clicked', event.target);
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
.showX{
  display: block;
}
#filterBoxContainer{
  line-height: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
#filterBox{
  display: flex;
  width: 60%;
  justify-content: space-evenly
}
.filterBoxChild{
  padding: 3px;
}
.filterBoxChild:hover{
  border: 1px solid red;
}
</style>