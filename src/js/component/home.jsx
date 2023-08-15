import React, { useState, useEffect } from "react";
import "../index";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    updateToDo(toDoList);
  }, [toDoList]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/juanpintoselso"
      );
      if (response.ok) {
        const data = await response.json();
        setToDoList(data);
      } else {
        createUser(); // Si no se encuentra el usuario, lo crea
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async () => {
    const response = await fetch(
      "https://playground.4geeks.com/apis/fake/todos/user/juanpintoselso",
      {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    sendEmptyTask();
    console.log(data);
  };

  async function updateToDo(toDo) {
    try {
      const response = await fetch(
        "https://playground.4geeks.com/apis/fake/todos/user/juanpintoselso",
        {
          method: "PUT",
          body: JSON.stringify(toDo),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.ok); // will be true if the response is successful
      console.log(response.status); // the status code = 200 or code = 400 etc.
      const text = await response.text(); // will try to return the exact result as a string
      console.log(text);
      const data = await response.json(); // will try to parse the result as JSON

      //here is where your code should start after the fetch finishes
      console.log(data); //this will print on the console the exact object received from the server
    } catch (error) {
      //error handling
      console.log(error);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (toDoList.length === 1 && toDoList[0].label === "No hay tareas") {
        setToDoList([{ label: inputValue, done: false }]);
      } else {
        setToDoList([...toDoList, { label: inputValue, done: false }]);
      }
      setInputValue("");
    }
  };
  
  const handleDelete = async (index) => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
  
    if (newToDoList.length === 0) {
      setToDoList([{ label: "No hay tareas", done: false }]);
    } else {
      setToDoList(newToDoList);
    }
  };

  const sendEmptyTask = async () => {
    const emptyTask = [{ label: "No hay tareas", done: false }];
    await updateToDo(emptyTask);
  };

  const clearToDo = async () => {
    await sendEmptyTask();
    setToDoList([]); // Esto asegura que la lista en la interfaz se borre
  };

  const getTaskCount = () => {
    if (toDoList.length === 1 && toDoList[0].label === "No hay tareas") {
      return 0;
    }
    return toDoList.length;
  };

  return (
    <div className="container text-center">
      <div className="row">
        <h1 className="text-center mt-5">todos</h1>
      </div>
      <div className="row justify-content-center">
        <div className="col-6">
          <div className="list-container">
            <ul className="list-group">
              <li
                className="list-group-item d-flex justify-content-between align-items-center border rounded-0 fade-in"
                style={{ color: "grey", fontSize: "20px" }}
              >
                <input
                  type="text"
                  className="form-control border-0 rounded-0"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="What needs to be done?"
                  style={{ fontSize: "20px", color: "grey" }}
                />
              </li>
              {toDoList.map((task, index) => {
                if (toDoList.length === 1 && task.label === "No hay tareas")
                  return null;
                return (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center border rounded-0 fade-in"
                    key={index}
                    style={{ color: "grey", fontSize: "20px" }}
                  >
                    <span>{task.label}</span>
                    <button
                      className="btn"
                      style={{ background: "transparent", color: "red" }}
                      onClick={() => handleDelete(index)}
                    >
                      X
                    </button>
                  </li>
                );
              })}
              <li
                className="list-group-item d-flex justify-content-between align-items-center border rounded-0"
                style={{ color: "grey", fontSize: "14px", fontStyle: "italic" }}
              >
                <span>{getTaskCount()} items left</span>
                <button
                  className="btn"
                  style={{ background: "transparent", color: "grey" }}
                  onClick={clearToDo}
                >
                  Clear All
                </button>
              </li>
            </ul>
          </div>
          <div className="list-container second"></div>
          <div className="list-container third"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
