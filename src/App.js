import { useState, useEffect } from "react";
import axios from "axios";
import { backend_url } from "./config/config";
import Todo from "./components/Todo";
import "./App.css";

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
      if (todo.length !== 0) {
        let obj = {
          todo,
        };
        await axios.post(`${backend_url}/api/add`, obj);
        setTodo("");
        console.log("it workd");
        setRefresh(!refresh);
      }
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
    <div>
      <div className="main">
        <h1>Todo-App</h1>
        <input type="text" onChange={handleTodo} className="input" />
        <button className="add-btn" onClick={addTodo}>
          Add
        </button>
      </div>
      <div className="todos">
        {todos.map((todo) => (
          <ul>
            <Todo key={todo._id} todo={todo} handleDelete={handleDelete} />
          </ul>
        ))}
      </div>
      <p
        style={{
          marginLeft: "20px",
          textAlign: "center",
          position: "absolute",
          bottom: "0px",
        }}
      >
        Note : Click todo to delete
      </p>
    </div>
  );
}

export default App;
