import React, { useEffect, useState } from "react";
import { getTodos, addTodo, updateTodo, deleteTodo } from "./TodoService";

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
        getTodos().then((response) => setTodos(response.data));
    }, []);

    const handleAddTodo = () => {
        if (!newTodo.trim()) return;
        addTodo({ title: newTodo, isCompleted: false }).then(() => {
            setNewTodo("");
            getTodos().then((response) => setTodos(response.data));
        });
    };

    const handleToggleTodo = (todo) => {
        updateTodo(todo.id, { ...todo, isCompleted: !todo.isCompleted }).then(() =>
            getTodos().then((response) => setTodos(response.data))
        );
    };

    const handleDeleteTodo = (id) => {
        deleteTodo(id).then(() =>
            getTodos().then((response) => setTodos(response.data))
        );
    };

    const handleEditTodo = (todo) => {
        setEditingId(todo.id);
        setEditingText(todo.title);
    };

    const handleSaveEdit = (id, currentTodo) => {
        if (!editingText.trim()) return;
    
        const updatedTodo = { 
            id: id, 
            title: editingText, 
            isCompleted: currentTodo.isCompleted 
        };
        updateTodo(id, updatedTodo)
            .then(() => {
                setEditingId(null);
                getTodos().then((response) => setTodos(response.data));
            })
           ;
    };
    

    return (
        <div className="todo-container">
            <h2 className="todo-header">To-Do List</h2>
            <div className="todo-input-container">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                />
                <button onClick={handleAddTodo} className="todo-add-button">
                    Add
                </button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo.id} className="todo-item">
                        {editingId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className="todo-edit-input"
                                />
                                <button onClick={() => handleSaveEdit(todo.id,todo)} className="todo-save-button">
                                    Save
                                </button>
                            </>
                        ) : (
                            <>
                                <span
                                    className={`todo-title ${todo.isCompleted ? 'completed' : ''}`}
                                    onClick={() => handleToggleTodo(todo)}
                                >
                                    {todo.title}
                                </span>
                                <button onClick={() => handleEditTodo(todo)} className="todo-edit-button">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteTodo(todo.id)} className="todo-delete-button">
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}    

export default TodoApp;
