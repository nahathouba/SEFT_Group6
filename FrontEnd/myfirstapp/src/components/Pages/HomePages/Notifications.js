import React, { useEffect, useState } from 'react';
import { Bell } from 'react-bootstrap-icons';
import { getNotifications, readNotification } from '../../../actions/notificationActions';
import { GET_ERRORS } from '../../../actions/types';
import { APPLY_SHOP_OWNER, SYSTEM_WELCOME } from '../../../handlers/NotificationTypes';
import BookStore from './SinglePages/BookStore';
import './styles/notifications.css';

function Notifications(props){

    const [notifications, setNotifications] = useState([]);
    const [notification_page, setPage] = useState(<h1 className='Nothing'>Loading...</h1>);

    function viewApplyDetails(msg) {
        readNotification(msg);
        const details = JSON.parse(msg.body);

        setPage(
            <BookStore shop={details} confirm={true} 
                back={true} refresh={getUserNotifications} />
        )
    }

    function read(id) {
        readNotification(id).then(res=> {
            setNotifications([]);
            getUserNotifications();
        })
    }

    const generateNotifications = () => {
        var page;
        if(notifications.length) {
            page = notifications.map((e) => {
                return (
                    <div className={'SingleNotification' + (e.status ? ' Unread' : '')}>
                        <Bell className='AlertIcon'/>
                        <span className='Title'>
                            { e.type === APPLY_SHOP_OWNER ? 
                                "Apply for shop owner" : e.type === SYSTEM_WELCOME ?
                                "Welcome!" : "Unknown message" }
                        </span>
                        <span className='Sender'>From { e.requesterUsername }</span>
                        {( e.type === APPLY_SHOP_OWNER ? 
                            e.status ?
                            <span className='body link' onClick={()=>viewApplyDetails(e)}>
                                View Apply Details
                            </span> : <span className='body'>Already processed</span> :
                            <span className='body'>{ e.body }
                                <br/>{(e.status ? 
                                <span className='link' onClick={read}>Got it!</span> : <></>)}
                            </span>)}
                    </div>
                );
            });
        } else
            page = <h1 className='Nothing'>There's no notifications right now!</h1>;

        setPage(page);
    }

    function getUserNotifications() {
        getNotifications(props.user.username)(res=>{
            if(res.type !== GET_ERRORS)
                setNotifications(res.payload);
        })
    }

    useEffect(getUserNotifications, [props.current_page]);
    useEffect(generateNotifications, [notifications]);
    

    return (
        <div className='NotificationMainDIV'>
            { notification_page }
        </div>
    );
}

export default Notifications;