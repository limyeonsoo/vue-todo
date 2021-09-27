<template>
  <div id="listBox" v-if="showFilteringBox">
    <div v-for="(todo, key, index) in filteredToDoList" :key="index" @mouseenter="showXBtnIdx = todo.idx" @mouseleave="showXBtnIdx = null">
      <li>
        <input class="firstInput" :id="todo.idx" v-model="todo['checked']" type="checkbox" @change="onClickChecked"/>
        <div class="secondInputWrapper" style="display:inline-block; position:relative;">
<!--          <input :id="'InputForFix'+todo.idx" :wrapId="todo.idx" class="secondInput" :value="todo.content" @focusout="onFixFocusOut" @keypress="onFixEnter"/>-->
          <input :id="'InputForFix'+todo.idx" :wrapId="todo.idx" class="secondInput" @focusout="onFixFocusOut" @keypress="onFixEnter"/>
          <div :id="'DivForFix'+todo.idx" :wrapId="todo.idx" class="secondDiv" @dblclick="onFixDblClicked" style="position:absolute; left:0; right:0; top:0; bottom:0;" >
            {{todo.content}}
          </div>
        </div>
        <span v-show="showXBtnIdx === todo.idx" :id="todo.idx" class="listX" @click="onListXClicked">x</span>
      </li>
    </div>
    <div id="filterBoxContainer">
      <span id="filterInfo" style="font-size:x-small">{{toDoListCount}} items left</span>
      <div id="filterBox" @click="onFilterClicked">
        <div class="filterBoxChild" :class="{ activeBorder: 'All' ===  currentFiltering }">All</div>
        <div class="filterBoxChild" :class="{ activeBorder: 'Active' ===  currentFiltering }">Active</div>
        <div class="filterBoxChild" :class="{ activeBorder: 'Completed' ===  currentFiltering }">Completed</div>
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
    filtering: String,
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
    toDoListCount(){
      return this.todoList.filter(todo => todo.type === 'Active').length;
    },
    showFilteringBox(){
      return this.todoList.length !== 0;
    },
    currentFiltering(){
      return this.filtering;
    }
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
    },
    onFixDblClicked(event){
      let index = event.target.getAttribute('wrapId');
      let secondTargetInput = document.querySelector('#InputForFix'+index);
      event.target.style.display = 'none';
      // event.target.style.zIndex = -99;
      secondTargetInput.focus();
    },
    onFixFocusOut(event){
      let index = event.target.getAttribute('wrapId');
      let secondTargetDiv = document.querySelector('#DivForFix'+index);
      event.target.value = "";
      secondTargetDiv.style.display = 'block';
    },
    onFixEnter(event){
      this.$emit('fix-enter', event);
    },
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
  padding: 2%;
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
  border: 1px solid rgba(125, 125, 125, 0.3);
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  margin: 0 3% 0 0;
}
.secondInputWrapper{
  width: 80%;
}
.secondInput{
  width: 100%;
  height: 100%;
  border: none;
  font-weight: bold;
  font-size: large;
  background-color: transparent;
}
.secondDiv{
  -webkit-transition: color 0.5s ease-in-out;
  transition: color 0.5s ease-in-out;
}
.firstInput:checked{
  background: url('../assets/checkItalic.png') center no-repeat;
  background-size: 13px;
  overflow: hidden;
  border-color: #5DC2AF;
}
.firstInput:checked + .secondInputWrapper > .secondDiv{
  color: rgba(125, 125, 125, 0.5);
  text-decoration: line-through;
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
  border-top: 1px solid lightgray;
}

#filterBox{
  display: flex;
  justify-content: center;
  padding: 5px 10%;
  flex-grow: 1;
}

.filterBoxChild{
  padding: 1% 3%;
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 5px;
}

.filterBoxChild:hover{
  border: 2px solid rgba(255,0,0,0.2);
}
.activeBorder{
  border: 2px solid rgba(255, 0, 0, 0.3);
}
</style>