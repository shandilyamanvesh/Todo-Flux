var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;

var TodoTextInput = React.createClass({

    //used for validation.
    propTypes: {
        id: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        onSave: ReactPropTypes.func.isRequired,
        value: ReactPropTypes.string,
        className: ReactPropTypes.string
    },

    //set initial state.
    getInitialState: function() {
        return {
            value: this.props.value || ''
        };
    },

    //user actions on UI.
    save: function() {
        this.props.onSave(this.state.value);
        this.setState({
            value: ''
        });
    },

    onChange: function(event) {
        this.setState({
            value: event.target.value
        });
    },

    onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.save();
        }
    },

    //returns text input.
    render: function() {
        return ( <input className={this.props.className}
            id = { this.props.id }
            placeholder = { this.props.placeholder }
            onBlur = { this.save }
            onChange = { this.onChange }
            onKeyDown = { this.onKeyDown }
            value = { this.state.value }
            autoFocus = { true }
            />
        );
    }
});

module.exports = TodoTextInput;
