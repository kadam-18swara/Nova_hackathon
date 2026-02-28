import { useState } from "react";
import axios from "axios";

function Onboarding({ setContent }) {
  const [form, setForm] = useState({
    name: "",
    category: "",
    audience: "",
    tone: "",
    goals: "",
  });

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:5000/api/ai/generate-content",
      form
    );
    setContent(response.data.content);
  };

  return (
    <div>
      <h2>Business Onboarding</h2>

      <input placeholder="Business Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <input placeholder="Category"
        onChange={(e) => setForm({ ...form, category: e.target.value })} />

      <input placeholder="Target Audience"
        onChange={(e) => setForm({ ...form, audience: e.target.value })} />

      <input placeholder="Brand Tone"
        onChange={(e) => setForm({ ...form, tone: e.target.value })} />

      <input placeholder="Goals"
        onChange={(e) => setForm({ ...form, goals: e.target.value })} />

      <br /><br />
      <button onClick={handleSubmit}>Generate Content</button>
    </div>
  );
}

export default Onboarding;