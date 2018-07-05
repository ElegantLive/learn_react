import React from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace} from 'antd-mobile';


@connect(
    state => state.user,
    {}
)
class User extends React.Component {
    componentDidMount() {

    }

    render() {
        const props = this.props;
        const Item = List.Item;
        const Brief = Item.Brief;

        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width: 50}} alt={props.user}/>}
                    title={props.user}
                    message={(props.type === 'boss') ? props.company : null}
                />
                <List renderHeader={() => '简介'}>
                    <Item
                        multipleLine
                    >
                        {props.title}
                        {props.desc.split('\n').map(v => (
                            <Brief key={v}>{v}</Brief>
                        ))}
                        {(props.money?(<Brief>{props.money}</Brief>):null)}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Item>退出登陆</Item>
                </List>
            </div>
        ) : null;
    }
}

export default User