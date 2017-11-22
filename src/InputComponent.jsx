import React from 'react'
class InputText extends React.Component {
	constructor(props){
		super(props);
		this.state = {inputValue: "", };
		this.handleChange =this.handleChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}
    
    handleChange(e){
    	this.setState({inputValue: e.target.value})

    }
    handleKeyDown(e){
    	
    	if (!e) e = window.event;
		var keyCode = e.keyCode || e.which;
		if (keyCode === 13 && this.state.inputValue !== "") {
			this.props.add(this.state.inputValue);
			this.setState({inputValue: ""})
		}
    }

    render(){
        return <input value={this.state.inputValue} onChange={this.handleChange} onKeyDown={this.handleKeyDown} id="inputText" type="text" className="new-todo" placeholder="What needs to be done?" autoFocus="autFocus"/>
    }

};
export default InputText