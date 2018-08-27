wl - Whenable events
====================


[![Build Status](https://travis-ci.org/asvd/wl.svg?branch=master)](https://travis-ci.org/asvd/wl)

There are two kinds of events:

- *Reusable* events which may happen many times, like a mouse click or
  a keypress. When subscribing to such an event, one normally does not
  care if an event has already been triggered in the past. One just
  needs to react to the event each time it happens in the future.

- *One-off* events which only happen once (or do not happen at all),
  for instance a page load event, an ajax-request responce, a complete
  of a calculation delegated to a worker, or an asynchronous function
  callback. For this kind of events it matters if an event has already
  been triggered at the moment of subscription (which means there
  should be additional check). In latter case the listener should
  likely be performed immediately.

Whenable is a design pattern targeted to simplify dealing with the
second kind of events by providing a special kind of listener
subscriber.  When using that subscriber, one does not need to worry
about if an event has already been triggered, in this case the
listener is invoked immediately. Additionally, the subscriber may be
used several times to store additional listeners.

A good example of what could be simplified by using the Whenable
solution is the page onload event. Here is how one can listen to the
onload event in the traditional style:

```js
if (document.readyState == "complete") {
    // page has already been loaded
    doWhatWeNeed();
} else {
    // preserving any existing listener
    var origOnload = window.onload || function(){};

    window.onload = function(){
        origOnload();
        doWhatWeNeed();
    }
}
```

The code should be performed each time a new listener should react to
the onload event. Using a whenable subscriber everything above is
simplified to:


```js
window.whenLoaded(doWhatWeNeed);
```

*The code says: call the given function `doWhatWeNeed()` if the page
is loaded, otherwise wait until the page is loaded, and then call the
function.*

Listener subscribers which behave like explained above are
conventionally named starting with the `when..` prefix and followed by
a past participle describing an event: `whenLoaded()`,
`whenCompleted()`, `whenFailedToLoad()` and so on. The *Whenable* term
is also used to refer to a one-off event supporting this kind of
subscription.

Whenable pattern was inspired by
[Promises](http://www.html5rocks.com/en/tutorials/es6/promises/), and
it is similar to Promises in that it also allows not to care about
when an event actually fires. But unlike Promises, Whenable is much
easier to use and understand, produces simplier code, and is more
general solution thus covering a wider range of use-cases.

This `wl` library implements the `Whenable` object, which represents
such an event and can be used to easily produce a whenable-style
subscriber.


### Installation

For the web-browser environment — download the
[distribution](https://github.com/asvd/wl/releases/download/v0.2.1/wl-0.2.1.tar.gz),
unpack it and load the `wl.js` in a preferrable way. That is an
UMD module, thus for instance it may simply be loaded as a plain
JavaScript file using the `<script>` tag:

```html
<script src="wl/wl.js"></script>
```

For Node.js — install `wl` with npm:

```sh
$ npm install wl
```

and then in your code:

```js
var wl = require('wl');
```

Optionally you may load the script from the
[distribution](https://github.com/asvd/wl/releases/download/v0.2.1/wl-0.2.1.tar.gz):

```js
var wl = require('path/to/wl.js');
```

After the module is loaded, the `wl.Whenable()` constructor is
available.



### Usage

Constructing a Whenable event is simple:

```js
var myWhenable = new wl.Whenable;
```

The object has the two methods. The `emit()` method fires the event
and invokes the subscribed listeners:

```js
myWhenable.emit();
```

The `getSubscriber()` method returns a whenable-style subscriber
function:

```js
var whenEventTriggered = myWhenable.getSubscriber();
```

The subscriber may later be reused to subscribe a listener to the
event:

```js
whenEventTriggered(myListener);
```

The `myListener()` will be invoked after the event is triggered. If
the event has already been triggered at the moment of subscription,
the listener is called immediately (yet asynchronously in order to
keep the flow consistent).

The methods of the `Whenable` object (along with the `Whenable`
instance itself) are not supposed to be exposed to the event
user. Normally the `Whenable` event is stored private and is emitted
by internal means. Instead the whenable subscriber function (returned
by the `getSubscriber()` method) is to be provided to the user so that
he can attach listeners to the event.

When subscribing a listener, the context may be provided as a second
argument:

```js
whenEventTriggered(myObject.someMethod, myObject);
```

Upon the event is triggered, the subscribed listeners are executed in
their respective contexts (if provided upon subscription).

Additionally, the `emit()` method may take any set of arguments which
are simply forwarded as the arguments provided to the subscribed
listeners. This allows to supply the listeners with some details about
the event:

```js
myWhenable.emit(result);
```



### Examples


Here is an ordinary asynchronous function which executes a callback
after some time:

```js
var doSomething = function(cb) {
    setTimeout(cb, 1000);
}
```

Let us create a Whenable event representing the function completion:


```js
var somethingWhenable = new wl.Whenable;

var initiateSomething = function() {
    doSomething(function() {
        somethingWhenable.emit();
    });
}

var whenSomethingDone = somethingWhenable.getSubscriber();
```

Now there are the two functions:

- `initiateSomething()` starts the process which should lead to the
  event emission in the future, and

- `whenSomethingDone()`, the whenable-style subscriber which may
  subscribe as many listeners as needed, before or after the event
  is emitted.

Those two functions may now be used separately by different parts of
application.

Similarly, if there is an asynchronous routine with two outcomes, one
may prepare the two whenable events:


```js
var doSomething = function(successCb, failureCb) {
    var cb = function() {
        try {
            // do something that may fail
            ...
        } catch(e) {
            return failureCb();
        }

        successCb();
    }

    setTimeout(cb, 1000);
}
```


```js
var success = new wl.Whenable;
var failure = new wl.Whenable;

var initiateSomething = function() {
    doSomething(
        function(){success.emit();},
        function(){failure.emit();}
    );
}

var whenSomethingSucceded = success.getSubscriber();
var whenSomethingFailed = failure.getSubscriber();
```

The code above provides the similar initiator function
`initiateSomething()`, and the two whenable subscribers,
`whenSomethingSucceeded()` and `whenSomethingFailed()` which subscribe
a provided listener to the success or failure outcomes respectively.

Another example: here is the implementation of the magic
`window.whenLoaded()` subscriber given in the beginning of this
text. The subscriber is used to react to the page load event:

```js
var onloadWhenable = new wl.Whenable;

if (document.readyState == "complete") {
    // already loaded
    onloadWhenable.emit();
} else {
    // preserving existing listener
    var origOnload = window.onload || function(){};

    window.onload = function(){
        origOnload();
        onloadWhenable.emit();
    }
}

window.whenLoaded = onloadWhenable.getSubscriber();
```


follow me on twitter: https://twitter.com/asvd0

