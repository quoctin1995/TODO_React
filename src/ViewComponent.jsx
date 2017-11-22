import React from 'react';

function ViewComponent(props) {
    let completed = "";
    let checked = "";
    if (props.object.isEnabled) {
        completed = "completed";
        checked = "checked"
    }
    let idDivCover = "divCover"+props.object.id;

    return (
        <li key={props.object.id} data-id="" className={completed} >
            <div className="view" id="divCover{props.object.id}">
                <input className="toggle" type="checkbox" onClick={e => props.updateCompleted(props.object.id) } checked={checked}/>
                <div id={idDivCover}>
                    <label onDoubleClick={e => props.changeInputTag(props.object)}>{props.object.value}</label>
                </div>
                <button onClick={e => props.remove(props.object.id)} className="destroy"></button>
            </div>
        </li>
    )

}


export default ViewComponent