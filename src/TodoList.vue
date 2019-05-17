<template>
  <div>
    <!-- 创建一个 todo-item 组件的实例 -->
    <!--<todo-item></todo-item>-->
    <!-- {{message}} -->
    <input v-model="inputValue" v-focus/>
    <button @click="clickHandle">提交</button>
    <todoitem v-for="(item, index) of todoList" :key="index" :content="item" :index="index"
              @delete="faterListerner"></todoitem>
    <button @click="getMyName">路由</button>
    <router-link to="/router_0">Go to Foo</router-link>
    <router-link to="/router_1">Go to Bar</router-link>
    <router-link to="/router_2">Go to Coo</router-link>
    <router-link to="/user/">Go to Coo</router-link>
    <router-view></router-view>

    <!-- <animtionitem></animtionitem> -->

  </div>
</template>

<script>
  import Vue from 'vue'
  import todoItem from "./components/TodoItem"
  import animationItem from "./components/animationTest"
  import VueRouter from "vue-router";

  let myMixin = {
    created: function () {
      this.hello()
    },
    methods: {
      hello: function () {
        console.log('hello from mixin!')
      },
      getMyName: function () {
        console.log(this.myPageName);
      }
    },
    computed: {
      myPageName: function () {
        return this.$route.params.username;
      }
    }
  }
  export default {
    components: {
      todoitem: todoItem,
      animtionitem: animationItem
    },
    mixins: [myMixin],
    name: 'TodoList',
    data() {
      return {
        inputValue: '',
        todoList: []
      }
    },
    methods: {
      clickHandle() {
         this.todoList.push(this.inputValue);
         this.inputValue = '';
      },
      faterListerner(index) {
        this.todoList.splice(index, 1)
      }
    }
  }
  // 定义一个混入对象


  // 定义一个使用混入对象的组件
  // 	var Component = Vue.extend({
  // 		mixins: [myMixin]
  // 	})
  //
  // 	var component = new Component() // => "hello from mixin!"
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
