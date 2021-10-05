import React from 'react';
import { Bell } from 'react-bootstrap-icons';
import './styles/notifications.css';

function Notifications(props){

    const generateNotifications = () => {
        if(props.notifications.length > 0) {
            return props.notifications.map((e) => {
                return (
                    <div className={'SingleNotification' + (e.unread ? ' Unread' : '')}>
                        <Bell className='AlertIcon'/>
                        <h1 className='Title'>{ e.title }</h1>
                        <h3 className='Sender'>From { e.sender }</h3>
                        <h3 className='Time'>{ e.time }</h3>
                    </div>
                );
            });
        } else {
            return <h1 className='Nothing'>There's no notifications right now!</h1>;
        }
    }

    return (
        <div className='NotificationMainDIV'>
            { generateNotifications() }
        </div>
    );
}

export default Notifications;