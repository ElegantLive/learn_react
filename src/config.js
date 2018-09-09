import axios from 'axios';
import {Toast} from 'antd-mobile';

axios.defaults.baseURL = 'http://localhost:9091';
// axios.defaults.proxy = 'http://localhost:9093';
axios.defaults.timeout = 5000;

axios.interceptors.request.use(function (config) {
    config.data = JSON.stringify(config.data);

    config.headers['Content-Type'] = 'application/json';

    Toast.loading('加载中', 0);

    return config;
});


axios.interceptors.response.use(function (config) {
    Toast.hide();

    return config;
});