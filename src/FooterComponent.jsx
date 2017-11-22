import React from 'react'
class FooterComponent extends React.Component {
    checkOrUncheck() {
        let results = JSON.parse(localStorage.getItem("values"));
        let check = false;
        if ( results != null ) {
            for (let i = 0; i < results.length; i++) {
                if (results[i].isEnabled === true) {
                    check = true;
                }
            }
        }
        return check;
    }
    render() {
        let check = this.checkOrUncheck();
        var styles;
        if (check === true) {
            styles = {
                display: "inherit"
            };
        }
        else {
            styles = {
                display: "none"
            };
        }
        return <footer className="footer" ><span className="todo-count"><strong id="numberItem">{this.props.length}</strong> item left</span>
            <ul className="filters">
                <li><a onClick={e => this.props.viewAll()}>All</a></li>
                <li><a onClick={e => this.props.viewActive()}>Active</a></li>
                <li><a onClick={e => this.props.viewCompleted()}>Completed</a></li>
            </ul>
            <div id="isHideOrShow">
                <button className="clear-completed" id="cleanCompleted" onClick={e => this.props.clearCompleted()} style={styles}>Clear Completed</button>
            </div>
        </footer>
    }

};
export default FooterComponent