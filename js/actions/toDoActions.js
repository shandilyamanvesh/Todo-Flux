var AppDispatcher = require('../dispatcher/appDispatcher');
var TodoConstants = require('../constants/toDoConstants');

var ToDoActions = {
    // sends a create action payload to dispatcher
    create: function(text) {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_CREATE,
            text: text
        });
    },
};

module.exports = ToDoActions;
