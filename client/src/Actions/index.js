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

export function getBookWithReviewer( id ){
    const request = axios.get(`/api/getBook?id=${id}`)

    return (dispatch) => {
        request.then(({data}) => {
            let book = data

            axios.get(`/api/getReviewer?id=${book.ownerID}`)
            .then(({data}) => {

                let response = {
                    book,
                    reviewer: data
                }

                dispatch({
                    type: 'GET_BOOK_WITH_REVIEWER',
                    payload: response
                })
            })            
        })
    }
}

export function clearBookWithReviewer (){
    return {
        type:'CLEAR_BOOK_WITH_REVIEWER',
        payload: {
            book: {},
            reviewer: {}
        }
    }
}

export function addReview(book){
    const request = axios.post('/api/addBook', book)
                    .then( response => response.data )

    console.log(request)
    return {
        type:'ADD_REVIEW',
        payload: request
    }
}

export function clearNewReview(){
    return {
        type: 'CLEAR_NEW_REVIEW',
        payload: {}
    }
}

export function getUserPosts(userID){
    const request = axios.get(`/api/userReviews?user=${userID}`)
                    .then(response => response.data)
    
    return{
        type: 'GET_USER_REVIEWS',
        payload: request
    }
}

export function getBook(bookID){
    const request = axios.get(`/api/getBook?id=${bookID}`)
                    .then(response => response.data)

    return {
        type:'GET_BOOK',
        payload: request
    }
}

export function updateBook(data){
    const request = axios.post(`/api/updateBook`, data)
                    .then(response => response.data)

    return{
        type: 'UPDATE_BOOK',
        payload: request
    }
}

export function deleteBook(bookID) {
    const request = axios.delete(`/api/deleteBook?id=${bookID}`)
                    .then(response => response.data)

    return{
        type: 'DELETE_BOOK',
        payload: request
    }
}

export function clearBook(){
    return{
        type: 'CLEAR_BOOK',
        payload: {
            book:null,
            bookDeleted: false
        }
    }
}

/*+ USER **/

export function loginUser({email, password}) {
    const request = axios.post('/api/login',{email, password})
                    .then( response => response.data )
    return{
        type:'USER_LOGIN',
        payload: request
    }
}

export function auth(){
    const request = axios.get('/api/auth')
                    .then( response => response.data );
    
    return {
        type:'USER_AUTH',
        payload: request
    }
}