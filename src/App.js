import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState(null);

  // Component did mount
  useEffect(() => {
    const events = new EventSource("http://localhost:3002/events");

    // Pass event data to the state
    events.onmessage = (e) => setMessage(JSON.parse(e.data));

    events.onerror = () => events.close();

    return () => events.close();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          Message <span className="App-link">{message}</span>
        </div>
      </header>
    </div>
  );
};

export default App;
