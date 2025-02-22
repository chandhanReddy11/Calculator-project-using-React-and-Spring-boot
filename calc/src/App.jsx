import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [exp, set] = useState("");
  function handle(event) {
    const value = event.target.value;
  
    set((prevExp) => {
      const match = prevExp.match(/^(\d+)([+\-*/])(\d+)$/);
  
      if (value === "=") {
        if (match) {
          const expressionObj = {
            num1: parseFloat(match[1]),
            num2: parseFloat(match[3]),
            operator: match[2]// Will be sent as a string
          };
  
          fetch("http://localhost:8080/calculate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expressionObj),  // ✅ Convert object to JSON
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return response.json();
            })
            .then((data) => {
              console.log("Response from backend:", data);
              set(data.toString());  // ✅ Ensure result is displayed
            })
            .catch((error) => console.error("Fetch Error:", error));
  
          return "";
        }
        return prevExp;
      }
  
      return prevExp + value;
    });
  }
  
  
  
  function clear(){
    set("");
  }

  return (
    <div className="container">
      <h1>Simple Calculator</h1>
      <input className="tag" type="text" name="field" value={exp} readOnly />
      
      <div className="button-grid">
        <button onClick={handle} value="7">7</button>
        <button onClick={handle} value="8">8</button>
        <button onClick={handle} value="9">9</button>
        <button onClick={handle} value="/">/</button>

        <button onClick={handle} value="4">4</button>
        <button onClick={handle} value="5">5</button>
        <button onClick={handle} value="6">6</button>
        <button onClick={handle} value="*">*</button>

        <button onClick={handle} value="1">1</button>
        <button onClick={handle} value="2">2</button>
        <button onClick={handle} value="3">3</button>
        <button onClick={handle} value="-">-</button>

        <button onClick={handle} value="0">0</button>
        <button onClick={handle} value="+">+</button>
        <button onClick={handle} value="=">=</button>
  
      </div>
      < button className="clear" onClick={clear} >clear</button>
    </div>
  );
}


export default App
