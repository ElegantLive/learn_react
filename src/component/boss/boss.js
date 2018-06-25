import React from 'react';
import axios from 'axios';
import {Card, WingBlank} from 'antd-mobile';

class Boss extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        axios.get('user/list', {params: {type: 'genius'}})
            .then(res => {
                if (res.data.code === 0) {
                    this.setState({data: res.data.data});
                }
            })
    }


    render() {
        return (
            <WingBlank>
                {this.state.data.map(v=>(
                    v.avatar?(<Card>
                        <Card.Header
                            title={v.user}
                            thumd={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        >
                        </Card.Header>
                    </Card>):null
                ))}
            </WingBlank>
        )
    }
}

export default Boss