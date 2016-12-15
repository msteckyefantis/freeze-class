'use strict';
/* jshint expr: true */

const expect = require( 'chai' ).expect;

const ROOT_PATH = '../';

const MODULE_PATH = 'index';

const FULL_MODULE_PATH = ROOT_PATH + MODULE_PATH;

const freezeClass = require( FULL_MODULE_PATH );

const DEEP = 'deep';


describe( MODULE_PATH, function() {

    describe( 'init', function() {

        it( 'class not a class', function() {

            const ControlBadClass = {};

            let erroredAsExpected = false;

            try {

                freezeClass( ControlBadClass );
            }
            catch( err ) {

                if( err instanceof TypeError ) {

                    expect( err.message ).to.equal( 'freeze-class error: invalid class input' );

                    erroredAsExpected = true;
                }
            }
            finally {

                expect( erroredAsExpected ).to.be.true;
            }
        });

        it( 'mode not a string', function() {

            const ControClass = class {};

            const controlBadMode = {};

            let erroredAsExpected = false;

            try {

                freezeClass( ControClass, controlBadMode );
            }
            catch( err ) {

                if( err instanceof TypeError ) {

                    expect( err.message ).to.equal( 'freeze-class error: invalid mode input' );

                    erroredAsExpected = true;
                }
            }
            finally {

                expect( erroredAsExpected ).to.be.true;
            }
        });
    });

    describe( 'class', function() {

        it( "returns class", function() {

            const ControlClass = class { f() { return 69 } };

            expect( freezeClass( ControlClass ) ).to.equal( ControlClass );
        });

        it( "is frozen (let it go)", function() {

            const ControlClass = class { f() { return 69 } };

            expect( freezeClass( ControlClass ) ).to.equal( ControlClass );

            expect( Object.isFrozen( ControlClass ) ).to.be.true;
        });

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

            const ControlClass = class { static f() { return 69 } };

            freezeClass( ControlClass );

            let erroredAsExpected = false;

            try {

                ControlClass.prototype.f = function() { return 22 };
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

    describe( 'deepFreeze mode', function() {

        it( 'normal operation', function() {

            const ControlClass = class {};

            ControlClass.a = {

                b: {

                    c: {

                        d: {

                            e: {

                                f: {

                                    g: {}
                                }
                            }
                        }
                    }
                }
            }

            ControlClass.prototype.a = {

                b: {},
                c: {},
                d: {},
                e: {},
                f: {},
                g: {
                    h: {},
                    i: {}
                }
            };

            expect( freezeClass( ControlClass, DEEP ) ).to.equal( ControlClass );

            expect( Object.isFrozen( ControlClass ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.a ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.a.b ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.a.b.c ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.a.b.c.d ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.a.b.c.d.e ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.a.b.c.d.e.f ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.a.b.c.d.e.f.g ) ).to.be.true;

            expect( Object.isFrozen( ControlClass.prototype ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.prototype.a ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.prototype.a.b ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.prototype.a.b ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.prototype.a.d ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.prototype.a.e ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.prototype.a.f ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.prototype.a.g ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.prototype.a.g.h ) ).to.be.true;
            expect( Object.isFrozen( ControlClass.prototype.a.g.i ) ).to.be.true;
        });
    });
});
