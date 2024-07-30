import { setTodos } from './todoSlice';

export const fetchTodos = (userId, authToken) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:4000/todos/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
    if (response.ok) {
      const data = await response.json();
      dispatch(setTodos(data));
    } else {
      console.error('Failed to fetch todos');
    }
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};
