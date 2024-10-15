import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
createApp({
  data() {
    return {
      inputTasks: null,
      tasklist: [],
      finishedTasks: [],
      inputValue: "",
      storageList: [],
      currenIndex: null,
    };
  },
  computed: {
    showFinishedTasks() {
      return this.finishedTasks.length > 0;
    },
    showUnfinishedTasks() {
      return this.tasklist.length > 0;
    },
  },
  methods: {
    addTask() {
      this.tasklist.push({ text: this.inputTasks, completed: false });
      this.inputTasks = null;
    },
    removeTask(index) {
      const completedTask = this.tasklist[index];
      completedTask.completed = true;
      this.finishedTasks.push(completedTask);
      this.tasklist.splice(index, 1);
    },

    changeRemoveTask(index) {
      const changeTask = this.finishedTasks[index];
      changeTask.completed = false;
      this.tasklist.push(changeTask);
      this.finishedTasks.splice(index, 1);
    },

    deleteTaks() {
      this.finishedTasks = [];
    },
    saveList() {
      localStorage.setItem("tasklist", JSON.stringify(this.tasklist));
    },
    getList() {
      const store = localStorage.getItem("tasklist");
      if (store) {
        this.tasklist = JSON.parse(store);
      }
    },
    /* newListTasks() {
      if (this.inputValue) {
        this.storageList.push({ name: this.inputValue, tasks: [] });
      }
    },
    clickSavedTask() {},*/
  },
}).mount("#app");
