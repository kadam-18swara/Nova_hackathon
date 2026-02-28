import { useState } from "react";
import Onboarding from "./components/Onboarding";
import CalendarView from "./components/CalendarView";
import Analytics from "./components/Analytics";

function App() {
  const [content, setContent] = useState(null);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>AI Marketing Automation</h1>

      <Onboarding setContent={setContent} />

      {content && <CalendarView content={content} />}

      <Analytics />
    </div>
  );
}

export default App;