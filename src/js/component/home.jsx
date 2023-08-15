import React, { useState, useEffect } from "react";
import "../index";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    createUser();
    sendEmptyTask(); 
  }, []);

  useEffect(() => {
    updateToDo(toDoList);
  }, [toDoList]);

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
    if (event.key === "Enter") {
      setToDoList(toDoList.concat(inputValue));
      setInputValue("");
    }
  };

  const handleDelete = async (index) => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
  
    if (newToDoList.length === 0) {
      sendEmptyTask(); 
      await updateToDo(sendEmptyTask());
    } else {
      await updateToDo(newToDoList);
    }  
    setToDoList(newToDoList);
  };

  const sendEmptyTask = async () => {
    const emptyTask = [{ label: "No hay tareas", done: false }];
    await updateToDo(emptyTask);
  };

  const clearToDo = async () => {
    await sendEmptyTask();
    setToDoList([]); // Esto asegura que la lista en la interfaz se borre
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
              {toDoList.map((task, index) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center border rounded-0 fade-in"
                  key={index}
                  style={{ color: "grey", fontSize: "20px" }}
                >
                  <span>{task}</span>
                  <button
                    className="btn"
                    style={{ background: "transparent", color: "red" }}
                    onClick={() => handleDelete(index)}
                  >
                    X
                  </button>
                </li>
              ))}
              <li
                className="list-group-item d-flex justify-content-between align-items-center border rounded-0"
                style={{ color: "grey", fontSize: "14px", fontStyle: "italic" }}
              >
                <span>{toDoList.length} items left</span>
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
