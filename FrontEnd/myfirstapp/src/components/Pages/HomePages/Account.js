import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import './styles/account.css';
import { submitUpdate, submitPassword as changePassword, submitDelete } from '../../../actions/personActions';
import { logout } from '../../../handlers/userHandler';
import { validation } from '../../../handlers/validateInput';
import { PUBLIC_USER } from '../../../handlers/userTypes';

function Account(props) {

    const [page, setPage] = useState('Landing');

    const [full_name, setName] = useState(props.user.full_name);
    const [about, setAbout] = useState(props.user.about);
    const [gender, setGender] = useState(props.user.gender);
    const [address, setAddress] = useState(props.user.address);

    const [o_p, setOP] = useState("");
    const [n_p, setNP] = useState("");
    const [r_p, setRP] = useState("");

    const submitEdit = (event) => {
        event.preventDefault();

        const infos = {
            ...props.user,
            full_name: full_name,
            about: about,
            gender: gender,
            address: address
        }

        submitUpdate(infos).then((status) => {
            if(status)
                props.setUser(infos);
        })
    }

    const changeAlert = (action, target, alert = '') => {
        document.querySelectorAll(`[name='${target}']`).forEach(e => {
            const cl = e.classList;
            if(action === 0)
                cl.add('Alert');
            else if(action === 1 && cl.contains('Alert'))
                cl.remove('Alert');

            if(e.nodeName === 'SPAN')
                e.innerHTML = alert;

        })
    }

    const submitPassword = (event) => {
        event.preventDefault();
        
        var haserr = false;

        const judge = e => {
            if(e.classList.contains('Alert')) {
                haserr = true;
            } else {
                if(e.nodeName === 'INPUT') {
                    if(e.value === '') {
                        haserr = true;
                        document.querySelectorAll(`[name='${e.name}']`).forEach(e1 => {
                            if(!e1.classList.contains('Alert'))
                                e1.classList.add('Alert');
                            if(e1.nodeName === 'SPAN')
                                e1.innerHTML = 'This field cannot be empty!';
                        })
                    }
                }
            }
        }
        document.querySelectorAll("[name='old_password']").forEach(judge);
        document.querySelectorAll("[name='new_password']").forEach(judge);
        document.querySelectorAll("[name='re_new_password']").forEach(judge);

        if(!haserr) {
            const old_password = o_p;
            const new_password = n_p;
            
            setOP('');
            setNP('');
            setRP('');

            const req = {
                username: props.user.username,
                old_password: old_password,
                new_password: new_password
            }

            changePassword(req).then(res => {
                if(res !== 'PASS') {
                    if(res === 'FAIL')
                        changeAlert(1, 'old_password', 'Old password not match!');
                } else
                    setPage('Landing')
            });
        }
    }

    const setValueHandler = (event) => {
        const v = event.target.value;
        switch(event.target.name) {
            case 'full_name': setName(v); break;
            case 'about': setAbout(v); break;
            case 'address': setAddress(v); break;
            case 'gender': setGender(v); break;
            default: return;
        }
    }

    const passwordHandler = (event) => {

        const alerts = [
            'Old password cannot be the same with new password!',
            'Re-input new password is different from the new password!'
        ]

        const judgeStatus = (target, value) => {
            const validated = validation('Password', value);
            if(validated[0] === 1) {
                changeAlert(0, target, validated[1]);
            } else {
                switch(target) {
                    case 'old_password': 
                        if(value === n_p)
                            changeAlert(0, target, alerts[0]);
                        else
                            changeAlert(1, target);
                        break;
                    case 'new_password':
                        if(o_p === value)
                            changeAlert(0, target, alerts[0]);
                        else if(r_p !== "" && value !== r_p)
                            changeAlert(0, 're_new_password', alerts[1]);
                        else {
                            if(value === r_p)
                                changeAlert(1, 're_new_password');
                            changeAlert(1, target);
                        }
                        break;
                    case 're_new_password':
                        if(n_p !== value)
                            changeAlert(0, target, alerts[1]);
                        else
                            changeAlert(1, target); 
                        break;
                    default: return;
                }
            }
        }

        const v = event.target.value;
        judgeStatus(event.target.name, v);
        switch(event.target.name) {
            case 'old_password': setOP(v); break;
            case 'new_password': setNP(v); break;
            case 're_new_password': setRP(v); break;
            default: return;
        }
    }

    const deleteAccount = () => {

        const confirm = () => {
            submitDelete(props.user.username).then(()=>{ logout(props.history)} );
        }

        props.showAlert({
            display: 'block',
            title: "Confirm Delete",
            content: "Are you sure you want to delete your account? This can never undo!",
            cancel: () => props.showAlert({
                display: 'none',
                title: "",
                content: "",
                cancel: null, 
                confirm: null
            }), 
            confirm: confirm
        })
    }

    const loadPage = () => {
        switch(page) {

            case "Edit":
                return (
                    <>
                    <div className='SwitchEdit'>
                        <button className="Selected">Editing Profile</button>
                        <button onClick={ () => setPage( "Password") }>Reset Password</button>
                        <button onClick={ () => setPage( "Landing") }>Go Back</button>
                    </div>
                    <form className="EditProfile" onSubmit={ submitEdit }>
                        <h1 className="AccountPageWelcome">Editing Profile</h1>

                        <label to="full_name" >Name</label>
                        <input type="text" className="InfoInput"
                            name="full_name" placeholder="Please input your name here"
                            value={ full_name } onChange={ setValueHandler }/>

                        <label to="Email" >Email<span className='Annotation'>* Cannot change</span></label>
                        <input type="text" className="InfoInput"
                            name="Email" disabled placeholder="Please input your email here"
                            value={ props.user.username } />

                        <label to="about" >About Me</label>
                        <input type="text" className="InfoInput"
                            name="about" placeholder="Nothing here"
                            value={ about } onChange={ setValueHandler } />

                        <label to="gender" >Gender</label>
                        <select className="InfoInput" name="gender" onChange={ setValueHandler }>
                            <option value="Secret">Select Your Gender</option>
                            <option value="Male" selected={ (gender === 'Male') }>Male</option>
                            <option value="Female" selected={ (gender === 'Female') }>Female</option>
                            <option value="Secret" selected={ (gender === 'Secret') }>Secret</option>
                        </select>

                        <label to="address">Address</label>
                        <input type="text" className="InfoInput" name="address"
                            placeholder="Please input your address here"
                            value={ address } onChange={ setValueHandler } />

                        <br/><Button type='submit'>Submit</Button>
                    </form>
                    </>
                );
            
            case "Password":
                return (
                    <>
                    <div className='SwitchEdit'>
                        <button onClick={ () => setPage( "Edit") }>Editing Profile</button>
                        <button className="Selected">Reset Password</button>
                        <button onClick={ () => setPage( "Landing") }>Go Back</button>
                    </div>
                    <form className="EditProfile" onSubmit={ submitPassword }>
                        <h1 className="AccountPageWelcome">Reset Password</h1>

                        <label to="old_password" name="old_password">Old Password</label>
                        <input type="password" className="InfoInput"
                            name="old_password" placeholder="Please input your old password here"
                            value={o_p} onChange={ passwordHandler } />
                        <span name='old_password' className='AlertSpan'></span>

                        <label to="new_password" name="new_password">New Password</label>
                        <input type="password" className="InfoInput"
                            name="new_password" placeholder="Please input your new password here"
                            value={n_p} onChange={ passwordHandler } />
                            <span name='new_password' className='AlertSpan'></span>

                        <label to="re_new_password" name="re_new_password">Re-input New Password</label>
                        <input type="password" className="InfoInput"
                            name="re_new_password" placeholder="Please input your new password here again"
                            value={r_p} onChange={ passwordHandler } />
                            <span name='re_new_password' className='AlertSpan'></span>

                        <br/><Button type='submit'>Submit</Button>
                    </form>
                    </>
                );

            default:
                return (
                    <>
                    <h1 className="AccountPageWelcome">Welcome, { full_name }</h1>
                    <div className="AccountDetails">
                        <PersonCircle className="Avatar" />
                        <h3>My Details</h3>
                        My Name: { full_name }<br/>
                        My Email: { props.user.username }<br/>
                        {(props.user.role === PUBLIC_USER ? <></> : 
                        <>(Shop Owner)<br/></>)}
                        <hr/>
                        <button onClick={ () => setPage( 'Edit') }>Edit my profile</button>
                        <button className="Danger" onClick={ deleteAccount }>Delete my account</button>
                    </div>
                    {(props.user.role === PUBLIC_USER ? 
                    <div className='apply-shop-owner'>
                        <span>Has your own shop?<br/>Apply to be a shop owner!</span>
                        <Button className='btn'>Apply now!</Button>
                    </div> : <></>)}
                    </>
                );
        }
    }

    return loadPage();
}

export default Account;