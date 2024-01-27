// let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
// myFirstVehicle.honk(); // "Beep."

class MyFirstVehicle {
    constructor(make, model, year) {
        this.make = make
        this.model = model
        this.year = year
    }
    honk() {
        return "beep"
    }
    toString() {
        return `the vehicale is a ${make} ${model} from ${year}`
    }
}

class Car extends MyFirstVehicle {
    constructor(make, model, year) {
        super(make, model, year)
        this.numWheels = 4
    }
}

class Motorcycle extends MyFirstVehicle {
    constructor(make, model, year) {
        super(make, model, year)
        this.numWheels = 2
    }
    revEngine() {
        return "VROOM!!"
    }
}

class garage {
    constructor(capacity) {
        this.vehicles = []
        this.capacity = capacity
    }

    add(newVehicle) {
        if (!(newVehicle instanceof MyFirstVehicle)) {
            return "Only vehicles allowed inside!"
        }
        if (this.vehicles.length >= this.capacity) {
            return "sorry, we're full"
        }
        this.vehicles.push(newVehicle) 
            return "Vehicle added"
        
    }
}