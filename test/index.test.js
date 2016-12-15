'use strict';
/* jshint expr: true */

const expect = require( 'chai' ).expect;

const ROOT_PATH = '../';

const MODULE_PATH = 'index.js';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const freezeClass = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    it( "can't add static methods", function() {

        const ControlClass = class { f() { return 69 } };

        freezeClass( ControlClass );

        let erroredAsExpected = false;

        try {

            ControlClass.f = function() { return 22 };
        }
        catch( err ) {

            if( err instanceof TypeError ) {

                expect( err.message ).to.include( 'object is not extensible' );

                erroredAsExpected = true;
            }
        }
        finally {

            expect( erroredAsExpected ).to.be.true;
        }
    });

    it( "can't edit static methods", function() {

        const ControlClass = class { static f() { return 69 } };

        freezeClass( ControlClass );

        let erroredAsExpected = false;

        try {

            ControlClass.f = function() { return 22 };
        }
        catch( err ) {

            if( err instanceof TypeError ) {

                expect( err.message ).to.include( 'Cannot assign to read only property' );

                erroredAsExpected = true;
            }
        }
        finally {

            expect( erroredAsExpected ).to.be.true;
        }
    });

    it( "can't delete static methods", function() {

        const ControlClass = class { static f() { return 69 } };

        freezeClass( ControlClass );

        let erroredAsExpected = false;

        try {

            delete ControlClass.f;
        }
        catch( err ) {

            if( err instanceof TypeError ) {

                expect( err.message ).to.include( 'Cannot delete property' );

                erroredAsExpected = true;
            }
        }
        finally {

            expect( erroredAsExpected ).to.be.true;
        }
    });

    it( "can't add static property (constant)", function() {

        const ControlClass = class { f() { return 69 } };

        freezeClass( ControlClass );

        let erroredAsExpected = false;

        try {

            ControlClass.constant = 42;
        }
        catch( err ) {

            if( err instanceof TypeError ) {

                expect( err.message ).to.include( 'object is not extensible' );

                erroredAsExpected = true;
            }
        }
        finally {

            expect( erroredAsExpected ).to.be.true;
        }
    });

    it( "can't add prototype methods", function() {

        const ControlClass = class { f() { return 69 } };

        freezeClass( ControlClass );

        let erroredAsExpected = false;

        try {

            ControlClass.prototype.g = function() { return 22 };
        }
        catch( err ) {

            if( err instanceof TypeError ) {

                expect( err.message ).to.include( 'object is not extensible' );

                erroredAsExpected = true;
            }
        }
        finally {

            expect( erroredAsExpected ).to.be.true;
        }
    });

    it( "can't edit prototype methods", function() {

        const ControlClass = class { f() { return 69 } };

        freezeClass( ControlClass );

        let erroredAsExpected = false;

        try {

            ControlClass.prototype.f = function() { return 22 };
        }
        catch( err ) {

            if( err instanceof TypeError ) {

                expect( err.message ).to.include( 'Cannot assign to read only property' );

                erroredAsExpected = true;
            }
        }
        finally {

            expect( erroredAsExpected ).to.be.true;
        }
    });

    it( "can't delete prototype methods", function() {

        const ControlClass = class { f() { return 69 } };

        freezeClass( ControlClass );

        let erroredAsExpected = false;

        try {

            delete ControlClass.prototype.f;
        }
        catch( err ) {

            if( err instanceof TypeError ) {

                expect( err.message ).to.include( 'Cannot delete property' );

                erroredAsExpected = true;
            }
        }
        finally {

            expect( erroredAsExpected ).to.be.true;
        }
    });

    it( "can't add static property to prototype (constant)", function() {

        const ControlClass = class { f() { return 69 } };

        freezeClass( ControlClass );

        let erroredAsExpected = false;

        try {

            ControlClass.prototype.constant = 42;
        }
        catch( err ) {

            if( err instanceof TypeError ) {

                expect( err.message ).to.include( 'object is not extensible' );

                erroredAsExpected = true;
            }
        }
        finally {

            expect( erroredAsExpected ).to.be.true;
        }
    });
});
