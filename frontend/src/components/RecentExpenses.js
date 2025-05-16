import React from 'react';
import './RecentExpenses.css'; // Ensure this CSS file is created

export default function RecentExpenses() {
  return (
    <div className="recent-expenses">
      <iframe
        title="Recent Expenses Chart"
        className="chart-iframe"
        width="720"
        height="480"
        src="https://charts.mongodb.com/charts-project-0-xvhpzje/embed/charts?id=a36ea87e-0fd9-4074-bde2-660132527976&maxDataAge=3600&theme=light&autoRefresh=true"
      ></iframe>
    </div>
  );
}
