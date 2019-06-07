import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getUserPosts } from '../../Actions'
import moment from 'moment-js'
import { Link } from 'react-router-dom'

class UserReviews extends Component {

    componentWillMount(){
        this.props.dispatch(getUserPosts(this.props.user.login.id))
    }

    showUserReviews = (user) => (
        user.userReviews ? 
            user.userReviews.map(item => (
                <tr key={item._id}>
                    <td><Link to={`/user/edit-review/${item._id}`}>{item.name}</Link></td>
                    <td>{item.author}</td>
                    <td>{moment(item.createdAt).format('DD/MM/YY')}</td>
                </tr>
            ))
        :null
    )

    render() {
        return (
            <div className="user_posts">
                <h4>Your Reviews!</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserReviews(this.props.user)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(UserReviews);