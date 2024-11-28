import React from 'react';

function ProgressBar({ sections }) {
  const completed = sections.filter((section) => section.completed).length;
  const total = sections.length;
  const percentage = total > 0 ? (completed / total) * 100 : 0;

  return (
    <div>
      <h3>Progresso</h3>
      <div style={{ background: '#ddd', width: '100%', height: '20px', borderRadius: '10px' }}>
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: 'green',
            borderRadius: '10px',
          }}
        ></div>
      </div>
      <p>{`${completed} di ${total} sezioni completate (${Math.round(percentage)}%)`}</p>
    </div>
  );
}

export default ProgressBar;
