'use strict';


module.exports = function freezeClass( classToFreeze ) {

    const propertiesToFreeze = Object.getOwnPropertyNames( classToFreeze );

    for( let property of propertiesToFreeze ) {

        Object.freeze( classToFreeze[ property ] );
    }

    return Object.freeze( classToFreeze );
}
