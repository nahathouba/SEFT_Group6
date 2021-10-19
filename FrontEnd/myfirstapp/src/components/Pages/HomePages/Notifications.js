import React, { useEffect, useState } from 'react';
import { Bell } from 'react-bootstrap-icons';
import { getNotifications } from '../../../actions/notificationActions';
import { GET_ERRORS } from '../../../actions/types';
import './styles/notifications.css';

function Notifications(props){

    const [notifications, setNotifications] = 
        useState(<h1 className='Nothing'>Loading...</h1>);

    const generateNotifications = () => {
        getNotifications(props.user.username)(res=>{
            if(res.type !== GET_ERRORS) {
                var page;
                if(res.payload.length > 0) {
                    page = res.payload.map((e) => {
                        return (
                            <div className={'SingleNotification' + (e.unread ? ' Unread' : '')}>
                                <Bell className='AlertIcon'/>
                                <h1 className='Title'>{ e.title }</h1>
                                <h3 className='Sender'>From { e.sender }</h3>
                                <h3 className='Time'>{ e.time }</h3>
                            </div>
                        );
                    });
                } else
                    page = <h1 className='Nothing'>There's no notifications right now!</h1>;

                setNotifications(page);
            }
        })
        
    }

    useEffect(()=>{
        generateNotifications();
    // eslint-disable-next-line
    }, [props.current_page]);

    return (
        <div className='NotificationMainDIV'>
            { notifications }
        </div>
    );
}

export default Notifications;