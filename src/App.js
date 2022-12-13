import React from "react";

function FormTodo({ addTodo, todosLength }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value, false, todosLength);
    setValue("");
  };

  return (
      <React.Fragment>
        <h2><b>Add Todo</b></h2>
        <form onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="Add new todo"
                 style={{ display:'block',marginBottom:5, padding:3}}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </React.Fragment>
  );
}

function App() {
  const [todos, setTodos] = React.useState([]);

  const addTodo = (text,completed,id) => {
    const newTodos = [...todos, { text, completed, id }];

    setTodos(sortingTodos(newTodos));
  };

  const changeTodoState = index => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;

    setTodos(sortingTodos(newTodos));
  };

  const sortingTodos = (newTodos) => {

    return newTodos.sort((a,b) => {
      return Number(a.completed) - Number(b.completed) || b.id - a.id;
    })
  };

  return (
    <div style={{marginLeft:20,marginRight:20 }}>
      <header className="App-header">
        <h1><pre>Gility / assignment pre-interview</pre></h1>
      </header>
      <main style={{ display:'flex'}}>
        <div>
          <FormTodo addTodo={addTodo} todosLength={todos.length}/>
        </div>
        <div>
          <ul style={{ listStyle:'none' }}>
            {
              todos.map((todo, index) => (
                <li key={"todo_"+index} style={{paddingTop:5, paddingBottom:5, backgroundColor: !todo.completed? 'unset':'#ccc' }}>
                  <input type="checkbox" onChange={() => changeTodoState(index)} id={'checkbox_todo'+index} name={'checkbox_todo'+index} checked={todo.completed?true:false} />
                    <label htmlFor={'checkbox_todo'+index}>
                      {todo.text} - <i>{todo.completed ? 'Completed' : 'Pending'}</i>
                    </label>
                </li>
              ))
            }
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
