import React from 'react';

import Pagination from './Components/Pagination';
import Posts from './Components/Posts'

import useAxios from './hooks/useAxios';
import usePagination from './hooks/usePagination';

const App = () => {

  const [status, data, error] = useAxios('https://jsonplaceholder.typicode.com/posts');

  const [currentPage, items, paginate] = usePagination(data, 10);

  return (
    <div className="container mt-5">

    <h1 className="text-primary mb-3">My Blog Posts</h1>

    <Posts posts={items} status={status} error={error}/>
    
    {status === 'resolved' && (
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem'}}>
        <Pagination currentPage={currentPage} postsPerPage={10} totalPosts={data && data.length} paginate={paginate} />
      </div>
    )}
  </div>
  )
}

export default App;
