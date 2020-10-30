class TypeFilterMobile {
    constructor(props) {
      // props = {container,items,types,groups,active,hidden}
          if(!document.querySelector(props.container)) return;
      this.props = props;
      this.items = document.querySelectorAll("." + props.items);
  
      this.types = document.querySelector("#" + props.types).options;
      if (props.groups) {
  
        this.groups = document.querySelector("#" + props.groups).options;
      } else {
        this.groups = false;
      }
  
      this.active = props.active;
      this.hidden = props.hidden;
      this.init();
    }
    init() {
      let self = this;
      self.groupSelected = 0;
      self.typeSelected = 0;
      self.initSelector();
      self.initSelector("groups");
      self.options = [];
  
      self.countVisible();
      if(self.groups){
        self.buildTmpTypes();
      }
     
    }
    initSelector(type = false) {
      let self = this;
      if (type && self.groups) {
        document
          .querySelector("#" + self.props.groups)
          .addEventListener("change", function () {
            let el = event.target;
            let id = el.options[el.selectedIndex].value;
            self.groupSelected = id;
            self.showTypesByGroup(id);
            self.types.selectedIndex = 0;
            if (id == 0) {
              self.showAll();
            }
          });
      } else {
        document
          .querySelector("#" + self.props.types)
          .addEventListener("change", function () {
            let el = event.target;
            let id = el.options[el.selectedIndex].value;
            self.typeSelected = id;
            self.showItemsByType(id);
          });
      }
    }
    showAll(type = "items") {
      let self = this;
      if (type == "items") {
        self.items.forEach((x) => x.classList.remove(self.hidden));
      } else {
        self.types.forEach((x) => x.classList.remove(self.hidden));
      }
    }
    show(el) {
      el.classList.remove(this.hidden);
    }
    hide(el) {
      el.classList.add(this.hidden);
    }
    hideAll(type = "items") {
      let self = this;
      if (type == "items") {
        self.items.forEach((x) => x.classList.add(self.hidden));
      } else {
        self.types.forEach((x) => {
          if (x.value != 0) {
            x.classList.add(self.hidden);
          }
        });
      }
    }
    buildTmpTypes(start = false) {
      let self = this;
      if (!start) {
        for (
          let x = 0;
          x < document.querySelector("#" + self.props.types).options.length;
          x++
        ) {
          let el = document.querySelector("#" + self.props.types).options[x];
          self.options.push({
            title: el.innerText,
            value: el.value,
            group: el.getAttribute("data-group")
          });
        }
      } else {
        document.querySelector("#" + self.props.types).innerHTML = "";
        let typesContainer = document.getElementById(self.props.types);
        self.options.forEach((o) => {
          let opt = document.createElement("option");
          opt.value = o.value;
          opt.innerHTML = o.title;
          typesContainer.appendChild(opt);
        });
      }
    }
    showTypesByGroup(id) {
      let self = this;
      self.buildTmpTypes(true);
      let groups = self.getTypesByGroup(id);
      if (id > 0) {
        document.querySelector("#" + self.props.types).innerHTML = "";
        let typesContainer = document.getElementById(self.props.types);
        self.options.forEach((o) => {
          if (o.value == 0 || o.group == id) {
            let opt = document.createElement("option");
            opt.value = o.value;
            opt.innerHTML = o.title;
            typesContainer.appendChild(opt);
          }
        });
      }
      if (id == 0) {
        self.buildTmpTypes(true);
        self.showItemsByType(0);
      }
      if (self.groups && id != 0) {
        self.showItemsByType(groups);
      }
    }
    getTypesByGroup(id) {
      let self = this;
      let arr = [];
      for (let index = 0; index < self.options.length; index++) {
        const element = self.options[index];
        let group = element.group;
        if (group == id) {
          arr.push(element.value);
        }
      }
      return arr;
    }
    countVisible() {
      let self = this;
      let x = 0;
      self.items.forEach((i) => {
        if (!i.classList.contains(self.hidden)) {
          x++;
        }
      });
      document.querySelector(".itemsVisible").querySelector("span").innerText = x;
    }
    showItemsByType(id) {
      console.log(id);
      let self = this;
      let types = [];
      let itemInGroup = true;
      if (id == 0) {
        if (self.groups && self.groupSelected) {
          types = self.getTypesByGroup(self.groupSelected);
        }
        self.items.forEach((x) => {
          let itemType = x.getAttribute("data-type");
          if (self.groups && self.groupSelected != 0) {
            itemInGroup = types.indexOf(itemType) == -1 ? false : true;
          } else {
            itemInGroup = true;
          }
          self.hide(x);
          if (itemInGroup) {
            self.show(x);
          }
        });
      } else {
        self.items.forEach((x) => {
          let itemType = x.getAttribute("data-type");
          if (self.groups) {
            if (id.indexOf(itemType) == -1) {
              self.hide(x);
            } else {
              self.show(x);
            }
          } else {
            self.hide(x);
            if (itemType == id) {
              self.show(x);
            }
          }
        });
      }
      self.countVisible();
    }
  }
new TypeFilterMobile({container:'.usedCarsMobile',items:'selectCar',types:'selectModels',groups:'selectMarks',active:'text-red',hidden:'hidden'})
