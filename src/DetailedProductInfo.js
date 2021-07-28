import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductDetails } from './source';
import { ArrowBack } from './Icons/ArrowBack';
import { ShoppingCart } from './Icons/ShoppingCart';
import { PriceTagIconDetailed } from './Icons/PriceTagIcon';
import { Loading } from './Icons/Loading';

export function DetailedProductInfo(props) {
    const urlProduct = useParams();
    const [product, setProduct] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            getProductDetails(urlProduct.id).then(res => {
                res['quantity'] = 1;
                return res;
            }).then(res => {
                setProduct(res);
                setIsLoading(false);
            })
        } catch (error) {
            console.log('error')
        }
    }, [urlProduct])

    function addQuantity() {
        const newQuantity = product.quantity + 1;
        setProduct(prevState => ({
            ...prevState,
            quantity: newQuantity,
        }));
    }

    function decreaseQuantity() {
        const newQuantity = product.quantity - 1
        if (product.quantity > 1) {
            setProduct(prevState => ({
                ...prevState,
                quantity: newQuantity
            }));
        } else {
            alert(`Quantity can't be less then 1`)
        }
    }

    function addItemToCart(item) {
        props.addToCart(item);
        alert('Product succsessfully added to the cart');
    }

    return (
        isLoading ? <Loading /> :
            <div className="detailed-page">
                <div className='navigation-holder'>
                    <Link to='/'><ArrowBack /></Link>
                    <div className='cart-notification-holder'>
                        <p className={props.cartItems.length > 0 ? 'cart-notification' : ''}></p>
                        <Link to='/cart'><ShoppingCart /></Link>
                    </div>
                </div>
                <div className='product-details-holder'>
                    <div className='product-image-holder'>
                        <img src={product.image} alt='product img' className='item-image-detailed' />
                    </div>
                    <div className='product-description-holder'>
                        <div className='product-description-detailed'>
                            <h3>Product:</h3>
                            <span>{product.title}</span>
                        </div>
                        <div className='product-description-detailed'>
                            <h3>Description:</h3>
                            <span>{product.description}</span>
                        </div>
                        <div className='product-description-detailed'>
                            <h3>Price:</h3>
                            <div className='align-price-tag'>
                                <PriceTagIconDetailed />
                                <span className='product-price'>{product.price}$</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='product-order-holder'>
                    <div className='product-quantity-holder'>
                        <button onClick={() => decreaseQuantity(product.price)} className='quantity-button'>-</button>
                        <p className='quantity'>{product.quantity}</p>
                        <button onClick={() => addQuantity(product.price)} className='quantity-button'>+</button>
                    </div>
                    <div className='product-total-price-holder'>
                        <span style={{ 'fontWeight': '600', 'fontSize': '1.5rem' }}>Total Price:</span>
                        <span style={{ 'fontWeight': '600', 'fontSize': '1.5rem' }}>{(product.quantity * product.price).toFixed(2)}$</span>
                    </div>
                    <div className='add-to-cart-button-holder'>
                        <button onClick={() => addItemToCart(product)} className='add-to-cart-button'>Add to Cart</button>
                    </div>
                </div>
            </div>
    )
}