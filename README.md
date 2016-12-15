#freeze-class [![npm version](https://badge.fury.io/js/freeze-class.svg)](https://badge.fury.io/js/freeze-class) [![Build Status](https://travis-ci.org/msteckyefantis/freeze-class.svg?branch=master)](https://travis-ci.org/msteckyefantis/freeze-class)

[![freezer.jpg](https://s29.postimg.org/gjwm9hhmv/freezer.jpg)](https://postimg.org/image/6zczmlsar/)

##About:
Freeze a class and its prototype.


##install:

```
npm install freeze-class
```

##usage:

```.js
'use strict';

const freezeClass = require( 'freeze-class' );

class C {

	static f() { return 69; }

	f() { return 22; }
}

freezeClass( C );

/*
	the following statements will now return true:
*/

// Object.isFrozen( C );
// Object.isFrozen( C.prototype );

/*
	and the following statements will now throw TypeErrors in strict mode:
*/

// C.g = function() { return 42 };
// C.f = function() { return 42 };
// delete C.f;
// C.constant = 42;
// C.prototype.g = function() { return 42 };
// C.prototype.f = function() { return 42 };
// delete C.prototype.f;
// C.prototype.constant = 42;
```


##optional usage:
[![letitgo.gif](https://s27.postimg.org/gym5t7iib/letitgo.gif)](https://postimg.org/image/ptn03q7an/)

Deep freeze a class.

```.js
'use strict';

const freezeClass = require( 'freeze-class' );

class C {}

C.a = {

    b: {

        c: {

            d: {}
        }
    }
};

C.prototype.x = {

    y: {

        z: {}
    },

    w: {}
};

freezeClass( C, 'deep' );

/*
	the following statements will now return true:
*/

// Object.isFrozen( C );
// Object.isFrozen( C.a );
// Object.isFrozen( C.a.b );
// Object.isFrozen( C.a.b.c );
// Object.isFrozen( C.a.b.c.d );
// Object.isFrozen( C.prototype );
// Object.isFrozen( C.prototype.x );
// Object.isFrozen( C.prototype.x.y );
// Object.isFrozen( C.prototype.x.y.z );
// Object.isFrozen( C.prototype.x.w );
```
