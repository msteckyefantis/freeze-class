'use strict';

const DEEP = 'deep';


module.exports = function freezeClass( ClassToFreeze, mode ) {

    validateInput( ClassToFreeze, mode );

    if( mode === DEEP ) {

        return deepFreezeObject( ClassToFreeze );
    }

    Object.freeze( ClassToFreeze.prototype );

    return Object.freeze( ClassToFreeze );
}


function deepFreezeObject( object ) {

    for( let name of Object.getOwnPropertyNames( object ) ) {

        const property = object[name];

        if( (typeof property === 'object') && (property !== null) ) {

            deepFreezeObject( property );
        }
    }

    return Object.freeze( object )
}


function validateInput( ClassToFreeze, mode ) {

    if( typeof ClassToFreeze !== 'function' ) {

        throw new TypeError( 'freeze-class error: invalid class input' );
    }

    if( mode && typeof mode !== 'string' ) {

        throw new TypeError( 'freeze-class error: invalid mode input' );
    }
}
