'use strict';


module.exports = function freezeClass( classToFreeze ) {

    Object.freeze( classToFreeze.prototype );

    return Object.freeze( classToFreeze );
}
