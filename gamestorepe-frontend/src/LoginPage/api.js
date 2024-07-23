// api.js
const axios = require('axios');
const qs = require('qs');

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8081/api/auth/login', qs.stringify({
      username: username,
      password: password,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    console.error('An error occurred during login:', error);
    throw error;
  }
};
