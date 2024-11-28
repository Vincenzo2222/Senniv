import React, { useState } from 'react';

const StepEditor = ({ step, onSave }) => {
  const [content, setContent] = useState(step.content);

  const handleSave = () => {
    onSave(step.id, content);
  };

  return (
    <div>
      <h4>{step.title}</h4>
      <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default StepEditor;
