import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const createEventSource = () => {
  return new EventSource("http://localhost:3002/events");
};

let SSE = createEventSource();

const App = () => {
  const [message, setMessage] = useState(null);
  const [events, setEvents] = useState(SSE);
  const [listening, setListening] = useState(false);

  const logoClasses = ["App-logo"];
  if (listening) {
    logoClasses.push("spinning");
  }

  const startSSE = () => {
    events.close();
    setEvents(createEventSource());
    setListening(true);
  };

  const stopSEE = () => {
    setListening(false);
    events.close();
  };

  // Component did mount
  useEffect(() => {
    // Pass event data to the state
    events.onmessage = (e) => {
      setMessage(JSON.parse(e.data));
      setListening(true);
    };

    events.onerror = () => {
      // events.close();
      setListening(false);
    };

    return () => events.close();
  }, [events]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={logoClasses.join(" ")} alt="logo" />
        <div>
          Message: <span className="message">{message}</span>
        </div>
        <br />
        <div className="container">
          <button className="App-btn" onClick={startSSE}>
            Start events
          </button>
          <button className="App-btn danger" onClick={stopSEE}>
            Stop events
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;
