import React, { useState, useEffect } from 'react';
import { getWareouseGoods } from './source';
import { OneProductCard } from './oneProductCard';
import { Pagination } from './pagination';
import { Loading } from './Icons/Loading';
import { ErrorPage } from './Icons/ErrorPage';

export function Home() {
    const [goods, setGoods] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        try {
            getWareouseGoods().then(res => {
                setGoods(res);
                setIsLoading(false);
            })
        } catch (error) {
            setError(true);
            console.log('error');
        }
        return () => {
            console.log('unmount')
        }
    }, [])

    function paginate(pageNumber) {
        setCurrentPage(pageNumber);
    }

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let allProducts = goods.slice(indexOfFirstPost, indexOfLastPost);
    const totalPosts = goods.length;

    return (
        <>
            {error ? <ErrorPage /> :
                <>
                    {isLoading ?
                        <Loading /> :
                        <div className='home-wrapper'>
                            <div className='grid-wrapper'>
                                {allProducts.map(item => {
                                    return (
                                        <OneProductCard item={item} key={item.id} />
                                    )
                                })}
                            </div>
                            <Pagination
                                paginate={paginate}
                                postsPerPage={postsPerPage}
                                currentPage={currentPage}
                                totalPosts={totalPosts} />
                        </div>}
                </>
            }
        </>
    )
}