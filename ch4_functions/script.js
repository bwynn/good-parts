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
//document.writeln(myObject.value);

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
//document.writeln(myQuo.get_status());   // confused

// make an array of 2 numbers and then add them

var array = [3, 4];
var sum = add.apply(null, array);

// make an object with a status member

var statusObject = {
  status: 'A-OK'
};

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on
// statusObject even though statusObject does not have
// a get_status method.

var status = Quo.prototype.get_status.apply(statusObject);    // status is 'a-ok'

// make a function that adds a lot of stuff

// note that definining the variable sum inside of
// the function does not interfere with the sum
// defined outside of the funciton. The function
// only sees the inner one

var sum = function() {
  var i, sum = 0;
  for (i = 0; i < arguments.length; i += 1) {
    sum += arguments[i];
  }
  return sum;
};

//document.writeln(sum(4,8,15,16,23,42)); // 108

var add = function(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw {
      name: 'TypeError',
      message: 'add needs numbers'
    };
  }
  return a + b;
}

// make a try_it function that calls the new add
// function incorrectly

var try_it = function() {
  try {
    add('seven');
  } catch (e) {
    document.writeln(e.name + ': ' + e.message);
  }
}

//try_it();       // call function

// augmenting types
Function.prototype.method = function (name, func) {
  this.prototype[name] = func;
  return this;
}

Number.method('integer', function() {
  return Math[this < 0 ? 'ceil' : 'floor'](this);
});

//document.writeln((-10/3).integer()); // -3

//regex
String.method('trim', function() {
  return this.replace(/^\s+|\s+$/g, '');
});

//document.writeln('"' + " neat ".trim() + '"');

// add a method conditionally - this protects the public nature of prototypes

Function.prototype.method = function(name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
    return this;
  }
};
