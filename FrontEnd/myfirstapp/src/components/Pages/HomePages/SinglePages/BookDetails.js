import React from "react";
import { XLg } from "react-bootstrap-icons";
import './bookdetails.css';

function BookDetail(props) {
    return (
        <div className='book-details-cover'
            style={{display: (props.display ? 'block' : 'none')}}>
            <XLg className='close-btn' onClick={props.close} title='Close' />
            <div className='book-details-main'>
                <div className='details'>
                    <span className='title'>{ props.book.title }</span>
                    <span className='author'>By { props.book.author }</span>
                    <span>ISBN: { props.book.ISBN }</span>
                    <span>$ { props.book.price }</span>
                    <span>Description:<br/>
                    { props.book.description }</span>
                </div>
                <img href={props.book.image} className='book-img' alt='Not avaliable now!' />
                <span className='comments'>Comments ( Not available now )</span>
            </div>
        </div>
    )
}

export default BookDetail;