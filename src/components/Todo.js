const Todo = ({ todo: { todo, _id }, handleDelete }) => {
  return (
    <li className="todo" onClick={() => handleDelete(_id)}>
      {todo}
    </li>
  );
};

export default Todo;
