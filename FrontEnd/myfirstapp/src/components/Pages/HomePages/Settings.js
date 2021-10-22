import React from 'react';
import Switch from '../../Plugins/Switch';
import '../../../styles/settings.css';

// this page haven't done, just a static page

function Settings(){

    return (
        <div className='settings'>
            <h1>Privacy settings</h1>
            <h3>Profile</h3>
            <Switch className='switch' />
            <span className='after-switch'>Profile public visible</span>
            <h3>Shipping Address</h3>
            <div className='shipping-address'>
                <input type='radio' name='shipping_address_radio'
                    value={false} />Private<br/>
                <input type='radio' name='shipping_address_radio'
                    value={true} />Visible to shop owner
            </div>
        </div>
    );
}

export default Settings;