import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoHead from "./Todo_Components/Head";
import List from "./Todo_Components/List";
import { fetchTodos } from './utils/FetchTodos.js';
import { authToken, userId } from "./utils/getUserIdAndAuthToken.js";

function Todo() {
  const dispatch = useDispatch();
  let todos = useSelector((state) => state.todos);

  useEffect(() => {
    if (authToken) {
      dispatch(fetchTodos(userId, authToken));
    }
  }, [dispatch,authToken,userId]);

  return (
    <>
      <div className="flex items-center justify-center w-screen text-purple-700">
        <div className="flex flex-col items-center justify-center gap-10 my-20 bg-purple-300 shadow-lg rounded-2xl w-1/2 pt-6 pb-12">
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1 className="text-3xl font-semibold text-center">Add Todo</h1>
            <TodoHead />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold text-center">Your Todos</h1>

            {todos.map((todo) => (
              <List key={todo._id} todo={todo} />
            ))}
            {todos.length < 1 && <h1 className='text-center'>No Todos found</h1>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
