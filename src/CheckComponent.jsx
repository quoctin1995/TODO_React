import React from 'react'
class CheckComponent extends React.Component {
    
    render(){
        return  <input name="itemValue" value={this.props.resetValue} className="toggle-all" type="checkbox" onClick={e =>this.props.checkAllCompleted()}/>
    }

};
export default CheckComponent