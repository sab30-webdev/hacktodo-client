const Todo = ({ todo: { todo, _id }, handleDelete }) => {
  return <h3 onClick={() => handleDelete(_id)}>{todo}</h3>;
};

export default Todo;
