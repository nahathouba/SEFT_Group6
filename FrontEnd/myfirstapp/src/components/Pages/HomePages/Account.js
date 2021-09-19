import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import './styles/account.css';
import { submitUpdate } from '../../../actions/personActions';

function Account(props) {

    const [page, setPage] = useState('Landing');

    const [full_name, setName] = useState(props.user.full_name);
    const [about, setAbout] = useState(props.user.about);
    const [gender, setGender] = useState(props.user.gender);
    const [address, setAddress] = useState(props.user.address);

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
                        <hr/>
                        <button onClick={ () => setPage( 'Edit') }>Edit my profile</button>
                        <button className="Danger">Delete my account</button>
                    </div>
                    </>
                );
        }
    }

    return loadPage();
}

export default Account;