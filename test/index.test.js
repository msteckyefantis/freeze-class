'use strict';
/* jshint expr: true */

const expect = require( 'chai' ).expect;

const ROOT_PATH = '../';

const MODULE_PATH = 'index.js';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const freezeClass = require( FULL_MODULE_PATH );


describe( MODULE_PATH, function() {

    describe( 'class', function() {

        it( "is frozen (let it go)", function() {

            const ControlClass = class { f() { return 69 } };

            freezeClass( ControlClass );

            expect( Object.isFrozen( ControlClass ) ).to.be.true;
        });

        it( "can't add static methods", function() {

            const ControlClass = class { f() { return 69 } };

            freezeClass( ControlClass );

            let erroredAsExpected = false;

            try {

                ControlClass.g = function() { return 22 };
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

        it( "can't add static property (number)", function() {

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
    });

    describe( 'class prototype', function() {

        it( "is frozen (let it goooo)", function() {

            const ControlClass = class { f() { return 69 } };

            freezeClass( ControlClass );

            expect( Object.isFrozen( ControlClass.prototype ) ).to.be.true;
        });

        it( "can't add methods", function() {

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

        it( "can't edit methods", function() {

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

        it( "can't delete methods", function() {

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

        it( "can't add static property (number)", function() {

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
});
