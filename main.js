import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      inputTask: "",
      storageInput: "",
      //taskList: [],
      storageList: [],
      currentStorageIndex: 0,
      //isActive: false,
      isDarkMode: false,
    };
  },

  computed: {
    currentTasks() {
      return this.storageList[this.currentStorageIndex].tasks;
    },
  },

  methods: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      console.log("Dark mode status:", this.isDarkMode); // Debugging log
      document.body.classList.toggle("dark-mode", this.isDarkMode);
      localStorage.setItem("darkMode", this.isDarkMode); // Save the state
    },

    addTask() {
      if (this.inputTask && this.currentStorageIndex !== null) {
        console.log("work");
        this.currentTasks.push({
          text: this.inputTask,
          isChecked: false,
        });
        this.inputTask = "";
        this.saveStorage();
      }
    },
    addNewTaskList() {
      if (this.storageInput) {
        this.storageList.push({ listName: this.storageInput, tasks: [] });
        this.saveStorage();
      }
    },
    saveStorage() {
      localStorage.setItem("savedList", JSON.stringify(this.storageList));
    },
    loadStorage() {
      const store = localStorage.getItem("savedList");
      if (!store) {
        this.storageList.push({ listName: "meinListe", tasks: [] });
      } else {
        this.storageList = JSON.parse(store);
      }
    },
    switchList(index) {
      this.currentStorageIndex = index;
      console.log(this.currentStorageIndex);
      //this.isActive = !this.isActive;
    },

    moveTaskToEnd(task) {
      const index = this.currentTasks.indexOf(task);
      if (task.isChecked) {
        this.currentTasks.splice(index, 1); // Remove from current position
        this.currentTasks.push(task); // Add to end of the list
      } else {
        this.currentTasks.splice(index, 1);
        this.currentTasks.unshift(task);
      }
      this.saveStorage();
    },
    deleteTask(task) {
      const index = this.currentTasks.indexOf(task);
      this.currentTasks.splice(index, 1);
      this.saveStorage();
    },
  },
  created() {
    this.loadStorage();
    const saveMode = localStorage.getItem("darkMode");
    if (saveMode === "true") {
      this.isDarkMode = true;
      document.body.classList.add("dark-mode");
    }
  },
}).mount("#app");
