import React from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate, currentPage}) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination">
            {pageNumbers.map(data => (
                <li key={data} className={`page-item ${data === currentPage ? 'active' : null}`}>
                    <div className="page-link" onClick={() => paginate(data)}>
                        {data}
                    </div>
                </li>
            ))}
        </nav>
    )
};

export default Pagination;