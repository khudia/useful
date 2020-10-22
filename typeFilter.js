"use strict";
/*
1. Add class "fItem" to elements to be sorted with data-ftype attribute with sort value
2. Add class "fType" to elements to be button for selected filter with data-ftype attribute value for what to be sorted
3. Init class as new TypeFilter('.fItem','.fType','activeClassName') after event DOMContentLoaded where first param is class for items and second is for switchers
4. This classes can be changed on your wish
5. Inner text of node element with classname fSum will be replaced with total elemens on page
6. node element with data-ftype-total="id" where id is selector, same as on button, innerText will be replaced with total elements with placed id
*/
class TypeFilter {
  init() {
    this.countSum()
    this.bindButtons()
    this.findButtons();
  }
  bindButtons(){
      self =this
    self.buttons.forEach(x => {
        let id = x.getAttribute('data-ftype');
        if(id == 0){
          self.resetBtn = x
        }
        x.addEventListener('click', (e) => {
          if(id == 0){
             if(self.id != 0){
                self.hideAll()
                self.showAll()
                self.buttons.forEach((b)=>{b.classList.remove(
                  self.active);
                });
                x.classList.add(self.active);
                x.classList.remove('cursor-pointer')
                self.id = 0
                return 
             }
          }
         
          if(self.id == id ){
              x.classList.remove(self.active);
              self.id = 0
              this.showAll()
              return
          }
          if(self.id != id ){
              self.buttons.forEach((b)=>{b.classList.remove(self.active)});
              self.id = id
              x.classList.add(self.active);
              self.hideAll()
              self.showById(id)
              return
          }
          if(self.id > 0){
            x.classList.add(self.active);
            self.id = id
            self.hideAll()
            self.showById(id)
            return
        }
        });
      });
  }
  findButtons(){
    let self = this  
    let ids = []
    self.buttons.forEach(b=>{
        ids.push(b.getAttribute('data-ftype'))
    })
    ids.forEach(i => {
        self.countById(i)
    })
  }
  countById(id){
      let total = 0;
      this.items.forEach((i)=>{
          if(i.getAttribute('data-ftype')==id){
              total++
          }
      })
      let sum = document.querySelector('[data-ftype-total="'+id+'"]')
      if(sum){
          sum.innerText = total
      }
      return total
  }
  countSum(){
      let sum = document.querySelector('.fSum')
      if(sum){
          sum.innerText = this.items.length
      }
  }
  hideAll(){
    this.items.forEach(f => {
        f.style.display = 'none';
    })
  }
  showById(id){
    let self = this
    this.items.forEach(f => {
            if (f.getAttribute('data-ftype') == id && id > 0) {
              f.style.removeProperty('display');
              self.resetBtn.classList.add('cursor-pointer')
            }
          });
  }
  showAll(){
    let self = this
    this.items.forEach(f => {
            f.style.removeProperty('display');
        });
        self.resetBtn.classList.remove('cursor-pointer')
        self.resetBtn.classList.add(self.active)
  }
  constructor(itemsInit, buttonsInit, active) {
        let self = this
        document.addEventListener("DOMContentLoaded", function () {
            let items =  (!itemsInit) ? '.fItem' : itemsInit
            let buttons = (!buttonsInit) ? '.fType' : buttonsInit 
            self.active = (!active) ? 'active' : active
            self.itemsClass = items
            self.items = document.querySelectorAll(items);  
            self.buttons = document.querySelectorAll(buttons);
            self.active = active
            self.id = 0
            if (self.items && self.buttons) {
                self.init();
            }
        });
    }
}

//Simple execute code. All params are not nessary. These are defaults
new TypeFilter('.fType', '.fItem', 'active');
