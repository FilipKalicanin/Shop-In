import { Link } from 'react-router-dom';
import { PriceTagIcon } from './Icons/PriceTagIcon';

export function OneProductCard({ item }) {

    function numberFormat(value) {
        return Intl.NumberFormat('en-EN', {
            style: 'currency',
            currency: 'USD'
        }).format(value);
    }


    return (
        <div className='one-item-wrapper'>
            <div className="image-section">
                <img src={item.image} alt='item-img' className='item-image' />
            </div>
            <div className="details-section">
                <p className='item-title'>{item.title}</p>
                <div className='price-tag-wrapper'>
                    <PriceTagIcon />
                    <span>{numberFormat(item.price)}</span>
                </div>
                <Link to={`/products/${item.id}`} className='button-add-to-cart'>See more</Link>
            </div>
        </div>
    )
}