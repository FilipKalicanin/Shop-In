import React, { useState, useEffect } from 'react';

export function ShoppingCart(props) {
    const [payAmount, setPayAmount] = useState(0);

    useEffect(() => {
        setPayAmount(props.cartItems.reduce((totalPayAmount, item) => totalPayAmount = totalPayAmount + (item.price * item.quantity), 0))
    }, [props.cartItems, props.cartItems.quantity])

    function numberFormat(value) {
        return Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }

    return (
        <>
            <div className='shopping-cart-holder'>
                {props.cartItems.length < 1 ? 'Cart is empty.' :
                    <div className='shopping-cart-items'>
                        {
                            props.cartItems.map(item => {
                                return (
                                    <div key={item.id} className='cart-item-holder'>
                                        <p>{item.title}</p>
                                        <div className='cart-item-details-holder'>
                                            <div className='cart-image-quantity-holder'>
                                                <img src={item.image} alt='item-img' className='cart-item-image'></img>
                                                <div className='cart-item-quantity-holder'>
                                                    <button onClick={() => props.increaseQuantity(item.id)} className='cart-item-quantity-button'>+</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => props.decreaseQuantity(item.id)} className='cart-item-quantity-button'>-</button>
                                                </div>
                                            </div>
                                            <div className='cart-item-pricing-holder'>
                                                <p>Price: {numberFormat(item.price)}</p>
                                                <p>Total price: {numberFormat(item.price * item.quantity)}</p>
                                                <button onClick={() => props.removeFromCart(item)}>Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <div className='check-out-holder'>
                    <span className='check-out-bill'>Bill: {numberFormat(payAmount)}</span>
                    <button className='check-out-button'>Check-out</button>
                </div>
            </div>
        </>
    )
}