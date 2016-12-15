#freeze-class [![npm version](https://badge.fury.io/js/freeze-class.svg)](https://badge.fury.io/js/freeze-class) [![Build Status](https://travis-ci.org/msteckyefantis/freeze-class.svg?branch=master)](https://travis-ci.org/msteckyefantis/freeze-class)

[![freezer.jpg](https://s29.postimg.org/gjwm9hhmv/freezer.jpg)](https://postimg.org/image/6zczmlsar/)

##About:
Freeze a class and its properties. This includes freezing the class' prototype, freezing any other properties of the class, and freezing the class itself.


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
	all of the following statements will now throw TypeErrors in strict mode:
*/

// C.f = function() { return 42 };
// C.prototype.f = function() { return 42 };
// delete C.f;
// delete C.prototype.f;
// C.g = function() { return 42 };
// C.prototype.g = function() { return 42 };
// C.constant = 42;
// C.prototype.constant = 42;
```
