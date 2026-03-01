import { useState } from "react";
import axios from "axios";

function Onboarding({ setContent }) {
  const [form, setForm] = useState({
    businessName: "",
    category: "",
    targetAudience: "",
    brandTone: "",
    goals: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/ai/generate-content",
        form
      );
      setContent(response.data.content);
    } catch (error) {
      console.error("Full error:", error);
      alert(`Failed: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="onboarding-card">
      <h2>🎯 Business Onboarding</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Business Name *</label>
            <input
              required
              placeholder="e.g., TechStart Inc."
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <input
              required
              placeholder="e.g., Technology, Fashion, Food"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Target Audience *</label>
            <input
              required
              placeholder="e.g., Young professionals, Students"
              value={form.targetAudience}
              onChange={(e) => setForm({ ...form, targetAudience: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Brand Tone *</label>
            <input
              required
              placeholder="e.g., Professional, Casual, Friendly"
              value={form.brandTone}
              onChange={(e) => setForm({ ...form, brandTone: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Marketing Goals *</label>
          <textarea
            required
            placeholder="Describe your marketing goals and objectives..."
            value={form.goals}
            onChange={(e) => setForm({ ...form, goals: e.target.value })}
          />
        </div>

        <button type="submit" className="generate-btn" disabled={loading}>
          {loading && <span className="loading-spinner"></span>}
          {loading ? "Generating..." : "✨ Generate Content"}
        </button>
      </form>
    </div>
  );
}

export default Onboarding;