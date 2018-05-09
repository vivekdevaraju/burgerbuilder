import axios from 'axios';

const instance = axios.create({
    baseURL:'https://burgerbuilder-acb57.firebaseio.com/'
});

export default instance;