var MYAPP = {};

MYAPP.stooge = {
  "first-name": "Jerome",
  "last-name": "Howard"
};

MYAPP.flight = {
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

stooge['middle-name'] = 'Lester';
stooge.nickname = 'Curly';
flight.equipment = {
  model: 'Boeing 777'
};

flight.status = 'overdue';


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
another_stooge.profession;

//var name;
//for (name in another_stooge) {                        // enumeration - filtering using a 'for' 'in' statement
  //if (typeof another_stooge[name] !== 'function') {   // if the typeof object another_stooge[name] isn't a function
    //document.writeln(name + ': ' + another_stooge[name]);   // write all name data that isn't function
  //}
//}

var i;                                                // enumeration using a for statement
var properties = [
  'first-name',
  'middle-name',
  'last-name',
  'profession'
];

for (i = 0; i < properties.length; i += 1) {
  document.writeln(properties[i] + ': ' +
        another_stooge[properties[i]]);
}
