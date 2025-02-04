
import axios from 'axios'


const API_URL = "http://localhost:5055/api/todo";

const getTodos = () => axios.get(API_URL);
const addTodo = (todo) => axios.post(API_URL, todo);
const updateTodo = (id, todo) => axios.put(`${API_URL}/${id}`, todo);
const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);

export {getTodos, addTodo, updateTodo, deleteTodo}