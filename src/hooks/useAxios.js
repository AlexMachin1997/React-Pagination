import {useEffect, useReducer} from 'react';
import axios from 'axios';

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

const useAxios = (url) => {
    const [state, dispatch] = useReducer(axiosReducer, {
        status: 'idle',
        data: null,
        error: null
    });

    const {status, data, error} = state;

    useEffect(() => {
        const get = async () => {
            try {
    
                dispatch({type: 'LOADING'});
        
                const response = await axios.get(url);
        
                if(response.status !== 200) throw Error('Something went wrong');

                dispatch({type: 'RESOLVED', data: response.data });
                
            } catch(err) {
                dispatch({type: 'REJECTED'});
            }
        }
    
        get();
    }, [url]);
    
  return [status, data, error];
};

export default useAxios;