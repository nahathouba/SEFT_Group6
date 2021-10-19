import React from "react";
import '../../styles/conversation.css';

function ConversationPage() {
    // const user = props.current_user;
    // const target = props.target_user;

    return (
        <div className='conversation-main-page'>
            <div className='message-page'>
                <h1 className='user-intro'></h1>
                <div className='messages'></div>
            </div>
            <form className='input-page'>
                <div className='toolbar'>

                </div>
                <textarea placeholder='Type something here...'></textarea>
            </form>
        </div>
    )
}

export default ConversationPage;