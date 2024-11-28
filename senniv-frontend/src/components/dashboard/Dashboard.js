import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProgressBar from './ProgressBar';
import { Tooltip } from 'react-tooltip'; // Nuovo import per il Tooltip

function Dashboard() {
  const [sections, setSections] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token mancante. Effettua il login per continuare.');
        }
        const res = await axios.get('/api/ai/get-steps', {
          headers: { 'x-auth-token': token },
        });
        setSections(res.data.steps || []);
      } catch (err) {
        console.error('Errore durante il caricamento delle sezioni:', err);
        setError('Errore durante il caricamento della dashboard.');
      }
    };
    fetchSections();
  }, []);

  const handleAddToSection = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token mancante. Effettua il login per continuare.');
      }
      const res = await axios.post(
        '/api/ai/brainstorm',
        { prompt, section: selectedSection },
        { headers: { 'x-auth-token': token } }
      );
      setSections(res.data.steps);
      setPrompt('');
    } catch (err) {
      console.error('Errore durante l\'aggiornamento della sezione:', err);
      setError('Errore durante l\'aggiornamento della sezione.');
    }
  };

  const avanzamentoStep = (index) => {
    const updatedSections = [...sections];
    updatedSections[index].completed = true;
    setSections(updatedSections);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ProgressBar sections={sections} />
      <form onSubmit={handleAddToSection}>
        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          required
        >
          <option value="">Seleziona una sezione</option>
          {sections.map((section, index) => (
            <option key={index} value={section.section}>
              {section.section}
            </option>
          ))}
        </select>
        <textarea
          placeholder="Aggiungi dettagli o idee..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          required
        ></textarea>
        <button type="submit">Aggiorna Sezione</button>
      </form>
      <div>
        {sections.length > 0 ? (
          sections.map((section, index) => (
            <div key={index}>
              <h2
                data-tooltip-id={`tooltip-${index}`}
                data-tooltip-content={`Questa sezione riguarda ${section.section}`}
              >
                {section.section}
              </h2>
              <Tooltip id={`tooltip-${index}`} />
              <p>{section.content || 'Descrizione non ancora aggiunta.'}</p>
              {!section.completed && (
                <button onClick={() => avanzamentoStep(index)}>Segna come completata</button>
              )}
              {section.completed && <p style={{ color: 'green' }}>Completata!</p>}
            </div>
          ))
        ) : (
          <p>Nessuna sezione definita. Inizia con un brainstorming!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
