import React, { Component } from 'react';

class HideableText extends Component {
    //ensures class is set up properly
    constructor(props){
        super(props);
        this.state = {
            isHidden: false,
        }
    }

    toggleIsHidden() {
        this.setState((currentState) => ({
            isHidden: !currentState.isHidden,
        }));
    }

    state = {  }

    render() { 
        return (
            <div>
                <button onClick = {() => this.toggleIsHidden()}>Toggle</button>
                {!this.state.isHidden && this.props.text}
            </div>
          );
    }
}
 
export default HideableText;