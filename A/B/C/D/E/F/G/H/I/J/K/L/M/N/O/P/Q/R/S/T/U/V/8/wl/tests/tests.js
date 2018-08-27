var tests = {

    'Initialization':
    function() {
        lighttest.check(
            wl &&
            wl.Whenable
        );

        lighttest.done();
    },

    'Emission':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();
        var ok = false;
        whenTriggered(function(){
            ok = true;
            lighttest.check(true);
            lighttest.done();
        });

        w.emit();
        
        setTimeout(function(){
            if (!ok) {
                lighttest.check(false);
                lighttest.done();
            }
        },1000);
    },
    
    'Subscription after emission':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();
        w.emit();

        var ok = false;
        whenTriggered(function(){
            ok = true;
            lighttest.check(true);
            lighttest.done();
        });

        setTimeout(function(){
            if (!ok) {
                lighttest.check(false);
                lighttest.done();
            }
        },1000);
    },
    
    
    'Multiple subscriptions':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();

        var cb1done = false;
        var cb1 = function() {
            lighttest.check(true);
            cb1done = true;
        };

        var cb2done = false;
        var cb2 = function() {
            lighttest.check(true);
            cb2done = true;
        };
        
        whenTriggered(cb1);
        whenTriggered(cb2);

        w.emit();
        
        var cb3done = false;
        var cb3 = function() {
            lighttest.check(true);
            cb3done = true;
        };
        

        var cb4done = false;
        var cb4 = function() {
            lighttest.check(true);
            cb4done = true;
        };
        
        whenTriggered(cb3);
        whenTriggered(cb4);
        

        var ok = false;
        var fin = function() {
            lighttest.check(cb1done);
            lighttest.check(cb2done);
            lighttest.check(cb3done);
            lighttest.check(cb4done);

            ok = true;
            lighttest.done();
        }

        setTimeout(
            function() {
                whenTriggered(fin);
            }, 500
        );


        setTimeout(function(){
            if (!ok) {
                lighttest.check(false);
                lighttest.done();
            }
        },1000);
    },
    
    
    'Emission upon timeout':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();
        var ok1 = false;
        whenTriggered(function(){
            ok1 = true;
            lighttest.check(true);
        });

        setTimeout(function() {
            w.emit();
        },100);

        var ok2 = false;
        setTimeout(function() {
            whenTriggered(function(){
                ok2 = true;
                lighttest.check(true);
            });
        },100);

        var ok3 = false;
        setTimeout(function() {
            whenTriggered(function(){
                ok3 = true;
                lighttest.check(true);
            });
        },200);

        setTimeout(function(){
            lighttest.check(ok1&&ok2&&ok3);
            lighttest.done();
        },400);
    },
    
    'Never emitted whenable':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();

        var ok = true;
        whenTriggered(function(){
            ok = false;
            lighttest.check(false);
        });

        setTimeout(function(){
            lighttest.check(ok);
            lighttest.done();
        },300);
    },
    
    'Transferring argument':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();
        var ok = false;
        whenTriggered(function(hello, world){
            ok = true;
            lighttest.check(hello == 'hello');
            lighttest.check(world == 'world');
            lighttest.done();
        });

        w.emit('hello', 'world');
        
        setTimeout(function(){
            if (!ok) {
                lighttest.check(false);
                lighttest.done();
            }
        },1000);
    },
    
    
    'Transferring arguments for two listeners':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();
        var ok1 = false;
        whenTriggered(function(hello, world){
            ok1 = true;
            lighttest.check(hello == 'hello');
            lighttest.check(world == 'world');
        });

        var ok2 = false;
        whenTriggered(function(hello, world){
            ok2 = true;
            lighttest.check(hello == 'hello');
            lighttest.check(world == 'world');
        });

        w.emit('hello', 'world');
        
        setTimeout(function(){
            lighttest.check(ok1&&ok2);
            lighttest.done();
        },300);
    },
    
    
    'Applying context':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();
        var ok = false;

        var ctx = {
            hello: 'hello',
            world: 'world'
        };

        whenTriggered(function(){
            ok = true;
            lighttest.check(this.hello == 'hello');
            lighttest.check(this.world == 'world');
            lighttest.done();
        }, ctx);

        w.emit();
        
        setTimeout(function(){
            if (!ok) {
                lighttest.check(false);
                lighttest.done();
            }
        },1000);
    },
    
    
    'Applying different contexts':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();

        var ctx1 = {
            hello1: 'hello1'
        };

        var ok1 = false;
        whenTriggered(function(){
            ok1 = true;
            lighttest.check(this.hello1 == 'hello1');
        }, ctx1);

        w.emit();

        var ctx2 = {
            hello2: 'hello2'
        };

        var ok2 = false;
        whenTriggered(function(){
            ok2 = true;
            lighttest.check(this.hello2 == 'hello2');
        }, ctx2);

        setTimeout(function(){
            lighttest.check(ok1&&ok2);
            lighttest.done();
        },300);
    },
    
    
    'Applying context and transferring arguments':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();
        var ok = false;

        var ctx = {
            hello: 'hello',
            world: 'world'
        };

        whenTriggered(function(hello2, world2){
            ok = true;
            lighttest.check(this.hello == 'hello');
            lighttest.check(this.world == 'world');
            lighttest.check(hello2 == 'hello2');
            lighttest.check(world2 == 'world2');
            lighttest.done();
        }, ctx);

        w.emit('hello2','world2');
        
        setTimeout(function(){
            if (!ok) {
                lighttest.check(false);
                lighttest.done();
            }
        },1000);
    },
    
    
    'Subscribing not a function':
    function() {
        var w = new wl.Whenable;
        var whenTriggered = w.getSubscriber();

        var ok1 = false;
        try {
            whenTriggered([]);
        } catch(e) {
            ok1 = true;
        }
        
        lighttest.check(ok1);

        var ok2 = false;
        try {
            whenTriggered({});
        } catch(e) {
            ok2 = true;
        }
        
        lighttest.check(ok2);

        var ok3 = false;
        try {
            whenTriggered('function');
        } catch(e) {
            ok3 = true;
        }
        
        lighttest.check(ok3);

        lighttest.done();
    }
    
    
};


lighttest.start(tests);

