import axios from 'axios';

export const getAllNotes = async() => {
    const response = axios.get("https://jsonplaceholder.typicode.com/posts")
    return response.data
}