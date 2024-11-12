import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import './App.css';

// Context for global state management
const TodoContext = createContext();

// Custom hook for data fetching
function useFetchTodos(addFive) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${addFive * 5}`);
        if (!response.ok) throw new Error('Failed to fetch to-dos');
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [addFive]);

  return { todos, setTodos, loading, error };
}

// Provider component to wrap the app
function TodoProvider({ children }) {
  const [input, setInput] = useState('');
  const [addFive, setAddFive] = useState(1);
  const { todos, setTodos, loading, error } = useFetchTodos(addFive);

  const addTodo = useCallback((title) => {
    setTodos((prevTodos) => [...prevTodos, { title, completed: false }]);
  }, [setTodos]);

  const addFiveMoreTodos = useCallback(() => {
    setAddFive((prevAddFive) => prevAddFive + 1);
  }, []);

  const toggleComplete = useCallback((index) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo, i) => (i === index ? { ...todo, completed: !todo.completed } : todo))
    );
  }, [setTodos]);

  const deleteTodo = useCallback((index) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }, [setTodos]);

  return (
    <TodoContext.Provider value={{ todos, input, setInput, addTodo, addFiveMoreTodos, toggleComplete, deleteTodo, loading, error }}>
      {children}
    </TodoContext.Provider>
  );
}

// Custom hook to use Todo context
function useTodos() {
  return useContext(TodoContext);
}

// Main App Component
function App() {
  const { todos, input, setInput, addTodo, addFiveMoreTodos, loading, error } = useTodos();

  if (loading) return <p>Loading to-dos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>To-Do List</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => addTodo(input)}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem key={index} index={index} todo={todo} />
        ))}
      </ul>
      <button onClick={addFiveMoreTodos}>Add More Todos</button>
    </div>
  );
}

// Optimized TodoItem component with React.memo
const TodoItem = React.memo(({ todo, index }) => {
  const { toggleComplete, deleteTodo } = useTodos();

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(index)}
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </span>
      <button onClick={() => deleteTodo(index)}>Delete</button>
    </li>
  );
});

export default function AppWrapper() {
  return (
    <TodoProvider>
      <App />
    </TodoProvider>
  );
}
