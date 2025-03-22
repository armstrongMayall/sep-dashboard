// Assessment data
const assessmentData = {
    // Main pillars
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

// Colors
const orange = '#F05B28';
const orangeTransparent = 'rgba(240, 91, 40, 0.3)';

// Function to create radar charts using Chart.js
function createRadarChart(canvasId, chartData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const labels = Object.keys(chartData);
    const data = Object.values(chartData);
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Score',
                data: data,
                backgroundColor: orangeTransparent,
                borderColor: orange,
                borderWidth: 2,
                pointBackgroundColor: orange,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            family: 'Archivo',
                            size: 12
                        }
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1,
                        backdropColor: 'transparent',
                        font: {
                            family: 'Archivo',
                            size: 10
                        }
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Score: ${context.raw}/5`;
                        }
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.1 // Smoother lines
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create all radar charts
    createRadarChart('main-radar-chart', assessmentData.pillars);
    createRadarChart('strategy-radar-chart', assessmentData.strategy);
    createRadarChart('execution-radar-chart', assessmentData.execution);
    createRadarChart('results-radar-chart', assessmentData.results);
    
    // Set up tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding content
            const tabName = button.getAttribute('data-tab');
            document.getElementById(`${tabName}-tab`).classList.add('active');
        });
    });
});
