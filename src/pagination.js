import React from "react";

export function Pagination({ postsPerPage, totalPosts, paginate, currentPage }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-wrapper">
            {pageNumbers.map(number => {
                return (
                    <div key={number}>
                        <button onClick={() => paginate(number)} className='pagination-button'>
                            {number}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

// className={currentPage === number ? 'selected' : 'not-selected'}