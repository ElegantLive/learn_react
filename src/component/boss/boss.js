import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from "../../redux/chatuser";
import UserCard from '../usercard/usercard';


@connect(
    state => state.chatUser,
    {getUserList}
)
class Boss extends React.Component {

    componentDidMount() {
        this.props.getUserList('genius')
    }

    render() {
        return <UserCard userlist={this.props.userlist}/>
    }
}

export default Boss