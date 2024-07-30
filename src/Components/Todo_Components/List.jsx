import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo, updateTodo } from '../Redus/TodoSlice';
import { authToken } from '../utils/getUserIdAndAuthToken';

function List({ todo }) {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(true);
  const [value, setValue] = useState(todo.msg);

  const handleUpdateTodo = async () => {
    if (!edit) {
      dispatch(updateTodo({ msg: value, id: todo._id, toggle: todo.toggle }));
      const response = await fetch('http://localhost:4000/todo/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ id: todo._id, msg: value })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Todo updated successfully', data);
      } else {
        const error = await response.json();
        console.error('Failed to update todo:', error);
      }
    }
    setEdit((edit) => !edit);
  };
  const handleDeleteTodo = async () => {
    dispatch(deleteTodo(todo._id));
    const response = await fetch('http://localhost:4000/todo/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ id: todo._id })
    });

    if (response.ok) {
      console.log('Todo deleted successfully');
    } else {
      const error = await response.json();
      console.error('Failed to delete todo:', error);
    }
  };

  const handleToggleTodo = async () => {
    dispatch(toggleTodo(todo._id));
    const response = await fetch('http://localhost:4000/todo/toggle', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({ id: todo._id })
    });

    if (response.ok) {
      console.log('Todo toggled successfully');
    } else {
      const error = await response.json();
      console.error('Failed to toggle todo:', error);
    }
  };

  return (
    <div className="flex flex-col items-center text-black">
      <div className={`flex flex-row items-center gap-6 px-2 bg-purple-200 rounded ${todo.toggle ? 'bg-green-200' : 'bg-purple-400'}`}>
        <input type="checkbox" checked={todo.toggle} onChange={handleToggleTodo} />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={edit}
          type="text"
          className={`py-1 px-4 w-96 rounded-md ${todo.toggle ? 'bg-green-200  line-through' : 'bg-purple-400'}`}
        />
        <button disabled={todo.toggle} onClick={handleUpdateTodo}>
          {edit ? '✏️' : '📁'}
        </button>
        <button onClick={handleDeleteTodo}>❌</button>
      </div>
    </div>
  );
}

export default List;
