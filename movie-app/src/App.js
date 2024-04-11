import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  console.log("I run all the time");

  // 처음 한번만 실행됨
  useEffect(() => {
    console.log("I run only once.");
  }, []);

  // keyword가 바뀔때만 실행됨
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);

  // counter가 바뀔때만 실행됨
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);

  // keyword나 counter가 바뀔때 실행됨
  useEffect(() => {
    console.log("I run when keyword & counter change.");
  }, [keyword, counter]);
  return (
    <div className="App">
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}
