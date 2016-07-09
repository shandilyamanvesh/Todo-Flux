var React = require('react');
//lowercase component names are not supported in jsx.
var TodoApp = require('./js/components/react.toDoApp');

React.render( <TodoApp /> ,
    document.getElementById('todoapp')
);
