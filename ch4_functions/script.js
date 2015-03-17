// Create a variable called add and store a function
// in it that adds two numbers

var add = function(a, b) {
  return a + b;
};

// 4 patterns of function invocation:
//method invocation, function invocation, constructor invocation, and appy invocation

// Create myObject. it has a value and an increment
// method. The increment method takes an optional
// parameter. If the argument is not a number, then 1
// is used as teh default.

var myObject = {
  value: 0,
  increment: function(inc) {
    this.value += typeof inc === 'number' ? inc : 1;
  }
};

myObject.increment();
//document.writeln(myObject.value);           // 1

myObject.increment(2);
//document.writeln(myObject.value);           // 3

// augment myObject with a double method

myObject.double = function() {
  var that = this;      // workaround
  var helper = function() {
    that.value = add(that.value, that.value);
  };

  helper();
};

// invoke double as a method

myObject.double();
document.writeln(myObject.value);

// Create a constructor function called Quo
// it makes an object with a status property

var Quo = function(string) {
  this.status = string;
};

// give all instances of quo a public method
// called get_status

Quo.prototype.get_status = function() {
  return this.status;
};

// make an instance of quo

var myQuo = new Quo('confused');
document.writeln(myQuo.get_status());   // confused
