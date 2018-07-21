import {bigOak} from "./crow-tech";
// import {defineRequestType} from "./crow-tech";
// import {bigOak, defineRequestType} from "./crow-tech";
// var bigOak = require('bigOak');

bigOak.readStorage("food caches", caches => {
  let firstCache = caches[0];
  bigOak.readStorage(firstCache, info => {
    console.log(info);
  });
});

bigOak.send("Cow Pasture", "note", "Let's caw loudly at 7pm", () => console.log("Note delivered."));

defineRequestType("note", (nest, content, source, done) => {
   console.log(`${nest.name} received note: ${content}`);
   done();
});



// PROMISES

// The ".then" method
//  WORKS!
let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));



// How you'd create a promise based interface from the readStorage function:
function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

storage(bigOak, "enemies").then(value => console.log("Got", value));


// Failure
// Promises make handling failures easier

new Promise((_, reject) => reject(new Error("Fail")))
  .then(value => console.log("Handler 1"))
  .catch(reason => { console.log("Caught failure " + reason);
  return "nothing";
})
.then(value => console.log("Handler 2", value));


// REQUEST & RESPONSE   ... resolve & reject

class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) reject(failed);
        else resolve(value);
      });
      setTimeout(() => {
        if (done) return;
        else if (n < 3) attempt(n + 1);
        else reject(new Timeout("Timed out"));
      }, 250);
    }
    attempt(1);
  });
}

// Promise.resolve is used to convert the value returned by 'handler' to a promise if it isn't already.

function requestType(name, handler) {
  defineRequestType(name, (nest, content, source, callback) => {
    try {
      Promise.resolve(handler(nest, content, source))
        .then(response => callback(null, response),
              failure => callback(failure));
    } catch (exception) {
      callback(exception);
    }
  });
}
