var React = require('react');
var TodoActions = require('../actions/toDoActions');
var TodoTextInput = require('./react.toDoTextInput');

var TodoHeader = React.createClass({

    //used for validations.
    propTypes: {},

    //UI action handler
    onSave: function(text) {
        if (text.trim()) {
            TodoActions.create(text);
        }
    },

    //returns object to be rendered. 
    render: function() {
        return ( < header id = "header" >

            < h1 > todos < /h1> 

            < TodoTextInput id = "new-todo"
            placeholder = "Please insert your item here."
            onSave = { this.onSave }
            /> </header >
        );
    }
});

module.exports = TodoHeader;
