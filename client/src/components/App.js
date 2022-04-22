import React from 'react'
import { Router, Route} from "react-router-dom";
import TodoCreate from "./todos/TodoCreate"
import TodoEdit from "./todos/TodoEdit"
import TodoDelete from "./todos/TodoDelete"
import TodoList from "./todos/TodoList"
import Header from "./Header";
import history from "../history";


const App = () => {
  return (
    <div className="ui container"> 
          <Router  history={history}>
           <div>
             <Header />   
             <Route path="/" exact component={TodoList} />
             <Route path="/todos/new" exact component={TodoCreate} />
             <Route path="/todos/edit/:id" exact component={TodoEdit} />
             <Route path="/todos/delete/:id" exact component={TodoDelete} />
           </div>
          </Router>
        </div>
  )
}

export default App;
