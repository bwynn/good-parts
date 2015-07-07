var eventuality = function(that) {
  var registry = {};

  that.fire = function(event) {
    // fire an event on an object. the event can be either a string containing
    // the name of the event or an object containing a type property
    // containing the name of the event. Handlers registered by the 'on'
    // method that match the event name will be invoked.

    var array,
        func,
        handler,
        i,
        type = typeof event === 'string' ? event : event.type;

    // if an array of handlers exists for this event, then loop through it
    // and execute the handlers in order.

        if(registry.hasOwnProperty(type)) {
          array = registry[type];
          for (i = 0; i < array.length; i += 1) {
            handler = array[i];
    // a handler record contains a method and an optional array of parameters
    // if the method is a name, look up the function.

        func = handler.method;
        if(typeof func === 'string') {
          func = this[func];
        }

    // invoke a handler. if the record contained parameters, then pass
    // them. otherwsie, pass the event object.

        func.apply(this, handler.parameters || [event]);
          }
        }
        return this;
  };

  that.on = function (type, method, parameters) {
  // register an event. make a handler record. put it in a handler array,
  // makeing one if it doesn t yet exist for this type.

    var handler = {
      method: method,
      parameters: parameters
    };
    if (registry.hasOwnProperty(type)) {
      registry[type].push(handler);
    } else {
      registry[type] = [handler];
    }
    return this;
  };
 return that;
};
