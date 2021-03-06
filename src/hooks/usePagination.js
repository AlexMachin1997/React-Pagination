import {useState, useCallback, useEffect} from 'react';

/**
 * @description Used to generate and modify a set of paginated data
 * @param {array} data 
 * @param {number} numberOfPostsPerPage
 * @returns {array} Returns a section of the array
 */
const usePagination = (data, numberOfPostsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [items, setItems] = useState([]);

    // Function which can be used to increment the pageNumber (Used when the paginate button is clicked)
    const paginate = useCallback((pageNumber) => {
        setCurrentPage(pageNumber)
    }, []);

    useEffect(() => {            
    
        // Exit early if the data doesn't exist
        if(!data) return;

        // Get the last page e.g. 2 * 10 = 20
        const indexOfLastPost = currentPage * numberOfPostsPerPage;

        // Get the first post e.g. 20 - 10 = 10
        const indexOfFirstPost = indexOfLastPost - numberOfPostsPerPage;    

        // Gets a copy of the array elements -> Returns the elements which haves index between the two values provided
        setItems(data && data.slice(indexOfFirstPost, indexOfLastPost));

    }, [currentPage, data, numberOfPostsPerPage]);

    // Return the data and the paginate function 
    return [currentPage, items, paginate];
}

export default usePagination;