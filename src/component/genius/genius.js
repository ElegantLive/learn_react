import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from "../../redux/chatuser";
import UserCard from '../usercard/usercard';


@connect(
    state => state.chatUser,
    {getUserList}
)
class Genius extends React.Component {
    componentDidMount() {
        const userlist = this.props.userlist;

        if (userlist.length <= 0 || userlist[0]['type'] !== 'genius') this.props.getUserList('genius');
    }

    render() {
        return <UserCard userlist={this.props.userlist}/>
    }
}

export default Genius