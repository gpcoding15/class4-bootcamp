import axios from 'axios';
const baseUrl = "http://localhost:3001/api/notes";

export const getAllNotes = async() => {
    const response = await axios.get(baseUrl)
    const { data } = response

    return data
}

export const createNote = async({ content, important}) => {
    const response = await axios.post("http://localhost:3001/api/notes", {content, important})
    const { data } = response

    return data
}