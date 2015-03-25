var myMammal = {
  name: 'Herb the Mammal',
  get_name: function() {
    return this.name;
  },
  says: function() {
    return this.saying || '';
  }
};

var myCat = Object.create(myMammal);
myCat.name = 'Henrietta';
myCat.saying = 'meow';
myCat.purr = function (n) {
  var i, s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
myCat.get_name = function() {
  return this.says() + ' ' + this.name + ' ' + this.says();
};

// above is an example of differential inheritance, customizing a
// new object specifies the differences from the object
// on which it is based

var block = function() {

  // remmber the current scope. make a new scope
  // that includes everything from the current one

  var oldScope = scope;
  scope = Object.create(scope);

  // advance pas the left curly brace

  advance('{');

  // parse using the new scope

  parse(scope);

  // advance past the right curly brace and discard the
  // new scope, restoring the old one

  advance('}');
  scope = oldScope;
};
