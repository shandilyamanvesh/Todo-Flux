var React = require('react');
var ReactPropTypes = React.PropTypes;
var classNames = require('classnames');
var TodoActions = require('../actions/toDoActions');
var TodoTextInput = require('./react.toDoTextInput');

var TodoItem = React.createClass({

    //validation
    propTypes: {
        todo: ReactPropTypes.object.isRequired
    },

    //set initial state.
    getInitialState: function() {
        return {
            isEditing: false
        };
    },

    //UI actions
    onToggleComplete: function() {
        TodoActions.toggleComplete(this.props.todo);
    },

    onDoubleClick: function() {
        this.setState({ isEditing: true });
    },

    onSave: function(text) {
        TodoActions.updateText(this.props.todo.id, text);
        this.setState({ isEditing: false });
    },

    onDestroyClick: function() {
        TodoActions.destroy(this.props.todo.id);
    },

    //returns object to be rendered.
    render: function() {
        var todo = this.props.todo;

        var input;
        //In case item is edited text input will be returned.
        if (this.state.isEditing) {
            input = <TodoTextInput
            className = "edit"
            onSave = { this.onSave }
            value = { todo.text }
            />;
        }

        return ( <li className = {
                classNames({
                    'completed': todo.complete,
                    'editing': this.state.isEditing
                })
            }
            key = { todo.id }>
            <div className = "view">
            <input className = "toggle"
            type = "checkbox"
            checked = { todo.complete }
            onChange = { this.onToggleComplete }
            /> 
            <label onDoubleClick = { this.onDoubleClick } > { todo.text } </label> 
            <button className = "destroy" onClick = { this.onDestroyClick }/> 
            </div> { input } </li>
        );
    }

});

module.exports = TodoItem;
