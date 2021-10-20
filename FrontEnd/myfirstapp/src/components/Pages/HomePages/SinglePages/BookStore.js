import React from "react";
import './bookstore.css';

function BookStore(props) {
    return (
        <div className='bookstore-main'>
            <span className='key'>Shop Name:</span>
            <input type='text' value={props.shop.name} disabled />
            <span className='key'>Shop Owner:</span>
            <input type='text' value={props.shop.owner} disabled />
            <span className='key'>Shop Image:</span>
            <input type='text' value={props.shop.image} disabled />
            {(props.shop.image && props.shop.image.length ?
            <img src={props.shop.image} className='shop-img' alt='Not Available Now!' />:
            <></> )}
            {/* <Image className='shop-img' /> */}
        </div>
    )
}

export default BookStore;