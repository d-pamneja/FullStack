// The DOM, or Dogument Object Model, is a programming interface for web documents. It represents the structure of a web page as a tree of objects.
// The DOM abstracts the structure of the document into a tree of objects, allowing scripts to manipulate the content and structure dynamically. This abstraction enables more complex interactions and functionalities beyond just static HTML.

//  1. Fetching elements
// There are 5 popular methods available for fetching DOM elements - 
// a. querySelector
const title = document.querySelector('h1');
console.log(title.innerHTML) // The first h1 element

// b. querySelectorAll
const listItems = document.querySelectorAll('li');
console.log(listItems[0]) // The first li element

// c. getElementById
const subtitle = document.getElementById('subtitle');
console.log(subtitle.innerHTML) // The element with id subtitle

// d. getElementByClassName
const listItems2 = document.getElementsByClassName('list-item');
console.log(listItems[0]) // The first element with class list-item

// e. getElementsByClassName
const listItems3 = document.getElementsByTagName('li');
console.log(listItems[0]) // The first li element



// 2. Creating elements
// To create a new element, you can use the document.createElement() method.

const newElement = document.createElement('div');
// Now, the issue here is that the new element is created but not added to the DOM i.e. it is not added to the main HTML. To add it to the DOM, you can use the appendChild() method.
document.querySelector("body").appendChild(newElement);

