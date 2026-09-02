import axios from 'axios';

export const getAllNotes = async() => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
    const { data } = response

    return data
}

export const createNote = async({ id, title, body }) => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {id, title, body})
    const { data } = response

    return data
}