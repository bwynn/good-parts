var foo = function() {
  var a = 3, b = 5;

  var bar = function() {
    var b = 7, c = 11;

// at this point, a is 3, b is 7, and c is 11
  }
}

var myObject = (function() {              // an example of closures
  var value = 0;

  return {
    increment: function(inc) {
      value += typeof inc === 'number' ? inc : 1;
    },
    getValue: function() {                  // create a return function for value variable
      return value;
    }
  };
}());

var jsondata = (function() {                  // closure proof of concept to
                                              //pull data out of functions for jsonData functions in waves_js
  var value = 100;
  return {
    getValue: function() {
    return value;                           // this returns 100.
  }
  };
}());                     // () invokes object containing two methods

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
