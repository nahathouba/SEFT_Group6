import React from "react";
import '../../styles/switch.css';

function Switch(props) {
    return (
        <div className={'switch-btn-main' + (props.className ? ' '+props.className : '')}>
            <input type='checkbox' className='chkbox'
                checked={props.checked} onChange={props.onChange} />
            <div className='showing'></div>
            <div className='showing-circle'></div>
        </div>
    )
}

export default Switch;