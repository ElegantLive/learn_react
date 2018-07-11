import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from 'antd-mobile';

@connect(
    state => state
)
class Msg extends React.Component {
    render() {
        if (!this.props.chat.chatMsg.length) return null;
        const msgGroup = {};

        this.props.chat.chatMsg.forEach(v => {
            msgGroup[v.chat_id] = msgGroup[v.chat_id] || [];
            msgGroup[v.chat_id].push(v);
        });

        const chatList = Object.values(msgGroup);
        const Item = List.Item;
        const Brief = Item.Brief;
        const user_id = this.props.user._id;
        return (
            <div>
                <List>
                    {chatList.map(v => {
                            const last = v.length - 1;
                            const targetId = (v[last].from === user_id) ? v[last].to : v[last].from;
                            const unreadNum = v.filter(n => (!n.read && n.to === user_id)).length;
                            const targetUser = this.props.chat.user[targetId];
                            return (
                                <Item
                                    extra={<Badge text={unreadNum}/>}
                                    thumb={require(`../img/${targetUser.avatar}.png`)}
                                    key={v[0]._id}
                                >
                                    {v[last].content}
                                    <Brief>{targetUser.name}</Brief>
                                </Item>
                            )
                        }
                    )}
                </List>
            </div>
        )
    }
}

export default Msg