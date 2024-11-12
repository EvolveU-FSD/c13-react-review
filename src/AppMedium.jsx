import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [addFive, setAddFive] = useState(1);

  // Fetch initial to-dos when the component mounts
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
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
  }, []);

  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const response = await fetch(`https://jsonplaceholder.typicode.com/todos?_limit=${addFive*5}`);
  //       if (!response.ok) throw new Error('Failed to fetch to-dos');
  //       const data = await response.json();
  //       setTodos(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTodos();
  // }, [addFive]);

  const addTodo = () => {
    setTodos([...todos, { title: input, completed: false }]);
    setInput('');
  };

  const addFiveMoreTodos = () => {
    setAddFive(addFive+1);
  };

  const toggleComplete = (index) => {
    setTodos(todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  if (loading) return <p>Loading to-dos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>To-Do List</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            text={todo.title}
            completed={todo.completed}
            onToggle={() => toggleComplete(index)}
            onDelete={() => deleteTodo(index)}
          />
        ))}
      </ul>
      {/* <button onClick={addFiveMoreTodos}>Add More Todos</button> */}
    </div>
  );
}

function TodoItem({ text, completed, onToggle, onDelete }) {
  return (
    <li>
      <input type="checkbox" checked={completed} onChange={onToggle} />
      <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
        {text}
      </span>
      <button onClick={onDelete}>Delete</button>
    </li>
  );
}


export default App
