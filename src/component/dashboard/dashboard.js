import React from 'react';
import {connect} from 'react-redux';
import {NavBar} from 'antd-mobile';
import {Route} from 'react-router-dom';
import NavLinkBar from "../navlink/navlink";
import Boss from '../boss/boss';
import Genius from '../genius/genius';
import User from '../user/user';
import {getMsgList, recvMsg} from "../../redux/chat";
import Msg from '../msg/msg'
import QueueAnim from 'rc-queue-anim';

@connect(
    state => state,
    {getMsgList, recvMsg}
)

class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    render() {
        const {pathname} = this.props.location;
        const user = this.props.user;
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            },
        ];

        const navItem = navList.find(v => v.path === pathname);

        return (!navItem) ? null : (
            <div>
                <NavBar className='fixd-header' mode='dark'>
                    {navItem.title}
                </NavBar>
                <div style={{marginTop: 45}}>
                    <QueueAnim type='bottom'>
                        <Route key={navItem.path} path={navItem.path} component={navItem.component}/>
                    </QueueAnim>
                </div>
                <NavLinkBar className='am-tab-bar' data={navList}/>
            </div>
        );
    }
}

export default Dashboard;