import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { Sliders, Image } from 'react-bootstrap-icons';
import './styles/shopping_cart.css';

function ShoppingCart(props) {

    const [sort_by, setSort] = useState('Date_nto');
    const [shopping_cart, setCart] = useState([]);

    

    const sortByOnchange = (event) => {
        setSort(event.target.value);
    }

    const generateShoppingCart = () => {
        if(shopping_cart.length !== 0) {
            // switch(sort_by) {
            //     case "Date_nto": break;
            //     case "Date_otn": break;
            //     case "Price_lth": break;
            //     case "Price_htl": break;
            //     default: break;
            // }
            return (
            <div className='SingleProduct'>
                <Image className='ProductImg'/>
                <span className='ProductDetail'>Item name: </span>
                <span className='ProductDetail'>Price: $ </span>
                <span className='ProductDetail'>Adding date: </span>
                <Button className='FunctionBtn'>Purchase</Button>
                <Button className='FunctionBtn BtnNotFrist'>Remove</Button>
                <Button className='FunctionBtn BtnNotFrist InfoBtn'>Further Information</Button>
            </div>)
        } else {
            return <h1 className='NoData'>Nothing in your shopping cart right now!</h1>
        }
    }

    return (
        <div className='ShoppingCartMainDIV'>
            <div className='Head'>
                <Sliders className='SortIcon' />
                <select onChange={ sortByOnchange }>
                    <option value='Date_nto' selected>Sort By</option>
                    <option value='Date_nto'>Date (New to Old)</option>
                    <option value='Date_otn'>Date (Old to New)</option>
                    <option value='Price_lth'>Price (Low to High)</option>
                    <option value='Price_htl'>Price (High to Low)</option>
                </select>
            </div>
            <div className='Body'>
                { generateShoppingCart() }
            </div>
        </div>
    );
}

export default ShoppingCart;