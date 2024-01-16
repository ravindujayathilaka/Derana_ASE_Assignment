import axios from 'axios'
import { Cookies } from 'react-cookie'

// set up cookies
const cookies = new Cookies()



export function handleAuthSSR() {

    
    const url = `http://localhost:3001/api/validate`

    const token = sessionStorage.getItem('token')
    console.log(token)
    

    try {
        if (!token) {
            location.replace('http://localhost:3000/')
        }
        const response = axios.get(url, {
            headers: { Authorization: token },
        })
        
        if (response.data.user){
            location.replace('http://localhost:3000/home/dashboard')
        } 
        else{
            location.replace('http://localhost:3000/')
        }
    } catch (error) {
        /* eslint-disable no-console */
        console.log('Error: ', error)
        // Implementation or Network error
        return -1;
    }
    return {};
}

export async function login({ token }) {
    // Cookie will expire after 24h
    cookies.set('token', token, { maxAge: 60 * 60 * 24 })
    sessionStorage.setItem('token', token);
}

export function logout() {
    cookies.remove('token')
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userType');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('casual');
    sessionStorage.removeItem('annual');
    sessionStorage.removeItem('medical');
    sessionStorage.removeItem('custom');
    
    location.replace('http://localhost:3000/');
}
