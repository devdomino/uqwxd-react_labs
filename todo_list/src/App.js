import React from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    console.log('ls todos' + localStorage.getItem("todos")) ;
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    console.log('create json from the todos');
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    console.log('entering fn handleSubmit');
    //  console.log(todo);
    e.preventDefault();
    console.log('setting up object');
    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,};
    console.log('user entered: ' + newTodo.text);
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
      setTodo("");
    } else {
      alert("Empty tasks are not allowed");
      setTodo("");
    }
  }

  function handleDelete(todoID){
    console.log('entering fn handledelete');
    console.log('todoID: '+ todoID);
    let updatedTodos = [...todos].filter((todo) => todo.id !== todoID);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }
  
  function submitEdits(id) {
    console.log('check for emptiness ' + editingText);
    if (editingText === "") {
      alert("Can't not not do something!");
      setTodoEditing(null);
    } else {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
    }
  }
  
return(
<div className ="App" id="todo-list">
<h1>Todo List</h1>
<form onSubmit={handleSubmit}>
<input
  type ="text" 
  onChange={(e) => setTodo(e.target.value)}
  placeholder="What's next?"
  value={todo}  
  align ="right" />
<button type ="submit">Add Todo</button>
</form>
{/* {todos.map((todo) => <div className="todo" key={todo.id}>
  <div><input type="checkbox" id="completed" checked={todo.completed}
    onChange={() => toggleComplete(todo.id)} /> {todo.text} < br/>
  <button onClick={() => handleDelete(todo.id)}>Delete {todo.text} </button>
  < br/>

  </div>
</div>)} */}
{todos.map((todo) => (
            <div key={todo.id} className="todo">
              <div className="todo-text">
                <input
                  type="checkbox"
                  id="completed"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                />
                {todo.id === todoEditing ? (
                  <input
                    type="text"
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                ) : (
                  <div>{todo.text}</div>
                )}
              </div>
              <div className="todo-actions">
                {todo.id === todoEditing ? (
                  <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
                ) : (
                  <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                )}
    
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </div>
            </div>
          ))}
</div>
);
};


export default App;
