import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { degrade, submitDelete, submitUpdate } from "../../../../actions/personActions";
import { ADMIN, PUBLIC_USER, SHOP_OWNER } from "../../../../handlers/userTypes";
import './user.css';

function User(props) {

    const [fullname, setFullName] = useState(props.user.fullname);
    const [about, setAbout] = useState(props.user.about);
    const [editing, setEditing] = useState(false);

    async function operateUser(action, details) {
        if(action === 'update') {
            const user = await submitUpdate({...details});
            props.setUser(user);
        } else if(action === 'delete') {
            await submitDelete(props.user.username);
            props.setUser(null);
        }
    }

    function onChangeHandler(event) {
        const key = event.target.name;
        const value = event.target.value;
        if(key === 'fullname')
            setFullName(value);
        else if(key === 'about')
            setAbout(value);
    }

    return (
        <div className='admin-edit-user-div'>
            <div className='info-div'>
                <span className='key'>User Email:</span>
                <span className='value'>{ props.user.username }</span>
                <span className='key'>Full Name:</span>
                {(editing ?
                <input value={fullname} name='fullname' onChange={onChangeHandler} className='value-input'/>:
                <span className='value'>{ props.user.fullname }</span>)}
                <span className='key'>About:</span>
                {(editing ?
                <input value={about} name='about' onChange={onChangeHandler} className='value-input'/>:
                <span className='value'>{ props.user.about }</span>)}
            </div>
            <div className='functional-btns'>
                <Button className='btn' variant='warning' onClick={()=>operateUser('update', {...props.user, status: "BLOCKED"})}>Block this user</Button>
                <Button className='btn' variant='success' onClick={()=>operateUser('update', {...props.user, status: "NORMAL"})}>Unblock this user</Button>
                <Button className='btn' variant='danger' onClick={()=>operateUser('delete', null)}>Delete this user</Button>
                {(editing ?
                <Button className='btn' onClick={()=>{
                    operateUser('update', {...props.user, fullname: fullname, about: about});
                    setEditing(false);
                }}>Update</Button>:
                <Button className='btn' onClick={()=>setEditing(true)}>Edit this user</Button>)}
            </div>
            <div className='user-type-btns'>
                {(props.user.role === PUBLIC_USER ?
                <Button className='btn' variant='dark' onClick={()=>operateUser('update', {...props.user, role: SHOP_OWNER})}>Upgrade to Shop Owner</Button>:
                <Button className='btn' variant='dark' onClick={()=>degrade(props.user.username)}>Degrade to Public User</Button>)}
                <Button className='btn' variant='dark' onClick={()=>operateUser('update', {...props.user, role: ADMIN})}>Upgrade to Admin</Button>
            </div>
        </div>
    )
}

export default User;