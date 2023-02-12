import client from './client';

const login = (username,password) => client.post('/auth/jwt/create', {username,password});

const register = (userInfo) => client.post('/auth/users/', userInfo);


export default {
    login,
    register,
}