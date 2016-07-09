var React = require('react');
var ReactPropTypes = React.PropTypes;
var classNames = require('classnames');

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

    //returns object to be rendered.
    render: function() {
    	var todo = this.props.todo;

        return ( <li className = {
                classNames({
                    'completed': todo.complete,
                    'editing': this.state.isEditing
                })
            }
            key = { todo.id } >
            <label>{todo.text}</label> 
            </li>
        );
    }

});

module.exports = TodoItem;
