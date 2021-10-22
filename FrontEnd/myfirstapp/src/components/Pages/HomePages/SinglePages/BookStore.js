import React, { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { sendNotification } from "../../../../actions/notificationActions";
import { createShop, updateShop } from "../../../../actions/shopActions";
import { GET_ERRORS } from "../../../../actions/types";
import { ADMIN_EMAIL, APPLY_SHOP_OWNER } from "../../../../handlers/NotificationTypes";
import './bookstore.css';

function BookStore(props) {

    const [name, setName] = useState((props.shop.name ? props.shop.name : ''));
    const [image, setImage] = useState(props.shop.image ? props.shop.image : '');
    const err_ref = useRef(null);

    function onChangeHandler(event) {
        const name = event.target.name;
        switch(name) {
            case 'name': setName(event.target.value); break;
            case 'image': setImage(event.target.value); break;
            default: return;
        }
    }

    function submitUpdate() {
        if(props.new_shop) {
            if(!name.length)
                err_ref.current.textContent = 'Shop name cannot be empty!';
            else {
                sendNotification({
                    type: APPLY_SHOP_OWNER,
                    body: JSON.stringify({
                        name: name,
                        owner: props.shop.owner,
                        image: image
                    }),
                    sender: props.shop.owner,
                    receiver: ADMIN_EMAIL
                }).then(res=>{
                    if(res.type !== GET_ERRORS) {
                        alert("Apply success!");
                        props.back();
                    }
                });
            }
            
        } else if(props.confirm) {
            createShop({
                name: name,
                owner: props.shop.owner,
                image: image
            }).then(res=>{
                if(res.type !== GET_ERRORS) {
                    props.refresh();
                }
            })
        } else {
            if(!name.length)
                err_ref.current.textContent = 'Shop name cannot be empty!';
            else {
                updateShop({
                    name: name,
                    owner: props.shop.owner,
                    image: image
                }).then(res=>{
                    if(res.type !== GET_ERRORS) {
                        props.refresh();
                    }
                })
            }
        }
        
    }

    return (
        <div className='bookstore-main'>
            {(image && image.length ?
            <img src={image} className='shop-img' alt='Not Available Now!' />:
            <></> )}
            {(props.new_shop ? 
            <Button className='update-btn' onClick={submitUpdate}>Apply</Button> :
            props.confirm ?
            <Button className='update-btn' onClick={submitUpdate}>Confirm</Button>:
            <Button className='update-btn' onClick={submitUpdate}>Update</Button>)}
            {(props.back ? 
            props.confirm ?
            <Button className='update-btn back' onClick={props.refresh}>Deny</Button> :
            <Button className='update-btn back' onClick={props.back}>Cancel</Button> : <></>)}
            <span className='err' ref={err_ref}></span>
            <span className='key'>Shop Name:</span>
            <input type='text' value={name} name='name' onChange={onChangeHandler} disabled={props.confirm} />
            <span className='key'>Shop Owner:</span>
            <input type='text' value={props.shop.owner} disabled />
            <span className='key'>Shop Image:</span>
            <input type='text' name='image' onChange={onChangeHandler} value={image} disabled={props.confirm} />
        </div>
    )
}

export default BookStore;