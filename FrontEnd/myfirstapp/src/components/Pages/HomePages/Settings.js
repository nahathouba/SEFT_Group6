import React, { useEffect, useState } from 'react';
import Switch from '../../Plugins/Switch';
import '../../../styles/settings.css';

function Settings(props){

    const [settings, setSettings] = useState({});

    function changeProfilePublicSetting(event) {

    }

    function changeShippingVisibleSetting(event) {
        const value = event.target.value;
        if(settings.shipping_address_visible === value) {
            
        }
    }

    useEffect(()=>{

    }, [props.current_page]);

    useEffect(()=>{

    }, [settings]);

    return (
        <div className='settings'>
            <h1>Privacy settings</h1>
            <h3>Profile</h3>
            <Switch className='switch' checked={settings.profile_public}
                onChange={changeProfilePublicSetting} />
            <span className='after-switch'>Profile public visible</span>
            <h3>Shipping Address</h3>
            <div className='shipping-address'>
                <input type='radio' name='shipping_address_radio'
                    value={false}
                    onClick={changeShippingVisibleSetting} />Private<br/>
                <input type='radio' name='shipping_address_radio'
                    value={true}
                    onClick={changeShippingVisibleSetting} />Visible to shop owner
            </div>
        </div>
    );
}

export default Settings;