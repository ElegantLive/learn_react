import React from 'react';
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile';
import AvatarSelector from '../component/avatarselector/avatar-selector';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import {update} from '../redux/user.redux';

@connect(
    state => state.user,
    {update}
)

class BossInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            company: '',
            money: '',
            desc: '',
            avatar: ''
        };
        this.selectAvatar = this.selectAvatar.bind(this);
    }

    onChange(k, v) {
        this.setState({
            [k]: v
        })
    }

    selectAvatar(e) {
        this.setState({
            avatar: e
        })
    }

    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}/> : null}
                <NavBar
                    mode="dark"
                    // icon={<Icon type="left"/>}
                    // onLeftClick={() => console.log('onLeftClick')}
                >Boss完善信息页面</NavBar>
                <AvatarSelector
                    selectAvatar={this.selectAvatar}
                />
                <InputItem
                    onChange={(v) => this.onChange('title', v)}
                >招聘职位</InputItem>
                <InputItem
                    onChange={(v) => this.onChange('company', v)}
                >公司名称</InputItem>
                <InputItem
                    onChange={(v) => this.onChange('money', v)}
                >薪资范围</InputItem>
                <TextareaItem
                    title='职位要求'
                    onChange={(v) => this.onChange('desc', v)}
                    placeholder='可换行'
                    autoHeight={true}
                />
                <Button
                    onClick={() => {
                        this.props.update(this.state)
                    }}
                    type='primary'
                >保存信息</Button>
            </div>
        )
    }
}

export default BossInfo;