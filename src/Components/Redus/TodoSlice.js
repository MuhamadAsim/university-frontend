import { createSlice } from '@reduxjs/toolkit'

const initialState = [];


export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push({ ...action.payload });
    },
    toggleTodo: (state, action) => {
      return state.map(todo =>
        todo._id === action.payload ? { ...todo, toggle: !todo.toggle } : todo
      );
    },
    deleteTodo: (state, action) => {
      return state.filter(todo => todo._id !== action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.findIndex(todo => todo._id === action.payload._id);
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
    setTodos: (state, action) => {
      return action.payload;
    }
  },
});


export const { addTodo, toggleTodo, deleteTodo, updateTodo, setTodos } = TodoSlice.actions;


export default TodoSlice.reducer;
