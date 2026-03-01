import { useState } from "react";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding";
import CalendarView from "./components/CalendarView";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [content, setContent] = useState(null);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>🚀 AI Marketing Automation</h1>
        <p>Generate professional marketing content in seconds</p>
      </header>

      <main className="main">
        <Onboarding setContent={setContent} />
        {content && <CalendarView content={content} />}
      </main>
    </div>
  );
}

export default App;