
class TabItem {
  constructor(element, prevContent) {
    // Assign this.element to the passed in element
    this.element = element;
    this.content = prevContent
  }

  deselect(){
    this.content.classList.remove('tabs-item-selected');
  }

  select() {
    // Select all ".tabs-item" elements from the DOM
    //const items = document.querySelectorAll('.tabs-item');
    // Remove the class "tabs-item-selected" from each element
    //items.forEach(item => item.classList.remove('tabs-item-selected'));
    // Add a class named "tabs-item-selected" to this element
    this.deselect();

    this.element.classList.add('tabs-item-selected');
  }
}

class TabLink{
  constructor(element, current, section) {
    //console.log(this.currentTab);
    // Assign this.element to the passed in DOM element
    this.element = element;

    this.currentTab = current;

    this.section = section;
    
    // Get the custom data attribute on the Link
    this.data = this.element.dataset.tab;
    
    // Using the custom data attribute get the associated Item element
    this.itemElement = document.querySelector(`.tabs-items [data-tab="${this.data}"]`);

    this.previousContent = document.querySelector(`[data-section="${this.section}"] .tabs-items .tabs-item-selected`);
    
    // Using the Item element, create a new instance of the TabItem class
    this.tabItem = new TabItem(this.itemElement, this.previousContent);
    
    // Add a click event listener on this instance, calling the select method on click
    this.element.addEventListener('click', this.select.bind(this));
  };

  deselect(){
    this.currentTab.classList.remove('tabs-link-selected');
    //console.log(this.element);
    //let parent = this.element.parentNode;
    //parent.classList.remove('tabs-item-selected');
  }

  select() {
    // Get all of the elements with the tabs-link class
    //const links = document.querySelectorAll('.tabs-link');

    // Using a loop or the forEach method remove the 'tabs-link-selected' class from all of the links
    // Array.from(links).forEach();
    //links.forEach(link => link.classList.remove('tabs-link-selected'));

    this.deselect();

    // Add a class named "tabs-link-selected" to this link
    this.element.classList.add('tabs-link-selected');
    //this.currentTab = this.element;
    
    // Call the select method on the item associated with this link
    this.tabItem.select();
  }
  
}

class Tabs{
  constructor(collection){
    this.tabCollection = collection.querySelector('.tabs-links');
    this.tabSection = collection.dataset.section;

    this.currentTab = this.tabCollection.querySelector('.tabs-link-selected');
    this.links = this.tabCollection.querySelectorAll('.tabs-link');
    this.links.forEach(link => new TabLink(link, this.currentTab, this.tabSection));

    this.tabCollection.addEventListener('click', this.getCurrentTab.bind(this));
  }

  getCurrentTab(){
    this.currentTab = this.tabCollection.querySelector('.tabs-link-selected');
    this.links = this.tabCollection.querySelectorAll('.tabs-link');
    this.links.forEach(link => new TabLink(link, this.currentTab, this.tabSection));
  }
}


/* START HERE: 

- Select all classes named ".tabs-link" and assign that value to the links variable

- With your selection in place, now chain a .forEach() method onto the links variable to iterate over the DOM NodeList

- In your .forEach() method's callback function, return a new instance of TabLink and pass in each link as a parameter

*/
// let tabCollection = document.querySelectorAll('.tabs-links');
// tabCollection.forEach(tab => new Tabs(tab));

let tabCollection = document.querySelectorAll('.tabs');
tabCollection.forEach(tab => new Tabs(tab));

// let links = document.querySelectorAll('.tabs-link');
// links.forEach(link => new TabLink(link));