ELOQUENT JAVASCRIPT - 3RD EDITION

ASYNCHRONOUS PROGRAMING

For any computing that does not interact directly with the CPU,
anything such as calls to a hard drive or a remote server etc.
are a lot slower than anything on the CPU.

So if all tasks in a program are set to run/compute in a strict order,
and some of those tasks are a lot slower, it wastes time because
some pediods of time the CPU is just sitting waiting until the slow task is done elsewhere.
There could be other work further down the list of tasks that the CPU can deal with while it is waiting,
thus reducing the overall time to complete the entire program.

An asynchronous model allows multiple things to happen at once.
When a action is started, the program continues to run
even before the first action has finished. When it has finished,
the program is just then informed and gets access to the result of that action.
Such as the data read from  a disk.

You can say that in an asynchronous model, waiting for actions ot finish is explicit,
as in under out control, it happens when we want it to.
It does not need to wait for actions to finish.

Another option to speed up computing time is to design programs to work on multiple threads (multi-core CPUs).
But it is much hard to code and understand programs to use multi-threads,
compared to asynchronous designs.

For JavaScript, in browsers and Node.js, operations that might take a while are made to be asynchronous.


CALLBACKS

One way to design asynchronous programing is to make slow functions/actons take an extra argument,
that extra argument is a "callback" functin.
When the slow functin/action is finished, the callback functin is called at the end with its result.

A simple example to show this is the "setTimeout" function:
It has a delay (it waits) a certain number of milliseconds,
then it calls another functin once that delay is done.

    setTimeout(() => console.log("Tick"), 500);

Actions involving read and writing data to a hard drive are very slow,
so their interface is asynchronous and uses callback functions.

An example to look up a "foodcache" from a datafile called "Big Oak" on an HDD might look like this:

    import {bigOak} from "./crow-tech";

    bigOak.readStorage("food caches", caches => {
      let firstCache = caches[0];
      bigOak.readStorage(firstCache, info => {
        console.log(info);
      });
    });

A problem with this style of programming
is that the indentation level increses with each asynchronous action,
because you end up in another functin.


REQUEST & RESPONSE:
Asynchronous programs are also built using request-response pairs.
When one program sends a message to another program, or to another location,
that other location immediately sends a reply back of "received confirmation",
it then may also send a result that was requested / answer to a question.

Each message is tagged with a " request type", which determines how it is handled.
We can define "handlers" in our code for each kind of " request type".

A program can have a .send() method that sends off a request.
Its expected arguments are:
    -name of the destination,
    -the "request type",
    -the content of the request.
    -finally a callback functin, (what to do at the end),
     which runs after a response comes back from the destination.


ex:  bigOak.send("Neighbour Nest", "note", "Let's caw loudly at 7pm", () => console.log("Note delivered."));

But to make the destination capable of receiving that request,
we first need to define that "request type" called "note".
The handler for this kind of request has to run on all computers/programs involved.
// ?? We will assume that a handler code has been included in all parties involved.
Our handler code looks like this?:

  import {defineRequestType} from ".crow-tech";

  defineRequestType("note", (nest, content, source, done) => {
    console.log(`${nest.name} received note: ${content}`);
    done();
  });

The "defineRequestType" functin, of course, defines a new type of request.
The example adds support for "note" requests, which just sends a note to a given nest.
It calls console.log(); so that we can verify that the request arrived.
Nests have a "name" property that holds their name.

// TYPO SUBMITTED AND CORRECTION ACCEPTED!

The 3rd argument "done" given to the handler (incorrect maybe? or referring to the last line done())
is a callback functin that it must call when it is done with the request.
If we had used the return value as the response value, that would meant he request handler cant
itself perform asynchronous actions.
A functin doing asynchronous work typically returns before the work is done,
having arranged for a callback to be called when it completes.
So we need some asynchronous mechanism, in this case, another callback functin,
to signal when a response is available.

Asynchronicity is in a way "contagious", because any functin that calls a functin that works asynchronously,
must itself be asynchronous, using a callback or similar mechanism to deliver the result.

Calling "callback" is more involved and error-prone than simply returning a value,
So needing to structure large parts of your program that way is not great.

I think this all means that you dont finish an asynchronous functin with "return"?


PROMISES

With asynchronous actions, instead of arranging for a functin to be called at some point in the future,
you can return an object that represents this future event. Like an IOU?
This is a "promise".
It is an asynchronous action that may complete at some point and produce a value.
It is able to notify anyone interested when that value is available.

The easiest way to create a promise is by calling "Promise.resolve".
This functin ensures that the value you give it is wrapped in a promise.
If its already a promise it is simply returned.
Otherwise you get a new promise that immediately finishes with your value as its result.

    let fifteen = Promise.resolve(15);
    fifteen.then(value => console.log(`Got ${value}`));
    console.log(fifteen.then);
    // Got 15

