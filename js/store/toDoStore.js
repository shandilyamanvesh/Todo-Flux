var AppDispatcher = require('../dispatcher/appDispatcher');
var TodoConstants = require('../constants/toDoConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

//todo object. A look up table format for todo items.
var _todos = {};

/**
 * Create a TODO item.
 * @param  {string} text The content of the TODO
 */
function create(text) {
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
        id: id,
        complete: false,
        text: text
    };
}

/**
 * Update a TODO item.
 * @param  {string} id
 * @param {object} update is an object literal containing only the data to be updated.
 */
function update(id, updateObj) {
    _todos[id] = assign({}, _todos[id], updateObj);
}

/**
 * Update all of the TODO items with the same object.
 * @param {object} update is an object literal containing only the data to be updated.
 */
function updateAll(updateObj) {
    for (var id in _todos) {
        update(id, updateObj);
    }
}

/**
 * Delete a TODO item.
 * @param  {string} id
 */
function destroy(id) {
    delete _todos[id];
}

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
    for (var id in _todos) {
        if (_todos[id].complete) {
            destroy(id);
        }
    }
}

//todo store.
var ToDoStore = assign({}, EventEmitter.prototype, {

    /**
     * Tests whether all the remaining TODO items are marked as completed.
     */
    areAllComplete: function() {
        for (var id in _todos) {
            if (!_todos[id].complete) {
                return false;
            }
        }
        return true;
    },

    /**
     * Get the entire collection of TODOs, an object.
     */
    getAll: function() {
        return _todos;
    },

    /**
     * emit "change" event to all listner views.
     */
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * add the specified listner to callback collection.
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * remove the specified listner from callback collection.
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    /*
     * Register callback to AppDispatcher to handle all updates
     * params {object} action comes from appDispatcher which inturn is an event 
     * raised by views/actionHelpers.
     * Also we keep the index at which this callback is registered in dispatcher.
     */
    dispatcherIndex: AppDispatcher.register(function(payload) {
        var text;
        var action = payload.action;

        switch (action.actionType) {
            case TodoConstants.TODO_CREATE:
                text = action.text.trim();
                if (text !== '') {
                    create(text);
                    ToDoStore.emitChange();
                }
                break;
            case TodoConstants.TODO_TOGGLE_COMPLETE_ALL:
                if (ToDoStore.areAllComplete()) {
                    updateAll({ complete: false });
                } else {
                    updateAll({ complete: true });
                }
                ToDoStore.emitChange();
                break;

            case TodoConstants.TODO_UNDO_COMPLETE:
                update(action.id, { complete: false });
                ToDoStore.emitChange();
                break;

            case TodoConstants.TODO_COMPLETE:
                update(action.id, { complete: true });
                ToDoStore.emitChange();
                break;

            case TodoConstants.TODO_UPDATE_TEXT:
                text = action.text.trim();
                if (text !== '') {
                    update(action.id, { text: text });
                    ToDoStore.emitChange();
                }
                break;

            case TodoConstants.TODO_DESTROY:
                destroy(action.id);
                ToDoStore.emitChange();
                break;

            case TodoConstants.TODO_DESTROY_COMPLETED:
                destroyCompleted();
                ToDoStore.emitChange();
                break;
            default:
                break;
        }

        return true;
    })
});


//export the todo store.
module.exports = ToDoStore;
