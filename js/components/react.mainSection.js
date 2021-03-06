var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/toDoActions');
var TodoItem = require('./react.toDoItem');

var MainSection = React.createClass({

            //validation
            propTypes: {
                allTodos: ReactPropTypes.object.isRequired,
                areAllComplete: ReactPropTypes.bool.isRequired
            },

            //UI actions
            onToggleCompleteAll: function() {
                TodoActions.toggleCompleteAll();
            },

            //returns object to be rendered.
            render: function() {
                if (Object.keys(this.props.allTodos).length < 1) {
                    return null;
                }

                var allTodos = this.props.allTodos;
                var todos = [];

                for (var key in allTodos) {
                    todos.push( < TodoItem key = { key }
                        todo = { allTodos[key] }
                        />);
                    }

                    return ( <section id = "main">
                        <div id="toggle-all-div">
                        <input id = "toggle-all"
                        type = "checkbox"
                        onChange = { this.onToggleCompleteAll }
                        checked = { this.props.areAllComplete ? 'checked' : '' }
                        /> 
                        <label htmlFor = "toggle-all" > Mark all as complete </label> 
                        </div>
                        <ul id = "todo-list"> { todos } </ul> </section>
                    );

                }

            });

        module.exports = MainSection;
