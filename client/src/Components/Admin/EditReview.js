import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getBook, updateBook, deleteBook, clearBook } from '../../Actions'

class EditReview extends Component {
    state = {
        formdata:{
            _id: this.props.match.params.id,
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '',
            price: ''
        }
    }

    handleInput = (event, name) => {
        const newFormData = {...this.state.formdata}
        newFormData[name] = event.target.value
        this.setState({formdata:newFormData})
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(updateBook(this.state.formdata))
    }

    componentWillMount(){
        this.props.dispatch(getBook(this.props.match.params.id))
    }

    componentWillReceiveProps(nextProps){
        let book = nextProps.books.book
        this.setState({
            formdata:{
                _id: book._id,
                name: book.name,
                author: book.author,
                review: book.review,
                pages: book.pages,
                rating: book.rating,
                price: book.price
            }
        })
    }

    render() {
        return (
            <div className="rl_container article">
                {this.props.books.updatedBook ? 
                    <div className="edit_confirm">
                        Book Updated, <Link to={`/books/${this.props.books.book._id}`}>See Book Updated</Link>
                    </div>    
                :null}
                <form onSubmit={this.submitForm}>
                    <h2>Edit review</h2>
                    <div className="form_element">
                        <input type="text" placeholder="Enter Name" value={this.state.formdata.name} onChange={(event) => this.handleInput(event, 'name')}/>
                    </div>

                    <div className="form_element">
                        <input type="text" placeholder="Enter Author" value={this.state.formdata.author} onChange={(event) => this.handleInput(event, 'author')}/>
                    </div>

                    <div className="form_element">
                        <textarea value={this.state.formdata.review} onChange={(event) => this.handleInput(event, 'review')}/>
                    </div>

                    <div className="form_element">
                        <input type="number" placeholder="Enter Pages" value={this.state.formdata.pages} onChange={(event) => this.handleInput(event, 'pages')}/>
                    </div>

                    <div className="form_element">
                        <select value={this.state.formdata.rating} onChange={(event) => this.handleInput(event, 'rating')}>
                            <option val="1">1</option>
                            <option val="2">2</option>
                            <option val="3">3</option>
                            <option val="4">4</option>
                            <option val="5">5</option>
                        </select>
                    </div>

                    <div className="form_element">
                        <input type="number" placeholder="Enter Price" value={this.state.formdata.price} onChange={(event) => this.handleInput(event, 'price')}/>
                    </div>

                    <button type="submit">Edit Review</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        books: state.books
    }
}

export default connect(mapStateToProps)(EditReview);