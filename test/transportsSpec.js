var assert = require('assert');
const IsTraceLogger = require('../');

describe('ISTraceLogger', function(){

   describe('#create', function(){

      it('should create simple logger', function(){
         var isTraceLogger = new IsTraceLogger();

         assert.strictEqual(isTraceLogger.name, 'isTraceLogger');
         assert.strictEqual(isTraceLogger.level, 'info');
         assert.strictEqual(isTraceLogger.host, 'localhost');
         assert.strictEqual(isTraceLogger.payload.service, null);
         assert.strictEqual(isTraceLogger.payload.message, null);
         assert.strictEqual(isTraceLogger.payload.action, null);
         assert.strictEqual(isTraceLogger.payload.scope, null);
         assert.strictEqual(isTraceLogger.payload.details, null);
      });

      it('should create custom logger', function(){
         var isTraceLogger = new IsTraceLogger({
            host: 'http://requestb.in/1bx09nv1',
            service: 'my service name',
            level: 'debug',
            message: 'my generic message',
            action: 'my global action',
            scope: 'my global scope',
            details: 'if you have some globals objects'
         });

         assert.strictEqual(isTraceLogger.name, 'isTraceLogger');
         assert.strictEqual(isTraceLogger.level, 'debug');
         assert.strictEqual(isTraceLogger.host, 'http://requestb.in/1bx09nv1');
         assert.strictEqual(isTraceLogger.payload.service, 'my service name');
         assert.strictEqual(isTraceLogger.payload.message, 'my generic message');
         assert.strictEqual(isTraceLogger.payload.action, 'my global action');
         assert.strictEqual(isTraceLogger.payload.scope, 'my global scope');
         assert.strictEqual(isTraceLogger.payload.details, 'if you have some globals objects');
      });

      it('should create another custom logger', function(){
         var isTraceLogger = new IsTraceLogger({
            host: 'http://localhost:3000',
            service: 'Mocha-test-case',
            level: 'error',
            details: [
               "dev-mocha test",
               "new service case"
            ]
         });

         assert.strictEqual(isTraceLogger.name, 'isTraceLogger');
         assert.strictEqual(isTraceLogger.level, 'error');
         assert.strictEqual(isTraceLogger.host, 'http://localhost:3000');
         assert.strictEqual(isTraceLogger.payload.service, 'Mocha-test-case');
         assert.strictEqual(isTraceLogger.payload.message, null);
         assert.strictEqual(isTraceLogger.payload.action, null);
         assert.strictEqual(isTraceLogger.payload.scope, null);
         assert.deepEqual(isTraceLogger.payload.details, ["dev-mocha test", "new service case"]);
      });

   });

});
