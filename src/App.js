import React from 'react';

class App extends React.Component {
    render() {
        const store = this.props.store;
        const add = this.props.add;
        const unfollow = this.props.unfollow;
        const addAsync = this.props.addAsync;
        const num = store.getState();
        return (
            <div>
                <h1>关注人数{num}</h1>
                <button onClick={()=>store.dispatch(add())}>加入直播间</button>
                <button onClick={()=>store.dispatch(unfollow())}>离开直播间</button>
                <button onClick={()=>store.dispatch(addAsync())}>2s--加入直播间</button>
            </div>
        )
    }
}

export default App;