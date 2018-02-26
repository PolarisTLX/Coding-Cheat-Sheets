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
