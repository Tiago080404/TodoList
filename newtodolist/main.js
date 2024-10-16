import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      inputTask: "",
      storageInput: "",
      taskList: [],
      storageList: [],
      currentStorageIndex: null,
    };
  },

  computed: {
    checkIndexOfTask() {
      if (this.currentStorageIndex === null) {
        this.currentStorageIndex = 0;
      }
    },
  },

  methods: {
    addTask() {
      if (this.inputTask == "") {
        return;
      } else {
        this.storageList[currentStorageIndex].tasks.push({
          text: this.inputTask,
        });
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
        localStorage.setItem("meinListe", JSON.stringify(this.storageList));
      } else {
        this.storageList = JSON.parse(store);
      }
    },
  },
  mounted() {
    this.loadStorage();
  },
}).mount("#app");
