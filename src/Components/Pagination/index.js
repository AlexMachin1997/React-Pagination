import React from 'react';

import './index.css';

const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {

    // Store the available 
    const pageNumbers = [];

    // Generate the page numbers
    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination flex-wrap">
            <button className="page-link" onClick={() => currentPage !== 0 ?  paginate(currentPage - 1) : null}>
               <span aria-hidden="true">&laquo;</span>
               <span class="sr-only">Previous</span>
            </button>
            
            {pageNumbers.map(data => (
                <li key={data} className={`pagination__item page-item ${data === currentPage ? 'active' : ''}`}>
                    <div className="page-link" onClick={() => paginate(data)}>
                        {data}
                    </div>
                </li>
            ))}

            <button className="page-link" onClick={() => currentPage !== postsPerPage  ? paginate(currentPage + 1) : null}>
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>                
            </button>
        </nav>
    )
};

export default Pagination;