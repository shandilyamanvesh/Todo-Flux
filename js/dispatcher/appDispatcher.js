var Dispatcher = require('./dispatcher');
var assign = require('object-assign');

var AppDispatcher = assign({}, Dispatcher.prototype, {

    /**
     * A bridge function between the views/actionHelpers and the dispatcher, marking the action
     * as a view action and then uses dispatchers's dispatch method to call stores.
     */

    handleViewAction: function(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    }

});

module.exports = AppDispatcher;
