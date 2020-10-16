import {useCallback, useEffect, useReducer} from 'react';
import axios from 'axios';

/**
 * @typedef {Object} State
 * @property {string} status
 * @property {array} data
 * @property {string} error
 */

 /**
 * @typedef {Object} Action
 * @property {string} type
 * @property {any} data
 */


/**
 * @param {State} state 
 * @param {Action} action 
 */
const axiosReducer = (state, action) => {
    switch(action.type) {
        case 'LOADING': {
            return {
                ...state,
                status: 'loading'
            }
        }

        case 'RESOLVED': {
            return {
                ...state,
                status: 'resolved',
                data: action.data
            }
        }

        case 'REJECTED': {
            return {
                ...state,
                status: 'rejected',
                error: 'Something went wrong'
            }
        }
        default: {
            return state;
        }
    }
}


/**
 * @description Used to perform basic network requests
 * @returns { [string, object, string, Promise<function>] } Returns the hooks state and any necessary functions for interacting with the hook e.g. getting data
 * @param {string} url A url for the api you want to call
 */

const useAxios = (url) => {

    // The hooks internal state
    const [state, dispatch] = useReducer(axiosReducer, {
        status: 'idle',
        data: null,
        error: null
    });

    const {status, data, error} = state;

    // Get function, used to perform GET requests when the hook is called, but can also be called to refetch the data if needed
    const get = useCallback(async() => {
        try {

            // Set the loading state
            dispatch({type: 'LOADING'});
    
            // Perform the request
            const response = await axios.get(url);
    
            // Check the status
            if(response.status !== 200) throw Error('Something went wrong');

            // Set the success state
            dispatch({type: 'RESOLVED', data: response.data });
            
        } catch(err) {

            // When there are errors set the error state
            dispatch({type: 'REJECTED'});

        }
    }, [url])

    useEffect(() => {
        get();
    }, [url, get]);
    
  return [status, data, error, get];
};

export default useAxios;