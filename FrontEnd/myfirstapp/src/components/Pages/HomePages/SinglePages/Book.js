import React, { useState } from "react";
import { Button } from 'react-bootstrap';
import { addBook, deleteBook, updateBook } from "../../../../actions/bookActions";
import './book.css';

function Book(props) {

    const [title, setTitle] = useState(props.book.title);
    const [ISBN, setISBN] = useState(props.book.ISBN);
    const [author, setAuthor] = useState(props.book.author);
    const [category, setCategory] = useState(props.book.category);
    const [price, setPrice] = useState(props.book.price);
    const [description, setDescription] = useState(props.book.description);
    const [image, setImage] = useState(props.book.image);

    function infoOnChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        switch(name) {
            case "title":
                setTitle(value); break;
            case "ISBN":
                setISBN(value); break;
            case "author":
                setAuthor(value); break;
            case "category":
                setCategory(value); break;
            case "price":
                setPrice(value); break;
            case "description":
                setDescription(value); break;
            case "image":
                setImage(value); break;
            default: return;
        }
    }

    function toJSON() {
        return {
            id: props.book.id,
            owner: props.user.username,
            title: title,
            ISBN: ISBN,
            author: author,
            category: category,
            price: price,
            description: description,
            image: image
        }
    }

    async function exec(action) {
        switch(action) {
            case 'add':
                await addBook(toJSON()); break;
            case 'update':
                await updateBook(toJSON()); break;
            case 'delete':
                await deleteBook(toJSON()); break;
            default: return;
        }
        props.refresh();
    }

    return (
        <div className='book'>
            <div className='btns'>
                <Button className='btn' onClick={props.back}>Go back</Button>
                {(props.add ?
                <Button className='btn' variant='success' onClick={()=>exec('add')}>Add this book</Button>:
                <Button className='btn' variant='success' onClick={()=>exec('update')}>Update Information</Button>)}
                {(props.add ? <></> :
                <Button className='btn' variant='danger' onClick={()=>exec('delete')}>Delete this book</Button>)}
            </div>
            <div className='main-info-div'>
                <span>Title</span>
                <input type='text' name='title' value={title} onChange={infoOnChange} />
                <span>ISBN</span>
                <input type='text' name='ISBN' value={ISBN} onChange={infoOnChange} />
                <span>Author</span>
                <input type='text' name='author' value={author} onChange={infoOnChange} />
                <span>Category</span>
                <input type='text' name='category' value={category} onChange={infoOnChange} />
                <span>Price</span>
                <input type='number' name='price' min='1' value={price} onChange={infoOnChange} />
                <span>Image</span>
                <input type='text' name='image' value={image} onChange={infoOnChange} />
                <span>Description</span>
                <textarea name='description' value={description} onChange={infoOnChange}></textarea>
            </div>
        </div>
    )
}

export default Book;