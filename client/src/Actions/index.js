import axios from 'axios';

export function getBooks(limit = 10, start = 0, order = 'asc', list = ''){
    const request = axios.get(`/api/getBooks?limit=${limit}&skip=${start}&order=${order}`)
                    .then ( response => {
                        if(list) {
                            return [...list, ...response.data]
                        } else {
                            return response.data
                        }
                    })
    
    return {
        type: 'GET_BOOKS',
        payload: request
    }
}