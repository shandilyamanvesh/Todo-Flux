var Promise = require('es6-promise').Promise;
var assign = require('object-assign');


var _callbacks = [];
var _promises = [];


var Dispatcher = function() {
    // body...
};

Dispatcher.prototype = assign({}, Dispatcher.prototype, {

    //Refister callback from stores and return its index.
    register: function(callback) {
        _callbacks.push(callback);
        return _callbacks.length - 1;
    },

    //dispatch callbacks to stores when receives an event from view-action/actionHelpers.
    dispatch: function(payload) {

        // First create array of promises for callbacks to reference.
        var resolves = [];
        var rejects = [];
        _promises = _callbacks.map(function(_, i) {
            return new Promise(function(resolve, reject) {
                resolves[i] = resolve;
                rejects[i] = reject;
            });
        });


        // Dispatch to callbacks and resolve/reject promises.
        // this is useful for waitFor().
        _callbacks.forEach(function(callback, i) {
            Promise.resolve(callback(payload)).then(function() {
                resolves[i](payload);
            }, function() {
                rejects[i](new Error('Dispatcher callback unsuccessful'));
            });
        });


        //clear promises array.
        _promises = [];

    }

});


module.exports = Dispatcher;
