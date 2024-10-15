import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
createApp({
  data() {
    return {
      inputTasks: null,
      tasklist: [],
      finishedTasks: [],
      inputValue: "",
      storageList: [],
      currentIndex: null,
    };
  },
  computed: {
    checkIndexOfTask() {
      return this.currentIndex !== null
        ? this.storageList[this.currentIndex].tasks
        : [];
    },

    showFinishedTasks() {
      return this.finishedTasks.length > 0;
    },
    showUnfinishedTasks() {
      return this.tasklist.length > 0;
    },
    showCurrentList() {
      if (this.currentIndex == null) {
        return "";
      }
      return this.storageList[this.currentIndex].name;
    },
  },
  methods: {
    addTask() {
      if (this.inputTasks && this.currentIndex !== null) {
        this.storageList[this.currentIndex].tasks.push({
          text: this.inputTasks,
          completed: false,
          /* this.storageList[this.currentIndex].tasks.push({
            text: this.in
          })*/
        });
        (this.inputTasks = null), this.saveStorage();
      }
      /*this.tasklist.push({ text: this.inputTasks, completed: false });
      this.inputTasks = null;*/
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
      //localStorage.setItem("tasklist", JSON.stringify(this.tasklist));
      this.saveStorage();
    },

    saveStorage() {
      localStorage.setItem("tasklists", JSON.stringify(this.storageList));
    },

    loadStorage() {
      const store = localStorage.getItem("tasklists");
      if (store) {
        this.storageList = JSON.parse(store);
      }
    },

    getList() {
      const store = localStorage.getItem("tasklist");
      if (store) {
        this.tasklist = JSON.parse(store);
      }
    },
    newListTasks() {
      if (this.inputValue) {
        this.storageList.push({ name: this.inputValue, tasks: [] });
        this.inputValue = "";
        this.saveStorage();
      }
    },
    switchList(index) {
      this.currentIndex = index;
    },
  },
  mounted() {
    this.loadStorage();
  },
}).mount("#app");
