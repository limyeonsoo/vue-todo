<template>
  <div id="listBox">
    <div v-for="(todo, index) in todoList" :key="index">
      <li>
        <input type="checkbox" @change="check($event)"/>
        {{todo.content}}
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
    check(event){
      console.log(event);
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
</style>