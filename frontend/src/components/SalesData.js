import React from 'react';
import './SalesData.css'; // Ensure this CSS file exists for custom styles

const SalesData = () => {
    return (
        <div className="sales-data">
            <iframe 
                title="Sales Chart 1" 
                style={{
                    background: '#FFFFFF',
                    border: 'none',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, 0.2)'
                }}
                width="640" 
                height="480" 
                src="https://charts.mongodb.com/charts-project-0-xvhpzje/embed/charts?id=9afc3ff3-6cab-48a6-ac3b-d13e1f1be7c6&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
            <iframe 
                title="Sales Chart 2" 
                style={{
                    background: '#FFFFFF',
                    border: 'none',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, 0.2)'
                }}
                width="640" 
                height="480" 
                src="https://charts.mongodb.com/charts-project-0-xvhpzje/embed/charts?id=4ddf42e6-5473-401a-b508-29e13b4334f5&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
            <iframe 
                title="Sales Chart 3" 
                style={{
                    background: '#FFFFFF',
                    border: 'none',
                    borderRadius: '2px',
                    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, 0.2)'
                }}
                width="640" 
                height="480" 
                src="https://charts.mongodb.com/charts-project-0-xvhpzje/embed/charts?id=4170a374-bccb-41b4-a52d-ec65120e1d09&maxDataAge=60&theme=light&autoRefresh=true"
            ></iframe>
        </div>
    );
};

export default SalesData;
