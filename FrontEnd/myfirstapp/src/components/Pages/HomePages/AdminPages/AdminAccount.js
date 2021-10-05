import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/admin_account.css';
import { adminGetUser, submitBlock, submitDelete } from "../../../../actions/personActions";
import { GET_ERRORS, SUCCESS } from "../../../../actions/types";

function AdminAccount(props) {

    const [user, setUser] = useState({});
    const [show, setShow] = useState({display: 'none'});
    const [infoStaus, setStatus] = useState(0);

    const submitHandler = (event) => {
        event.preventDefault();

        const sort = event.target.sort.value;
        const value = event.target.search.value;

        adminGetUser({
            sort: sort,
            value: value
        }).then(res => {
            if(!res.status || res.status !== GET_ERRORS) {
                setUser(res);
                setShow({display: 'block'});
            }
        });
    }

    const submitEdit = () => {
        // TODO: submit edit
        setStatus(0);
    }

    const del = () => {
        props.showAlert({
            display: "block",
            title: "Delete User",
            content: "Are you sure you want to delete this user?",
            cancel: () => props.showAlert({
                display: "none",
                title: "",
                content: "",
                cancel: null, 
                confirm: null
            }), 
            confirm: () => {
                submitDelete(user.username).then(res => {
                    // this shouldn't happen, just for make sure
                    if(!res)
                        alert("Something went wrong!");

                    // reload the page - the most fast way
                    window.location.reload();
                });
            }
        })
    }

    const block = (action) => {
        if(action === 0) {
            submitBlock(user.username).then(res => {
                var title;
                var content;
                const confirm = () => props.showAlert({
                    display: "none",
                    title: "",
                    content: "",
                    cancel: null, 
                    confirm: null
                });
                var color;
                if(res === SUCCESS) {
                    title = 'User Blocked';
                    content = 'This user has been successfully blocked';
                    color = 'skyblue';
                } else {
                    title = 'Failed';
                    content = 'This user has already been blocked';
                }
                props.showAlert({
                    display: "block",
                    title: title,
                    content: content,
                    confirm: confirm,
                    color: color
                })
            })
        }
    }

    return (
        <>
        <form className='SearchBar AdminSearch' onSubmit={submitHandler}>
            <select className="form-select" name="sort">
                <option selected value="username">User Name</option>
                <option value="full_name">Full Name</option>
            </select>
            <button type="submit"><Search /></button>
            <input name="search" type="text" placeholder="Search for a user"/>
        </form>

        <div className='UserEditor' style={ show }>
            <div className='Info' id='UserInfo'>
                <h5>User Name: </h5>
                {/* user name should not edit - if can edit just uncommit next lines */}
                {/* { infoStaus === 0 ? */}
                    <p>{ user.username }</p>
                    {/* : <input className='EditBar' type='text' value={ user.username } /> */}
                <h5>User Role: </h5>
                { infoStaus === 0 ?
                    <p>{ user.role }</p> :
                    <select className='EditBar'>
                        <option value='PublicUser' selected={ user.role === 'PublicUser' }>Public User</option>
                        <option value='ShopOwner' selected={ user.role === 'ShopOwner' }>Shop Owner</option>
                    </select> }

                <h5>User About: </h5>
                { infoStaus === 0 ?
                    <p>{ user.about }</p> :
                    <textarea className='EditBar EditAbout'>
                        { user.about }
                    </textarea> }

                { infoStaus === 0 ? 
                    <></> : 
                    <Button className='SubmitEdit' onClick={ submitEdit }>
                        Submit Edit
                    </Button> }
            </div>
            <div className='Operations'>
                <Button variant='warning' onClick={() => block(0)}>Block this user</Button>
                <Button variant='success'>Unblock this user</Button>
                <Button onClick={ () => setStatus(1) }>Edit this user</Button>
                <Button variant='danger' onClick={ del }>Delete this user</Button>
            </div>
        </div>
        </>
    );
}

export default AdminAccount;