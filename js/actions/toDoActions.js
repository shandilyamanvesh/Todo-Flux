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

    //updates a particular todo based on Id
    updateText: function(id, text) {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_UPDATE_TEXT,
            id: id,
            text: text
        });
    },

    //toggles item complete state.
    toggleComplete: function(todo) {
        var id = todo.id;
        var actionType = todo.complete ?
            TodoConstants.TODO_UNDO_COMPLETE :
            TodoConstants.TODO_COMPLETE;

        AppDispatcher.handleViewAction({
            actionType: actionType,
            id: id
        });
    },

    // Mark all ToDos as complete
    toggleCompleteAll: function() {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
        });
    },

    //deletes a specific item.
    destroy: function(id) {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_DESTROY,
            id: id
        });
    },

    //Deletes all the completed ToDos
    destroyCompleted: function() {
        AppDispatcher.handleViewAction({
            actionType: TodoConstants.TODO_DESTROY_COMPLETED
        });
    }
};

module.exports = ToDoActions;
