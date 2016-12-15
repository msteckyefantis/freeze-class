'use strict';

const DEEP = 'deep';

const OBJECT = 'object';

const FUNCTION = 'function';


module.exports = function freezeClass( classOrObject, mode ) {

    validateInput( classOrObject, mode );

    if( mode === DEEP ) {

        return deepFreezeObject( classOrObject );
    }

    Object.freeze( classOrObject.prototype );

    return Object.freeze( classOrObject );
}


function deepFreezeObject( object ) {
    /* NOTE: does accept a class too,
        but will not recursively freeze a class within a class/object
    */

    for( let name of Object.getOwnPropertyNames( object ) ) {

        const property = object[name];

        if( (typeof property === OBJECT) && (property !== null) ) {

            deepFreezeObject( property );
        }
    }

    return Object.freeze( object )
}


function validateInput( classOrObject, mode ) {

    if( mode && (mode !== DEEP) ) {

        throw new TypeError( 'freeze-class error: invalid mode input' );
    }

    const classOrObjectType = typeof classOrObject;

    if( classOrObjectType === FUNCTION ) {

        return;
    }

    if( (mode === DEEP) && (classOrObjectType === OBJECT) ) {

        return;
    }

    throw new TypeError( 'freeze-class error: invalid class or object input' );
}
