import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [preferences, setPreferences] = useState({
    budget: '',
    duration: '',
    location: '',
    interests: '',
  });
  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    setPreferences({
      ...preferences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/recommendations/?budget=${preferences.budget}&location=${preferences.location}&interests=${preferences.interests}&duration=${preferences.duration}`
      );
      
      // const response = await fetch(
      //   `http://127.0.0.1:8000/api/recommendations/?budget=${preferences.budget}&location=${preferences.location}&interests=${preferences.interests}`
      // );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Travel Companion Chatbot</h1>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Budget</label>
          <input
            name="budget"
            className="form-control"
            placeholder="Enter your budget"
            value={preferences.budget}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Duration</label>
          <input
            name="duration"
            className="form-control"
            placeholder="Enter duration (e.g., 1 week)"
            value={preferences.duration}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            name="location"
            className="form-control"
            placeholder="Preferred location"
            value={preferences.location}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Interests</label>
          <input
            name="interests"
            className="form-control"
            placeholder="E.g., Adventure, Beach"
            value={preferences.interests}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Get Recommendations</button>
      </form>

      {recommendations.length > 0 && (
        <div className="mt-4">
          <h2 className="text-center mb-4">Your Recommendations</h2>
          <div className="row">
            {recommendations.map((recommendation, index) => (
              <div className="col-md-4" key={index}>
                <div className="card shadow-sm mb-4">
                  <div className="card-body">
                    <h5 className="card-title">{recommendation.name}</h5>
                    <p className="card-text">{recommendation.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default App;


