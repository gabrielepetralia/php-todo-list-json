const { createApp } = Vue;
import {categories,tasks} from "./db.js";

createApp({
  data() {
    return {
      logo  : "fa-solid fa-check-double",
      title : "ToDoList",
      categories,
      tasks,
      currCategory : 0,
      tasksFiltered : [],
      tasksFilteredCounter : [],
      deleteErrorMsg : "",
      addErrorMsg : "",
      indexToDelete : 0,
      badgeColor : "",
      badgeIcon : "",
      newTaskText : "",
      newTaskCategory : "",
      newTaskPriority : 0,
      idCounter : 13,
    }
  },

  methods : {
    categoryFilter() {
      if(this.categories[this.currCategory].name !== "Generale") {
        this.tasksFiltered = this.tasks.filter( task => task.category === this.categories[this.currCategory].name);
      }
      else {
        this.tasksFiltered = this.tasks;
      }
    },

    tasksCounter() {
      this.categories.forEach( (category,index) => {
        if(this.categories[index].name !== "Generale") {
          this.tasksFilteredCounter = this.tasks.filter( task => task.category === this.categories[index].name);

          category.numTasks = this.tasksFilteredCounter.length;
        }
        else {
          category.numTasks = this.tasks.length;
        }
      })
    },

    writeErrorMsg(errorType,msg) {
      if(errorType === "delete") {
        this.deleteErrorMsg = msg;
        setTimeout(() => {
          this.deleteErrorMsg = "";
        },2000)
      }

      if(errorType === "add") {
        this.addErrorMsg = msg;
        setTimeout(() => {
          this.addErrorMsg = "";
        },2000)
      }
    },

    goUp() {
      document.querySelector(".main-content").scrollTop = 0;
    },

    deleteTask() {
      this.tasks.forEach( (task,index) => {
        if(task.id === (this.indexToDelete)) {
          if(task.done) {
            this.tasks.splice(index,1);
            this.categoryFilter();
            this.tasksCounter();
            this.deleteErrorMsg = "";
          } else {
            this.goUp();
            this.writeErrorMsg("delete","Non puoi eliminare una task senza averla fatta!");
          }
        }
      })
    },

    // NON FUNZIONA
    // deleteCheckedTasks() {
    //   this.tasks.forEach( (task,index) => {
    //     if(task.done) {
    //       this.tasks.splice(index,1);
    //     }
    //   })
    //   this.categoryFilter();
    //   this.tasksCounter();
    //   console.log(this.tasks);
    // },

    prioritySort() {
      this.tasks.sort((a,b) => a.priority - b.priority);
    },

    setBadgeColor(index) {
      switch (this.tasksFiltered[index].priority) {
        case 1:
          this.badgeColor = "gp-badge-red";
          break;
        case 2:
          this.badgeColor = "gp-badge-yellow";
          break;  
        default:
          this.badgeColor = "gp-badge-green";
          break;
      }

      return this.badgeColor;
    },

    setBadgeIcon (index) {
      switch (this.tasksFiltered[index].category) {
        case this.categories[0].name :
          this.badgeIcon = this.categories[0].icon;
          break;
        case this.categories[1].name :
          this.badgeIcon = this.categories[1].icon;
          break;
        case this.categories[2].name:
          this.badgeIcon = this.categories[2].icon;
          break;  
        case this.categories[3].name:
          this.badgeIcon = this.categories[3].icon;
          break;
        case this.categories[4].name:
          this.badgeIcon = this.categories[4].icon;
          break;
        case this.categories[5].name:
          this.badgeIcon = this.categories[5].icon;
          break;    
        case this.categories[6].name:
          this.badgeIcon = this.categories[6].icon;
          break;
        case this.categories[7].name:
          this.badgeIcon = this.categories[7].icon;
          break;    
      }

      return this.badgeIcon;
    },

    addTask() {
      if(this.newTaskText.length > 4) {
        if(this.newTaskText !== "" && this.newTaskCategory !== "" && this.newTaskPriority !== 0) {
          this.idCounter++;
          const newTask = {
            id : this.idCounter,
            text : this.newTaskText,
            done : false,
            category : this.newTaskCategory,
            priority : this.newTaskPriority,
          }

          this.tasks.unshift(newTask);
          this.prioritySort();
          this.categoryFilter();
          this.tasksCounter();
          this.newTaskText = "";
          this.newTaskCategory = "";
          this.newTaskPriority = 0;
        } else {
          this.writeErrorMsg("add","Devi compilare tutti i campi!")
        }
      } else {
        this.writeErrorMsg("add","Il testo deve essere di almeno 5 caratteri!")
      }
    }
  },

  mounted(){
    this.prioritySort();
    this.categoryFilter();
    this.tasksCounter();
  }
}).mount("#app")