To get the result of a promise, you can use its "then" method, as shown above.
This registers a callback functin to be called when the promise revolves and produces a value.

You can add multiple callbacks to a single promise.
And they will be called, even if you add them after the promise has already resolved/finished.

The .then() method also does other things.
It returns another promise, which resolves to the values that the handler functin returns,
or if that returns a promise, waits for that promise and then resolves to its result.


Think of promises as a device to move value into an asynchronous reality.
A normal value is simply there.
A promise is a value that "might" already be there or it might appear in the future.
Computations defined in terms of promises are executed asynchronously as the values become available.


TO CREATE A PROMISE:
You can use Promise as a constructr. It has a somewhat odd interface,
the constructr expects a functin as the argument, which it immediately calls,
passing it a functin that it can use to resolve the promise.

It works this way, instead of with a resolve method for example,
so that only the code that create the promise can resolve it.



This is how youd create a promise-based interface for the "readStorage" functin:

    function storage(nest, name) {
      return new Promise(resolve => {
        nest.readStorage(name, result => resolve(result));
      });
    }

    storage(bigOak, "enemies").then(value => console.log("Got", value));

This asynchronous functin returns a meaningful value.
This is the main advantage of promises, they simplify the use of asynchronous functins.
Instead of having to pass around callbacks, promise-based functins look similar to regular ones:
they take input as arguments, and return their output.
The only difference is that the output may not be available yet.


FAILURE:

Regular JavaScript computations can fail by throwing an exception.
Asynchronous computations often need something like that.
A network request may fail, or some code that is as part of the asynchronous computation
may throw an exception.

One of the biggest problems with the callback style of asynchronous programming is that
it is extremely difficult to make sure that failures are properly reported to the callbacks.

A widely used convention is that the first argument in the callback is used to indicate that the action failed.
And the second argument contains the value produced by the action when it was successful.
Such callback functions must always check whether they received an exception,
and make sure that any problems they cause, including exceptions thrown by functions they call,
are caught and given to the right functin.

Promises make this easier.
They can be either resolved (success) or rejected (failed).

THEN:
Resolve handlers (as registered with "then"), are only called when the action is successful,
and rejections are automatically propagated to the new promise that is returned by "then".
When the handler throws an exception, this automatically causes
the promise produced by its "then" call to be rejected,
and no regular handlers are called beyond that point where it failed.

Like resolving a promise provides a value, rejecting one also provides one,
usually called the "reason" of the rejection.

When an exception in a handler functin causes the rejection, the exception value is used as the reason.
Similarly, when a handler returns a promise that is rejected,
that rejection flows into the next promise.
There is a "Promise.reject" functin that creates a new, immediately-rejected promise.

CATCH:
To explicitly handle such rejections, promises have a "catch" method.
Which registers a handler to be called when the promise is rejected,
similar to how "then" handlers handle normal resolution.
It is also very much like "then" in that it returns a new promise,
which resolves to the original promise''s value if it resolves normally,
and to the result of the "catch" handler otherwise.
If a "catch" handler throws an error, the new promise is also rejected.

As a shorthand, "then" also accepts a rejection handler as second argument,
so you can install both types of handlers in a single method call.

A functin passed to the Promise constructr receives a second argument,
alongside the resolve functin, which it can use to reject the new promise.


The chains of promise values created by calls to "then" and "catch"
can be seen as a pipeline/path/trail through which asynchronous values or failures move through.
Since such chains are created by registering handlers,
each link has a "success handler" or a "rejection handler" (or both) associated with it.

Handlers that dont match the type of outcome (success or failure) are ignored.
But those that do match are called, and their outcome determines what kind of value comes next:
  -success when it returns a non-promise value,
  -the outcome of a promise when it returns one of those,
  -and rejection when it throws an exception.

JavaScript environments can detect when a promise isnt handled,
and will report this as an error.
Much like an uncaught exception is handled by the environment.


TIMEOUT:
Makes a request report a failure after a certain period of time of not getting a response.

But we can also make out request functin automatically retry sending the requests
a few times before giving up.
We will make our request functin return a promise.
Callbacks and promises are equivalent in what they can express.
Callback-based functions can be wrapped to expose a promise-based interface and vice-versa.

Even when a request and its reponse are successfully delivered,
the response may still indicate a failure.
Such as when the request tries a request type that has not been identified,
or the handler throws an error.
To support this, "send" and "defineRequestType" follow the convention mentioned before,
where the first argument passed to callbacks is the failure reason, if any,
and the second is the actual result.

These can be translated to promise resolution and rejection by our wrapper.

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

This will work because promises can only be resolved (or rejected) once.
The first time "resolve" or "reject" is called determines the outcome of the promise,
and any further calls, such as the timeout arriving after the request finished,
or a request coming back after another request finished, are ignored.
