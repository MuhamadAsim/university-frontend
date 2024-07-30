import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../Redus/TodoSlice';
// import {jwtDecode} from 'jwt-decode';
import { userId, authToken } from '../utils/getUserIdAndAuthToken';

function TodoHead() {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  async function handleAddTodo(e) {
    e.preventDefault();
    if (inputValue.trim()) {
      const newTodo = { msg: inputValue, toggle: false, _id: Date.now() };

      dispatch(addTodo(newTodo));

      try {
        const response = await fetch('http://localhost:4000/todo/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ userId, msg: inputValue })
        });

        if (!response.ok) {
          console.error('Failed to add todo to the backend');
        } else {
          const data = await response.json();
          console.log('Todo added successfully to the backend', data);
        }


      } catch (error) {
        console.error('Error adding todo to the backend:', error);
      }
    }
    setInputValue('');
  }

  return (
    <>
      <form onSubmit={handleAddTodo} className="flex">
        <input
          type="text"
          placeholder="Write Todo..."
          className="w-80 border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="rounded-r-lg px-3 py-1 bg-purple-600 hover:bg-purple-500 relative right-1 text-white shrink-0">
          Add
        </button>
      </form>
    </>
  );
}

export default TodoHead;
