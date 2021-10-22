import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/admin_manage_account.css';
import User from "../SinglePages/User";
import { adminGetUser } from "../../../../actions/personActions";
import { GET_ERRORS } from "../../../../actions/types";

function AdminManageAccount() {

    const editor_ref = useRef(null);
    const [user, setUser] = useState(null);
    
    async function searchUser(event) {
        event.preventDefault();
        const username = event.target.username.value;
        if(!username.length)
            alert('Please input a username!')
        else {
            const user = await adminGetUser(username);
            if(!user.status) {
                setUser(user);
            } else if(user.status === GET_ERRORS)
                alert('Cannot get user!')
        }
    }

    function createUserBlock() {
        if(user) {
            render(
                <User user={user} setUser={setUser} />
            , editor_ref.current);
        }
    }

    useEffect(createUserBlock, [user]);

    return (
        <>
        <form className='SearchShop AdminSearch' onSubmit={searchUser}>
            <input type='text' name='username' placeholder='Search for a user here...' />
            <button>Search</button>
        </form>
        <div ref={editor_ref}></div>
        </>
    )
}

export default AdminManageAccount;