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

getElement('myBoxDiv')
  .move(350, 150)
  .width(100)
  .height(100)
  .color('red')
  .border('10px outset')
  .padding('4px')
  .appendText('Please stand by')
  .on('mousedown', function(m) {
    this.startDrag(m, this.getNinth(m));
  })
  .on('mousemove', 'drag')
  .on('mouseup', 'stopDrag')
  .later(2000, function() {
    this
      .color('yellow')
      .setHTML('What hath God wraught')
      .slide(400, 40, 200, 200);
  })
  tip('This box is resizeable');
