import React, { useState, useEffect } from 'react';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
    const [todos, setTodos] = useState([]);

    const LOCAL_STORAGE_KEY = 'react-todo-list-todos';

    useEffect(() => {
        const storageTodos = JSON.parse(
            localStorage.getItem(LOCAL_STORAGE_KEY)
        );

        storageTodos.length !== 0 && setTodos(storageTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        if (todos.length < 10) {
            setTodos([...todos, todo]);
        }
    };

    const toggleComplete = (id) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        );
    };

    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    return (
        <main className="App">
            <h1 className="title">Todo List App</h1>
            <TodoForm addTodo={addTodo} />
            {!todos.length ? (
                <div className="todo-list">
                    <h2>Please add one todo.</h2>
                </div>
            ) : (
                <TodoList
                    todos={todos}
                    toggleComplete={toggleComplete}
                    removeTodo={removeTodo}
                />
            )}
        </main>
    );
}

export default App;
