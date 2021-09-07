import { useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "./config/config";
import Todo from "./components/Todo";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const {
          data: { todos },
        } = await axios.get(`${backend_url}/api/all`);
        setTodos(todos);
        setRefresh(!refresh);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTodos();
  }, [refresh]);

  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  const addTodo = async () => {
    try {
      let obj = {
        todo,
      };
      await axios.post(`${backend_url}/api/add`, obj);
      setTodo("");
      console.log("it workd");
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backend_url}/api/remove/${id}`);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Todo</h1>
      <input type="text" onChange={handleTodo} />
      <button onClick={addTodo}>Add</button>
      <div className="todos">
        {todos.map((todo) => (
          <Todo todo={todo} key={todo._id} handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
}

export default App;
