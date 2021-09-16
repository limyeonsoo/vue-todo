<template>
  <div id="listBox">
    <div v-for="(todo, index) in todoList" :key="index">
      <li @mouseenter="onMouseOver" @mouseleave="onMouseOut">
        <input type="checkbox" @change="onClickChecked"/>
        {{todo.content}}
        <span class="listX hideX" @click="onListXClicked">x</span>
      </li>
    </div>
  </div>

</template>

<script>
export default {
  name: "list",
  props: {
    todoList: Array,
  },
  methods:{
    onClickChecked(event){
      this.$emit('check-clicked', event.target)
    },
    onMouseOver(event){
      console.log(event.target.lastChild);
        event.target.lastChild.classList.remove('hideX')
        event.target.lastChild.classList.add('showX');
    },
    onMouseOut(event){
      event.target.lastChild.classList.remove('showX');
      event.target.lastChild.classList.add('hideX');
    },
    onListXClicked(event){
      console.log(event.target);
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
</style>