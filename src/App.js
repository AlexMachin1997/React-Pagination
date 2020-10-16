import React from 'react';

import Pagination from './Components/Pagination';
import Posts from './Components/Posts'

import './index.css';

import useAxios from './hooks/useAxios';
import usePagination from './hooks/usePagination';

/* 

Basic front-end pagination:

- Includes two custom hooks, one for getting data, another for performing pagination events and calculations

- Includes basic error handling for network and pagination events

- Uses bootstrap to build some UI components quickly (I know I know, it's lazy I don't care :D )


Notes:

This example was inspired by Traversy Media's pagination example, I took it a few steps further to try out custom hooks. 
His original video can be found here https://www.youtube.com/watch?v=IYCa1F-OWmk 

*/

const App = () => {

  // Number of posts you want available per page
  const postsPerPage = 10;

  // Was originally done in the useEffect
  const [status, data, error] = useAxios('https://jsonplaceholder.typicode.com/posts');

  // Once the data was fetched it would then perform the pagination calculations
  const [currentPage, items, paginate] = usePagination(data, postsPerPage);

  return (
    <div className="container mt-5">

    <h1 className="text-primary mb-3">My Blog Posts</h1>

    <Posts posts={items} status={status} error={error}/>

    {status === 'resolved' && (
      <div className="table__options__container">
        <div>
          <div style={{marginTop: '1rem'}}>
            <Pagination currentPage={currentPage} postsPerPage={postsPerPage} totalPosts={data && data.length} paginate={paginate} />
          </div>
        </div>
        <div>
         <p>{currentPage} - {postsPerPage} of {data.length} items</p>
        </div>
      </div>
    )}
    </div>
  )
}

export default App;
