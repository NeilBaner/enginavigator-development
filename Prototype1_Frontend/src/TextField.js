import React, { Component } from 'react';
import AutoCompleteText from './AutoCompleteText';
import location from './location';
import directions from './directions';
import './TextField.css';

class TextField extends Component {
    constructor(){
        super();
        this.state = {
            text: [],
            A: false,
            B: false,
            locationA: "",
            locationB: ""
    }
}
    
    

    updateText() {
        this.setState({
            text: directions
        });
    }

    // onHandleChange() {
    //     this.setState({
    //         text:
    //     });
    // }

    renderDirections() {
        //if(A && B)
        const { text } = this.state;
        return (
            <ul>
                {text.map((item) => <li>{item}</li>)}
            </ul>
        )
    }
    
    render() {
        return (
            <div className="TextField">
            <AutoCompleteText items={location} />
            <br /><br />
            <AutoCompleteText items={location} />
            <br/><br/>
            <button onClick={() => this.updateText()} className="btn btn-primary">Search</button>
            {this.renderDirections()}
            </div>
        );
    }
}

export default TextField;