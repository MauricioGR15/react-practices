import './App.css';
import React, { useState, useEffect } from 'react';

import { useFetch } from "./useFetch"

/*
 Strategies to tame useEffect
 1 - Always use array dependency
 2 - Beware of objects, functions, arrays because those can create problems if not used correctly
*/

// This is an example when we update the state inside the useEffect
const useStopwatch = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("useStopwatch useEffect");
    const interval = setInterval(() => {
      console.log(`Count = ${count}`);
      setCount((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return count;
};

function App() {
  const [url, setUrl] = useState(null);
  // useMemo each time is called, returns the exact object with the same reference value
  //const myOptions = useMemo(() => ({url}), [url])
  //const { data } = useFetch(myOptions);
  const count = useStopwatch();
  const { data } = useFetch({
      url,
      onSuccess: () => console.log("Success")
  });

  console.log("App rendering");

  return (
    <div className="App">
      <div>Hello world</div>
      <div>Count: {count}</div>
      <div>{JSON.stringify(data)}</div>
      <button onClick={() => setUrl("/mauricio.json")}>Mauricio</button>
      <button onClick={() => setUrl("/damari.json")}>Damari</button>
    </div>
  );
}

export default App;
