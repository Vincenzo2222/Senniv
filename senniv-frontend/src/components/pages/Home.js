import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [prompt, setPrompt] = useState('');
  const [steps, setSteps] = useState([]);
  const [error, setError] = useState('');

  // Handle brainstorming prompt submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('You must log in to continue.');
      }

      const response = await axios.post(
        '/api/ai/define-steps',
        { prompt },
        { headers: { 'x-auth-token': token } }
      );

      setSteps(response.data.steps);
      setPrompt(''); // Clear the prompt input after successful submission
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || 'Error while defining steps.');
    }
  };

  // Handle updating a specific step
  const updateStep = async (stepId, newPrompt) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/ai/update-step',
        { stepId, prompt: newPrompt },
        { headers: { 'x-auth-token': token } }
      );

      const updatedStep = response.data.step;
      setSteps((prevSteps) =>
        prevSteps.map((step) => (step.id === updatedStep.id ? updatedStep : step))
      );
    } catch (err) {
      console.error('Error:', err);
      setError(err.response?.data?.error || 'Error while updating the step.');
    }
  };

  // Fetch existing steps on page load
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('You must log in to view your steps.');
        }

        const response = await axios.get('/api/ai/get-steps', {
          headers: { 'x-auth-token': token },
        });

        setSteps(response.data.steps);
      } catch (err) {
        console.error('Error:', err);
        setError(err.response?.data?.error || 'Error while fetching steps.');
      }
    };

    fetchSteps();
  }, []);

  return (
    <div>
      <h1>Business Plan Brainstorming</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Enter your brainstorming prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        ></textarea>
        <button type="submit">Generate Plan</button>
      </form>

      {error && <div style={{ color: 'red' }}>{error}</div>}

      {steps.length > 0 && (
        <div>
          <h3>Generated Business Plan Sections:</h3>
          {steps.map((step) => (
            <div key={step.id}>
              <h4>{step.title}</h4>
              <p>{step.content}</p>
              <button
                onClick={() =>
                  updateStep(step.id, prompt)
                }
              >
                Modify
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
