import React from 'react';

export default function Form(Comp) {
    return class WrapperComp extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this._handleChange = this._handleChange.bind(this)
        }

        _handleChange(key, value) {
            this.setState({
                [key]: value
            })
        }

        render() {
            return <Comp _handleChange={this._handleChange} state={this.state} {...this.props}/>
        }
    }
}