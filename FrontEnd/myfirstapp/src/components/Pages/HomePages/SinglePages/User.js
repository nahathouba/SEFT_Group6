import React from "react";
import { Button } from 'react-bootstrap';
import { PUBLIC_USER } from "../../../../handlers/userTypes";
import './user.css';

function User(props) {
    return (
        <div className='admin-edit-user-div'>
            <div className='info-div'>
                <span className='key'>User Name:</span>
                <span className='value'>{ props.user.username }</span>
                <span className='key'>Full Name:</span>
                <span className='value'>{ props.user.full_name }</span>
                <span className='key'>About:</span>
                <span className='value'>{ props.user.about }</span>
            </div>
            <div className='functional-btns'>
                <Button className='btn' variant='warning' >Block this user</Button>
                <Button className='btn' variant='success'>Unblock this user</Button>
                <Button className='btn' variant='danger' >Delete this user</Button>
                <Button className='btn'>Edit this user</Button>
            </div>
            <div className='user-type-btns'>
                {(props.user.role === PUBLIC_USER ?
                <Button className='btn' variant='dark'>Upgrade to Shop Owner</Button>:
                <Button className='btn' variant='dark'>Change back to Public User</Button>)}
                <Button className='btn' variant='dark'>Upgrade to Admin</Button>
            </div>
        </div>
    )
}

export default User;