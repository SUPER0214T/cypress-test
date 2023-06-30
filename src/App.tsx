import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import axios from "axios";
import masterSlice, { MasterSlice, setMaster } from "./redux/masterSlice";

function App() {
  const master = useSelector((state: RootState) => state.master);
  const dispatch = useDispatch();

  const getTodos = async () => {
    return fetch("https://jsonplaceholder.typicode.com/todos").then((result) =>
      result.json()
    );
  };

  useEffect(() => {
    getTodos().then((result: MasterSlice) => {
      dispatch(setMaster(result));
    });
  }, []);

  return (
    <div className="App">
      {master.map((todo) => {
        return (
          <div>
            <div>{todo.title}</div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
