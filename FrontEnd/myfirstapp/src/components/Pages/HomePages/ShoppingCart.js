import { Button } from 'react-bootstrap';
import React, { useEffect, useRef, useState } from 'react';
import { Sliders, Image } from 'react-bootstrap-icons';
import './styles/collection.css';
import { getShoppingCart, removeCart } from '../../../actions/collectionActions';
import { render } from 'react-dom';
import { GET_ERRORS } from '../../../actions/types';

function ShoppingCart(props) {

    const [sort_by, setSort] = useState('default');
    const [cart, setCart] = useState([]);
    const body_ref = useRef(null);

    const sortByOnchange = (event) => {
        setSort(event.target.value);
    }

    const sortCart = () => {

        function compare(elem1, elem2) {
            switch(sort_by) {
                case 'Date_nto':
                    return (parseInt(elem1.addingdate) > parseInt(elem2.addingdate));
                case 'Date_otn':
                    return (parseInt(elem1.addingdate) < parseInt(elem2.addingdate));
                case 'Price_lth':
                    return (elem1.price < elem2.price);
                case 'Price_htl':
                    return (elem1.price > elem2.price);
                default:
                    return false;
            }
        }

        const n = cart.length;
        var tmp_cart = cart;
        for(var i = 0; i < n; i ++) {
            for(var j = 0; j < n - 1; j++) {
                if(compare(tmp_cart[i],
                    tmp_cart[j])) {
                    const tmp = tmp_cart[i];
                    tmp_cart[i] = tmp_cart[j];
                    tmp_cart[j] = tmp;
                }
            }
        }
        setCart(tmp_cart);
        createCartPage();
    }

    function createCartPage(){
        var page;
        if(cart.length > 0) {
            page = cart.map(e => {
                return (
                    <div className='SingleItem'>
                        <Image className='ItemImg'/>
                        <div className='ItemDetails'>
                            <span>Item name: {e.name}</span>
                            <span>Price: $ {e.price}</span>
                            <span>Adding date: {new Date(e.addingdate).toUTCString()}</span>
                        </div>
                        <Button className='FunctionBtn'>Purchase</Button>
                        <Button className='FunctionBtn BtnNotFrist'
                            onClick={()=>removeCart(e).then(
                                res=>{
                                    if(res){
                                    setCart([]);
                                    loadShoppingCart();
                                    alert("Removed successfully!");}
                                })}
                        >Remove</Button>
                        <Button className='FunctionBtn BtnNotFrist InfoBtn' onClick={()=>props.showBook(e)}>Further Information</Button>
                    </div>
                );
            });
        } else {
            page = <h1 className='NoData'>Nothing in your shopping cart right now!</h1>
        }
        render(page, body_ref.current);
    }

    function loadShoppingCart() {
        getShoppingCart(props.user.username)(res=>{
            if(res.type !== GET_ERRORS) {
                setCart(res.payload);
            }
        });
    }

    useEffect(loadShoppingCart,[props.current_page]);

    useEffect(sortCart, [sort_by]);
    useEffect(sortCart, [cart]);

    return (
        <div className='CollectionMainDIV'>
            <div className='Head'>
                <Sliders className='SortIcon' />
                <select onChange={ sortByOnchange }>
                    <option value='default' selected>Sort By</option>
                    <option value='Date_nto'>Date (New to Old)</option>
                    <option value='Date_otn'>Date (Old to New)</option>
                    <option value='Price_lth'>Price (Low to High)</option>
                    <option value='Price_htl'>Price (High to Low)</option>
                </select>
            </div>
            <div className='Body' ref={body_ref}>
            </div>
        </div>
    );
}

export default ShoppingCart;