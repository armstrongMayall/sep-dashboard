// Define colors object globally
const colors = {
  background: '#F6F2E6',
  darkBackground: '#333333',
  orange: '#F05B28',
  text: '#333333',
  lightText: '#FFFFFF'
};

// Create assessment data
const assessmentData = {
  // Main pillars data
  pillars: {
    'Strategy': 1.67,
    'Execution': 1.75,
    'Results': 1.5
  },
  // Strategy subcategories
  strategy: {
    'Universal Search Destinations': 2,
    'Extended Search Destinations': 1, 
    'Search Interactions': 2
  },
  // Execution subcategories
  execution: {
    'Asset Management': 2,
    'Technology Utilization': 1,
    'Team Capabilities': 2,
    'Process and Workflow': 2
  },
  // Results subcategories
  results: {
    'Performance Metrics': 2,
    'Measurement': 1
  }
};

// Define the RadarChart component
const RadarChart = ({ title, data, maxValue = 5 }) => {
  // Component code here...
};

// Define the main component
const SEPDashboard = () => {
  // Component code here...
};

// This is critical - make sure to render at the end of the file
ReactDOM.render(<SEPDashboard />, document.getElementById('root'));
