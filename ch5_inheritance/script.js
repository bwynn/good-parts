var Mammal = function (name) {
  this.name = name;
};

Mammal.prototype.get_name = function() {
  return this.name;
};

Mammal.prototype.says = function() {
  return this.saying || '';
};

var myMammal = new Mammal('Herb the Mammal');
var name = myMammal.get_name(); // 'Herb the Mammal'

// make another pseudoclass that inherits mammal by defining it's constructor
// function and replacing its prototype with an instance of mammal

var Cat = function (name) {
  this.name =  name;
  this.saying = 'meow';
};

// replace Cat.prototype with a new instance of mammal

Cat.prototype = new Mammal();
// augment the new prototype with
// purr and get_name methods

Cat.prototype.purr = function(n) {
  var i, s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
Cat.prototype.get_name = function() {
  return this.says() + ' ' + this.name + ' ' + this.says();
};

var myCat = new Cat('Henrietta');
var says = myCat.says(); // meow
var purr = myCat.purr(5); // r-r-r-r-r
var name = myCat.get_name(); // 'meow Henrietta meow'

// using a 'method' method defining an inherits method

/*Function.method('inherits', function(Parent) {
  this.prototype = new Parent();
  return this;
});

// now we can program a cascade style

var Cat = function (name) {
  this.name = name;
  this.saying = 'meow';
}.
  inherits(Mammal).
  method('purr', function(n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  }).
  method('get_name', function() {
    return this.says() + ' ' + this.name + ' ' + this.says();
  });*/

// object specifier

/*var myObject = maker({
  first: f,
  last: l,
  middle: m,
  state: s,
  city: c
});*/
