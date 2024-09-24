// Classes
// In JavaScript, classes are a way to define blueprints for creating objects (these objects are different from the objects defined in the last section).

// class Rectangle {
//     constructor(width, height, color) {
//         this.width = width;
//         this.height = height;
//         this.color = color;
//     }

//     area() {
//         const area = this.width * this.height;
//         return area;
//     }

//     paint() {
//         console.log(`Painting with the color ${this.color}`);
//     }
// }

// const rect = new Rectangle(2, 4, "Red");
// const area = rect.area();
// console.log(area);
// rect.paint();


// Key Concepts
// 1. Class Declaration:
// You declare a class using the class keyword.
// Inside a class, you define properties (variables) and methods (functions) that will belong to the objects created from this class.
// 2. Constructor:
// A special method inside the class that is called when you create an instance (an object) of the class.
// It’s used to initialize the properties of the object.
// 3. Methods:
// Functions that are defined inside the class and can be used by all instances of the class.
// 4. Inheritance:
// Classes can inherit properties and methods from other classes, allowing you to create a new class based on an existing one.
// 5. Static Methods:
// Methods that belong to the class itself, not to instances of the class. You call them directly on the class.
// 6. Getters and Setters:
// Special methods that allow you to define how properties are accessed and modified.


// Inheritance 
// Inheritance in JavaScript classes allows one class to inherit properties and methods from another class. This mechanism enables code reuse, making it easier to create new classes that are based on existing ones, without having to duplicate code.

class Shape {
    constructor(color) {
        this.color = color;
    }

    paint() {
        console.log(`Painting with color ${this.color}`);
    }

    area() {
        throw new Error('The area method must be implemented in the subclass');
    }

    getDescription() {
        return `A shape with color ${this.color}`;
    }
}

class Rectangle extends Shape {
    constructor(width, height, color) {
        super(color); // Call the parent class constructor to set the color
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }

    getDescription() {
        return `A rectangle with width ${this.width}, height ${this.height}, and color ${this.color}`;
    }
}

class Circle extends Shape {
    constructor(radius, color) {
        super(color); // Call the parent class constructor to set the color
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }

    getDescription() {
        return `A circle with radius ${this.radius} and color ${this.color}`;
    }
}

// Some more inbuilt JS classes
const now = new Date(); // Current date and time
console.log(now.toISOString()); // Outputs the date in ISO format

const map = new Map();
map.set('name', 'Alice');
map.set('age', 30);
map.set('sex', 'F');
console.log(map);