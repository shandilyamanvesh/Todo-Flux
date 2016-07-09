var React = require('react');
var TodoStore = require('../store/toDoStore');


// a parent view-controller that watches data changes at the top of hierarchy.
var TodoApp = React.createClass({
    /**
     * return content to be rendered
     */
    render: function() {
        return (React.createElement('h1', null, 'Hello people'));
    },

});

module.exports = TodoApp;
