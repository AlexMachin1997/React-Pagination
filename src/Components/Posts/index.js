import React from 'react';

import Loader from '../Loader';

const Posts = ({posts, status, error}) => {

    switch(status) {
        case 'loading':
        case 'idle':  {
            return <Loader/>
        }

        case 'resolved': {
            return (
                <ul className="list-group mb4">
                {posts.length !== 0 && posts.map((posts,index) => (
                  <li className="list-group-item" key={posts.title}>
                    {posts.title}
                  </li>
                ))}
              </ul>
            )
        }

        case 'rejected': {
            return (
                <div>
                    <h1>{error}</h1>
                </div>
            )
        }

        default: {
            return null;
        }
    }
}

export default Posts;