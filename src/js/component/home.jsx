import React, { useState, useEffect } from "react";
import '../index'; 

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    console.log(toDoList);
  }, [toDoList]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setToDoList(toDoList.concat(inputValue));
      setInputValue("");
    }
  };

  const handleDelete = (index) => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDoList(newToDoList);
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
              <li className="list-group-item d-flex justify-content-between align-items-center border rounded-0 fade-in" style={{ color: "grey", fontSize: "20px" }}>
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
                <li className="list-group-item d-flex justify-content-between align-items-center border rounded-0 fade-in" key={index} style={{ color: "grey", fontSize: "20px" }}>
                  <span>{task}</span>
                  <button className="btn" style={{ background: "transparent", color: "red" }} onClick={() => handleDelete(index)}>X</button>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-start align-items-center border rounded-0" style={{ color: "grey", fontSize: "14px", fontStyle: "italic" }}>
                <span>{toDoList.length} items left</span>
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
