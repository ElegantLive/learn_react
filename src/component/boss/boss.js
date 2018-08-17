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
        const userlist = this.props.userlist;

        if (userlist.length <= 0 || userlist[0]['type'] !== 'boss') this.props.getUserList('boss');
    }

    render() {
        return <UserCard userlist={this.props.userlist}/>
    }
}

export default Boss