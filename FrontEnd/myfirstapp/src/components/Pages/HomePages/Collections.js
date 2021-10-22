import React, { useEffect, useRef, useState } from 'react';
import { getCollections, removeCollection } from '../../../actions/collectionActions';
import { GET_ERRORS } from '../../../actions/types';
import { Sliders, Image } from 'react-bootstrap-icons';
import { render } from 'react-dom';
import { Button } from 'react-bootstrap';

function Collections(props){

    const [category, setCategory] = useState('All');
    const [collection, setCollection] = useState([]);
    const [selectedCollection, setSelected] = useState([])
    const body_ref = useRef(null);

    const categoryOnchange = (event) => {
        setCategory(event.target.value);
    }

    function sortSelected() {
        var selected = [];
        if(category === 'All')
            selected = collection;
        else
            selected = collection.filter(e=>e.category === category);
        setSelected(selected);
    }

    function createCollection() {
        var page;
        if(selectedCollection.length > 0) {
            page = selectedCollection.map(e => {
                return (
                    <div className='SingleItem'>
                        <Image className='ItemImg'/>
                        <div className='ItemDetails'>
                            <span>
                                {e.category} name: {e.name}
                            </span>
                        </div>
                        <Button className='FunctionBtn InfoBtn'>Further Information</Button>
                        <Button className='FunctionBtn BtnNotFrist'
                            onClick={()=>removeCollection(e.id).then(
                                res=>{
                                    if(res){
                                    setCollection([]);
                                    loadCollections();
                                    alert("Removed successfully!");}
                                })}
                        >Remove</Button>
                    </div>
                );
            })
        } else {
            page = <h1 className='NoData'>This category in your collection has no item!</h1>;
        }
        render(page, body_ref.current);
    }

    function loadCollections() {
        getCollections(props.user.username)(res => {
            if(res.type !== GET_ERRORS)
                setCollection(res.payload)
        });
    }

    useEffect(loadCollections, []);
    useEffect(createCollection, [selectedCollection]);

    useEffect(sortSelected, [collection]);
    useEffect(sortSelected, [category]);

    return (
        <div className='CollectionMainDIV'>
            <div className='Head'>
                <Sliders className='SortIcon' />
                <select onChange={ categoryOnchange }>
                    <option value='All' selected>Category</option>
                    <option value='Book'>Books</option>
                    <option value='Bookstore'>Book Stores</option>
                </select>
            </div>
            <div className='Body' ref={body_ref}></div>
        </div>
    );
}

export default Collections;