function Subject() {
  this.observers = []; // Array of observer functions
}

Subject.prototype = {
  subscribe: function(fn){
    this.observers.push(fn)
  },
  unsubscribe: function(fnToRemove){
    this.observers = this.observers.filter(fn => fn !== fnToRemove);   
  },
  fire: function(){
    this.observers.forEach(fn => fn.call());
  }
}

const subject = new Subject();

function Observer1(){
  console.log('Observer1 firing');
}

function Observer2(){
  console.log('Observer2 firing');
}

subject.subscribe(Observer1);
subject.subscribe(Observer2);
console.log('Subscribing 2 Observer-----');

subject.fire();

subject.unsubscribe(Observer2);
console.log('After unsubscribing Observer2-----');
subject.fire();
