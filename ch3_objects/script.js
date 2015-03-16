var empty_object = {};

var stooge = {
  "first-name": "Jerome",
  "last-name": "Howard"
};

var flight = {
  airline: "Oceanic",
  number: 815,
  departure: {
    IATA: "SYD",
    time: "2004-09-22 14:55",
    city: "Sydney"
  },
  arrival: {
    IATA: "LAX",
    time: "2004-09-23 10:42",
    city: "Los Angeles"
  }
};

var x = stooge;
x.nickname = 'Curly';
var nick = stooge.nickname;
  // nick is 'curly' because x and stooge
  // are references to the same object

var a = {}, b = {}, c = {};
  // a, b, and c each refer to a different empty object

a = b = c = {};
  // a, b, and c all refer to the same empty object\

if (typeof Object.create !== 'function') {
  Object.create = function(o) {
    var F = function () {};
    F.prototype = o;
    return new F();
  }
}
var another_stooge = Object.create(stooge);

another_stooge['first-name'] = 'Harry';
another_stooge['last-name'] = "Moses";
another_stooge.nickname = 'Moe';

stooge.profession = 'actor';
console.log(another_stooge.profession);         // logs  prototype into new obj
