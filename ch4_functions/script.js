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

var hanoi = function hanoi(disc, src, aux, dst) {
  if (disc > 0) {
    hanoi(disc -1, src, dst, aux);
    document.writeln('move disc ' + disc +
            ' from ' + src + ' to ' + dst + '<br>');
            hanoi(disc -1, aux, src, dst);
  }
};

//hanoi(3, 'Src', 'Aux', 'Dst');

// define a walk_the_DOM function that visits
// every node of the tree in HTML source order, starting
// from some given node. it invokes a function,
// passing it each node in turn. walk_the_DOM calls
// itself to process each of the child nodes

var walk_the_DOM = function walk(node, func) {
  func(node);
  node = node.firstChild;
  while (node) {
    walk(node, func);
    node = node.nextSibling;
  }
};

// define a getElementsByAttribute function. It
// takes an attribute name string and an optional
// matching value. It calls walk_the_DOM, passing it a
// function that looks for an attribute name in the
// node. The matching nodes are accumulated in a
// results array.

var getElementsByAttribute = function(att, value) {
  var results = [];

  walk_the_DOM(document.body, function(node) {
    var actual = node.nodeType === 1 && node.getAttribute(att);
    if (typeof actual === 'string' &&
    (actual === value || typeof value !== 'string')) {
      results.push(node);
    }
  });
  return results;
}();

// make a factorial function with tail
// recursion. It is tail recursive because
// it returns the result of calling itself

// js does not currently optimize this form

var factorial = function factorial(i, a) {
  a = a || 1;
  if (i < 2) {
    return a;
  }
  return factorial(i - 1, a * 1);
};
//document.writeln(factorial(4));  // 24

// create a maker function called quo. it makes an
// object with a get_status method and a private
// status property

var quo = function (status) {
  return {
    get_status: function() {
      return status;
    }
  };
};

// make an instance of quo.

var myQuo = quo("amazed");

//document.writeln(myQuo.get_status());

// Define a function that sets a dom nodes color
// to yellow and then fades it tto white

var fade = function (node) {
  var level = 1;
  var step = function() {
    var hex = level.toString(16);
    node.style.backgroundColor = '#ffff' + hex + hex;
    if (level < 15) {
      level += 1;
      setTimeout(step, 100);
    }
  };
  setTimeout(step, 100);
};

//fade(document.body);

// BAD EXAMPLE
// make a function that assigns event handler functions to an array of nodes the wrong way
// when you click on a node, an alert box is supposed to display
// the ordinal of the node
// but it always displays the number of nodes instead.

var add_the_handlers = function (nodes) {
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = function(e) {
      alert(i);
    };
  }
};

// End bad example

// a better example
// make a function that assigns the event handler functions to an array of
// nodes. When you click on a node, an alert box will display the ordinal of the node

var add_the_handlers = function (nodes) {
  var helper = function (i) {
    return function (e) {
      alert(i);
    };
  };
  var i;
  for (i = 0; i < nodes.length; i += 1) {
    nodes[i].onclick = helper(i);
  }
};

String.method('deentityify', function() {
  // the entity table. it maps entity names to characters
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };

  // return the deentityify method.
  return function() {
    // this is the deentityify method. it calls the string
    // replace mthod, looking for substrings that start
    // with '&' and end with ';'. If the characters in
    // between are in the entity table, then replace the
    // entity with the character from the table.
    // it uses a refular expression

    return this.replace(/&([^&;]+);/g,
      function(a, b) {
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      }
    );
  };
}());

//document.writeln('&lt;&quot;&gt;'.deentityify()); // <">

var serial_maker = function() {
  // produce an object that produces unique strings. a
  // unique string is made up of two parts: a prefix
  // and a sequence nubmer. The object comes with methods
  // for setting the prefix and sequence
  // number, and a gensym method that produces unique strings

  var prefix = '';
  var seq = 0;
  return {
    set_prefix: function(p) {
      prefix = String(p);
    },
    set_seq: function(s) {
      seq = s;
    },
    gensym: function() {
      var result = prefix + seq;
      seq += 1;
      return result;
    }
  };
};

var seqer = serial_maker();
seqer.set_prefix('Q');
seqer.set_seq(1000);
var unique = seqer.gensym();    // unique is Q1000

// Adding an example of currying
//var add1 = add.curry(1);
//document.writeln(add1(6));    //7

// js does not have a curry method, but we can fix that as follows
/*Function.method('curry', function() {
  var args = arguments, that = this;
  return function () {
    return that.apply(null, args.concat(arguments));
  };
});       // something still isnt right*/

Function.method('curry', function() {
  var slice = Array.prototype.slice,
  args = slice.apply(arguments),
  that = this;
  return function() {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

//now passing the following code will produce results as expected
var add1 = add.curry(1);
//document.writeln(add1(6));    //7





// Example of memoization
// memoization remembers the results of previous operations, eliminating redundant calls

/*var fibonacci = function(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

for (var i = 0; i <= 10; i += 1) {
  document.writeln('// ' + i + ': ' + fibonacci(i) + '<br>');
} */

// A lot of extra code there

// calling it directly
/*var fibonacci = (function() {
  var memo = [0, 1];
  var fib = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
    }
    return result;
  };
  return fib;
}());*/

var memoizer = function(memo, formula) {
  var recur = function(n) {
    var result = memo[n];
    if(typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  };
  return recur;
};

var fibonacci = memoizer([0, 1], function (recur, n) {
  return recur(n - 1) + recur(n - 2);
});

var factorial = memoizer([1, 1], function(recur, n) {
  return n * recur(n - 1);
});
