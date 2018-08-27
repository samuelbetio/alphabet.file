/**
 * @fileoverview wl - Whenable events
 * @version 0.2.1
 * 
 * @license MIT, see http://github.com/asvd/wl
 * Copyright (c) 2014 asvd <heliosframework@gmail.com> 
 * 
 */


(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
        factory(exports);
    } else {
        factory((root.wl = {}));
    }
}(this, function (exports) {


    /**
     * Whenable event object constructor
     */
    var Whenable = function() {
        this._emitted = false;  // event state, may be emitted or not
        this._listeners = [];
        this._result = [];      // args to transfer to the listener
    }

      
    /**
     * Fires the event, issues the listeners
     * 
     * @param ... all given arguments are forwarded to the listeners
     */
    Whenable.prototype.emit = function(){
        if (!this._emitted) {
            this._emitted = true;

            for (var i = 0; i < arguments.length; i++) {
                this._result.push(arguments[i]);
            }

            var listener;
            while(listener = this._listeners.pop()) {
                this._invoke(listener[0], listener[1], this._result);
            }
        }
    }
      
    
    /**
     * @returns {Function} whenable subscriber to the event
     */
    Whenable.prototype.getSubscriber = function() {
        var me = this;
        return function(listener, ctx) {
            me._whenEmitted(listener, ctx);
        }
    }

      
    /**
     * Adds another listener to be executed upon the event emission
     * 
     * @param {Function} func listener function to subscribe
     * @param {Object} ctx optional context to call the listener in
     */
    Whenable.prototype._whenEmitted = function(func, ctx){
        func = this._checkListener(func);
        if (this._emitted) {
            this._invoke(func, ctx, this._result);
        } else {
            this._listeners.push([func, ctx||null]);
        }
    }
      
      
    /**
     * Checks if the provided object is suitable for being subscribed
     * to the event (= is a function), throws an exception otherwise
     * 
     * @param {Object} obj to check for being subscribable
     * 
     * @throws {Exception} if object is not suitable for subscription
     * @returns {Object} the provided object if yes
     */
    Whenable.prototype._checkListener = function(listener){
        var type = typeof listener;
        if (type != 'function') {
            var msg =
                'A function may only be subsribed to the event, '
                + type
                + ' was provided instead'
            throw new Error(msg);
        }

        return listener;
    }
      
      
    /**
     * (Asynchronously) invokes the given listener in the context with
     * the arguments
     * 
     * @param {Function} listener to invoke
     * @param {Object} ctx context to invoke the listener in
     * @param {Array} args to provide to the listener
     */
    Whenable.prototype._invoke = function(listener, ctx, args) {
        setTimeout(function() {
            listener.apply(ctx, args);
        },0);
    }

      
    /**
     * For the given whenable subscribers produces another whenable
     * subscriber which fires when any of the given subscribers fire
     * 
     * @param {Function} when1
     * @param {Function} when2
     * @param ...
     * 
     * @returns {Function}
     */
    var whenAny = function() {
        var when = new wl.Whenable;

        for (var i = 0; i < arguments.length; i++) {
            arguments[i](function(){
                when.emit();
            });
        }

        return when.getSubscriber();
    }
    
    
    
    /**
     * For the given whenable subscribers produces another whenable
     * subscriber which fires when all of the given subscribers fire
     * 
     * @param {Function} when1
     * @param {Function} when2
     * @param ...
     * 
     * @returns {Function}
     */
    var whenAll = function() {
        if (arguments.length == 1) {
            return arguments[0];
        } else {
            var whenAll = new wl.Whenable;

            var whenFirst = arguments[0];
            var rest = [].slice.call(arguments,1);
            var whenRest = wl.whenAll.apply(null,rest);
            whenFirst(function(){
                whenRest(function(){
                    whenAll.emit();
                });
            });

            return whenAll.getSubscriber();
        }
    }
    
    
    exports.Whenable = Whenable;
    exports.whenAny = whenAny;
    exports.whenAll = whenAll;
}));

