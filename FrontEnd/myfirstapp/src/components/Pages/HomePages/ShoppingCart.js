import { Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { Sliders, Image } from 'react-bootstrap-icons';
import './styles/shopping_cart.css';
import { getShoppingCart } from '../../../actions/collectionActions';
import { GET_ERRORS } from '../../../actions/types';
import { render } from 'react-dom';

function ShoppingCart(props) {

    const [sort_by, setSort] = useState('Date_nto');

    const sortByOnchange = (event) => {
        setSort(event.target.value);
    }

    useEffect(()=>{
        getShoppingCart(props.user.username)(res => {
            var page;
            if(res.type !== GET_ERRORS) {
                if(res.payload.length > 0) {
                    page = res.payload.map(e => {
                        return (
                            <div className='SingleProduct'>
                                <Image className='ProductImg'/>
                                <span className='ProductDetail'>Item name: {e.name}</span>
                                <span className='ProductDetail'>Price: $ {e.price}</span>
                                <span className='ProductDetail'>Adding date: {e.adding_date}</span>
                                <Button className='FunctionBtn'>Purchase</Button>
                                <Button className='FunctionBtn BtnNotFrist'>Remove</Button>
                                <Button className='FunctionBtn BtnNotFrist InfoBtn'>Further Information</Button>
                            </div>
                        );
                    });
                } else {
                    page = <h1 className='NoData'>Nothing in your shopping cart right now!</h1>
                }
            } else {
                page = <h1 className='NoData'>Something not good occurs!</h1>;
            }
            render(page, document.getElementById("ShoppingCartBody"));
        });
    // eslint-disable-next-line
    },[]);

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
            <div className='Body' id='ShoppingCartBody'>
            </div>
        </div>
    );
}

export default ShoppingCart;