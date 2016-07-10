var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/toDoActions');

var Footer = React.createClass({

    //validation
    propTypes: {
        allTodos: ReactPropTypes.object.isRequired
    },

    //UI Action
    onClearCompletedClick: function() {
        TodoActions.destroyCompleted();
    },

    // returns object to be rendered.
    render: function() {
        var allTodos = this.props.allTodos;
        var total = Object.keys(allTodos).length;

        if (total === 0) {
            return null;
        }

        var completed = 0;
        for (var key in allTodos) {
            if (allTodos[key].complete) {
                completed++;
            }
        }

        var itemsLeft = total - completed;
        var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
        itemsLeftPhrase += 'left';

        // Undefined and thus not rendered if no completed items are left.
        var clearCompletedButton;
        if (completed) {
            clearCompletedButton = <button
            id = "clear-completed"
            onClick = { this.onClearCompletedClick } >
                Clear completed({ completed }) </button>;
        }

        return ( <footer id = "footer">
            <span id = "todo-count">
            <strong> { itemsLeft } </strong>
            { itemsLeftPhrase } 
            </span>
            { clearCompletedButton } 
            </footer>
        );
    }

});


module.exports = Footer;
