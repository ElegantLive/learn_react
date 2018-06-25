import {Toast} from 'antd-mobile';

export default function asyncRequest(params,sCallBack = false,eCallBack = false) {
    const ApiUrl = 'http://localhost:9093/';
    let url = ApiUrl + params.url;

    let headers_obj = {
        // 'token': 'b5eeef19e66185be2d478930e09f130e',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    let request;

    if (!params.type || params.type === 'GET') {
        params.type = 'GET';
        delete headers_obj['Content-Type'];
        delete headers_obj['Accept'];
        if (params.data) {
            let _str = '';
            for (let i in params.data) {
                if (_str === '') {
                    _str += '?' + i + '=' + params.data[i];
                } else {
                    _str += '&' + i + '=' + params.data[i];
                }
            }
            url += _str;
        }
        request = new Request(url, {
            method: params.type,
            headers: new Headers(headers_obj)
        })
    } else {
        request = new Request(url, {
            method: params.type,
            headers: new Headers(headers_obj),
            body: JSON.stringify(params.data)
        })
    }

    Toast.loading('加载中', 0);

    fetch(request)
        .then(_checkStatus)
        .then((response) => response.json())
        .then((responseData) => {
            console.log('res:', url, responseData);
            if(responseData.error_code === 10003) {
                console.log('请登陆！-跳转登陆页面');
            }
        })
        .catch((err) => {
            if(!eCallBack) {
                console.log('err:', err);
                throw err;
            }


        })
}

function _checkStatus(response) {
    setTimeout(()=>{
        Toast.hide()
    },5000);
    if (response.status === 200) {
        console.log(response);
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        console.log('err:', error);
        throw error;
    }
}