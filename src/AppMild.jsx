import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    setTodos([...todos, input]);
    setInput('');
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <TodoItem key={index} text={todo} />
        ))}
      </ul>
    </div>
  );
}

function TodoItem({ text }) {
  return <li>{text}</li>;
}

export default App
