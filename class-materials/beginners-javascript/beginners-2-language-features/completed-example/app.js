'use strict';

var manager = (function () {
  var people = [];

  return {
    add: add,
    get: get,
    getFriends: getFriends,
    makeFriend: makeFriend,
    remove: remove
  };


  // add person
  function add(person) {
    validate(person);
    people.push({
      name: person.name,
      age: person.age || 100,
      firends: []
    });
  }

  // get person by name
  function get(name) {
    var nameLC = name.toLowerCase();
    var person = people.filter(function (person) {
      return person.name.toLowerCase() === nameLC;
    });

    if (!person || person.length === 0) {
      console.error('Could not find a person by the name "'+name+'"');
    }

    return person[0];
  }

  function getFriends(name) {
    var person = get(name);
    if (person) {
      return person.firends;
    }
  }

  // add fried to given persons list
  function makeFriend(name, friendName) {
    var friend = get(friendName);
    var person = get(name);

    if (!friend) {
      throw Error('could not find a friend by the name of "'+friendName+'"');
    }
    if (!person) {
      throw Error('could not find a person by the name of "'+name+'"');
    }

    person.firends.push(friend);
  }


  // remove person
  function remove(name) {
    var person = get(name);
    if (!person) {
      throw Error('could not find person by the name of "'+name+'" to remove');
    }
    removeFromFriends(person);
    people.splice(people.indexOf(person), 1);
  }
  // remove friend from persons friends list
  function removeFromFriends(friend) {
    people.forEach(function (person) {
      person.firends = person.firends.filter(function (personFriend) {
        return personFriend !== friend;
      });
    });
  }



  function validate(config) {
    if (typeof config !== 'object' || config === null) {
      throw Error('Must pass on object');
    }

    if (!config.name) {
      throw Error('Must add a name property');
    }
  }
}());


manager.add({name: 'Ben'});
manager.add({name: 'Ben2'});
manager.add({name: 'Ben3'});
manager.add({name: 'Ben4'});
manager.makeFriend('ben', 'ben3');
manager.makeFriend('ben4', 'ben2');
manager.remove('ben2');
console.log(manager.get('ben'));
console.log(manager.getFriends('ben'));
console.log(manager.get('ben4'));
