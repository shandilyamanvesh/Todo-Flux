var React = require('react');
var TodoStore = require('../store/toDoStore');
var Header = require('./react.header')
var MainSection = require('./react.mainSection');

function getTodoState() {
    return {
        allTodos: TodoStore.getAll()
    };
}

// a parent view-controller that watches data changes at the top of hierarchy.
var TodoApp = React.createClass({

    //set initial state.
    getInitialState: function() {
        return getTodoState();
    },

    //listen for store changes.
    componentDidMount: function() {
        TodoStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function() {
        TodoStore.removeChangeListener(this.onChange);
    },

    onChange: function() {
        this.setState(getTodoState());
    },

    //return content to be rendered
    render: function() {
        return ( <div>
            <Header />
            <MainSection allTodos={this.state.allTodos} /> 
            </div>
        )
    }

});

module.exports = TodoApp;
