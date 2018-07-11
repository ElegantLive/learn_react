import React from 'react';
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg} from "../../redux/chat";
import {getChatId} from "../../util";

@connect(
    state => state,
    {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null,
            msg: [],
            showEmoji: false
        };
    }

    fixCarousel(){
        setTimeout(function () {
           window.dispatchEvent(new Event('resize'))
        },0)
    }
    handleSubmit() {
        const from = this.props.user._id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({from, to, msg});
        this.setState({text: null})
    }

    componentDidMount() {
        if (!this.props.chat.chatMsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
        this.fixCarousel()
    }


    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀'
            .split(' ')
            .filter(v => v)
            .map(v => ({text: v}));

        const user_id = this.props.match.params.user;
        const Item = List.Item;
        const user = this.props.chat.user;

        if (!user[user_id]) return null;

        const chat_id = getChatId(user_id, this.props.user._id);
        const chatMsgs = this.props.chat.chatMsg.filter(v => (v.chat_id === chat_id));
        return (
            <div id='chat-page'>
                <NavBar
                    mode='dark'
                    icon={<Icon type='left'/>}
                    onLeftClick={() => {
                        this.props.history.goBack()
                    }}
                >
                    {user[user_id].name}
                </NavBar>
                {chatMsgs.map(v => {
                    const avatar = require(`../img/${user[v.from].avatar}.png`);
                    return (v.from === user_id) ?
                        (<List key={v._id}>
                            <Item
                                thumb={avatar}
                            >{v.content}</Item>
                        </List>) :
                        (<List key={v._id}>
                            <Item
                                className='chat-me'
                                extra={<img src={avatar} alt={user[user_id].name}/>}
                            >{v.content}</Item>
                        </List>);
                })}
                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({text: v})
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{marginRight: 15}}
                                        onClick={()=>{
                                            this.setState({
                                                showEmoji:!this.state.showEmoji
                                            });
                                            this.fixCarousel()
                                        }}
                                    >😀</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        />
                    </List>
                    {this.state.showEmoji ? <Grid
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={el=>{
                            this.setState({
                                text:this.state.text+el.text
                            })
                        }}
                    /> : null}
                </div>
            </div>
        )
    }
}

export default Chat;