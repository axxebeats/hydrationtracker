import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [waterIntake, setWaterIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);
  const [history, setHistory] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedIntake = localStorage.getItem('hydration_intake');
    const savedGoal = localStorage.getItem('hydration_goal');
    const savedHistory = localStorage.getItem('hydration_history');

    if (savedIntake) setWaterIntake(parseInt(savedIntake));
    if (savedGoal) setDailyGoal(parseInt(savedGoal));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('hydration_intake', waterIntake.toString());
    localStorage.setItem('hydration_goal', dailyGoal.toString());
    localStorage.setItem('hydration_history', JSON.stringify(history));
  }, [waterIntake, dailyGoal, history]);

  const addWater = (amount) => {
    const newIntake = waterIntake + amount;
    setWaterIntake(newIntake);
    
    const now = new Date();
    const entry = {
      amount: amount,
      time: now.toLocaleTimeString(),
      total: newIntake
    };
    
    setHistory(prev => [entry, ...prev.slice(0, 9)]); // Keep last 10 entries
  };

  const resetDay = () => {
    setWaterIntake(0);
    setHistory([]);
  };

  const progressPercentage = Math.min((waterIntake / dailyGoal) * 100, 100);

  return (
    <div className="App">
      <header className="app-header">
        <h1>💧 Hydration Tracker</h1>
        <p>Stay hydrated, stay healthy!</p>
      </header>

      <main className="app-main">
        <div className="goal-section">
          <label htmlFor="goal-input">Daily Goal (ml):</label>
          <input
            id="goal-input"
            type="number"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(parseInt(e.target.value) || 0)}
            min="500"
            max="5000"
            step="100"
          />
        </div>

        <div className="progress-section">
          <div className="progress-circle">
            <div className="progress-text">
              <span className="current">{waterIntake}</span>
              <span className="separator">/</span>
              <span className="goal">{dailyGoal} ml</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="progress-percentage">
              {Math.round(progressPercentage)}%
            </div>
          </div>
        </div>

        <div className="add-water-section">
          <h3>Add Water</h3>
          <div className="water-buttons">
            <button onClick={() => addWater(100)}>+100ml</button>
            <button onClick={() => addWater(250)}>+250ml</button>
            <button onClick={() => addWater(500)}>+500ml</button>
            <button onClick={() => addWater(750)}>+750ml</button>
          </div>
        </div>

        <div className="history-section">
          <h3>Today's Intake History</h3>
          {history.length === 0 ? (
            <p className="no-history">No water logged yet today</p>
          ) : (
            <ul className="history-list">
              {history.map((entry, index) => (
                <li key={index} className="history-item">
                  <span className="time">{entry.time}</span>
                  <span className="amount">+{entry.amount}ml</span>
                  <span className="total">Total: {entry.total}ml</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="reset-section">
          <button className="reset-button" onClick={resetDay}>
            Reset Day
          </button>
        </div>
      </main>

      <footer className="app-footer">
        <p>💡 Tip: Aim for 8 glasses of water per day!</p>
      </footer>
    </div>
  );
}

export default App;