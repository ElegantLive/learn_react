import React from 'react';
import {Grid, List} from 'antd-mobile';
import PropType from "prop-types";

class AvatarSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        selectAvatar: PropType.func.isRequired
    };

    render() {
        const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`../img/${v}.png`),
                text: v
            }));
        const gridHeader = this.state.icon ? (<div>
                <span>已选择头像</span>
                <img src={this.state.icon} alt={this.state.text}/>
            </div>)
            : '请选择头像';
        return (
            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid
                        data={avatarList}
                        activeStyle={false}
                        columnNum={5}
                        onClick={elm => {
                            this.setState(elm);
                            this.props.selectAvatar(elm.text)
                        }}
                    />
                </List>
            </div>
        )
    }
}

export default AvatarSelector;