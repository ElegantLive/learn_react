function asyncRequest(params) {
    const ApiUrl = 'http://api.mi.com/v1/';
    let url = ApiUrl + params.url;

    let headers_obj = {
        'token': localStorage.getItem('token'),
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

    fetch(request)
        .then(_checkStatus)
        .then((response) => response.json())
        .then((responseData) => {
            console.log('res:', url, responseData);
            if(responseData.error_code === 10003) {
                console.log('请登陆！-跳转登陆页面');
            }
            // resolve(responseData);
        })
        .catch((err) => {
            console.log('error:', url, err);
            // reject(err);
        })
}

function _checkStatus(response) {
    // console.log(response);
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

export default asyncRequest;