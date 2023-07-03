import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import axios from "axios";
import masterSlice, {
  MasterTodos,
  setCounterLimit,
  setMaster,
} from "./redux/masterSlice";
import Counter from "./Components/Counter/Counter";

function App() {
  const masterTodos = useSelector((state: RootState) => state.master.todos);
  const dispatch = useDispatch();

  const getTodos = async () => {
    return fetch("https://jsonplaceholder.typicode.com/todos").then((result) =>
      result.json()
    );
  };

  const getLimit = async () => {
    return fetch("http://localhost:3000//api/counter/limit").then((result) =>
      result.json()
    );
  };

  useEffect(() => {
    getTodos().then((result: MasterTodos) => {
      dispatch(setMaster(result));
    });

    getLimit()
      .then((response: { limit: number }) =>
        dispatch(setCounterLimit(response))
      )
      .catch(console.error);
  }, []);

  return (
    <div className="App">
      <Counter />

      {masterTodos.map((todo) => {
        return (
          <div>
            <div className="title">{todo.title}</div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
