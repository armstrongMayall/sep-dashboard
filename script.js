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

// Function to create SVG radar charts
function createRadarChart(containerId, data, maxValue = 5) {
    const container = document.getElementById(containerId);
    const categories = Object.keys(data);
    const values = Object.values(data);
    
    // Chart dimensions
    const svgWidth = 300;
    const svgHeight = 300;
    const centerX = svgWidth / 2;
    const centerY = svgHeight / 2;
    const radius = 100;
    
    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", svgWidth);
    svg.setAttribute("height", svgHeight);
    
    // Create reference circles
    for (let i = 1; i <= maxValue; i++) {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", centerX);
        circle.setAttribute("cy", centerY);
        circle.setAttribute("r", (i / maxValue) * radius);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "rgba(51, 51, 51, 0.2)");
        circle.setAttribute("stroke-width", "1");
        svg.appendChild(circle);
        
        // Add reference text
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", centerX);
        text.setAttribute("y", centerY - (i / maxValue) * radius - 5);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("font-size", "10");
        text.textContent = i;
        svg.appendChild(text);
    }
    
    // Create axis lines and labels
    const angleStep = (2 * Math.PI) / categories.length;
    categories.forEach((category, i) => {
        const angle = i * angleStep - Math.PI/2;
        const x2 = centerX + radius * Math.cos(angle);
        const y2 = centerY + radius * Math.sin(angle);
        
        // Create axis line
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centerX);
        line.setAttribute("y1", centerY);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "rgba(51, 51, 51, 0.2)");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
        
        // Calculate label position with extra space
        const labelDistance = radius + 30;
        let labelX = centerX + labelDistance * Math.cos(angle);
        let labelY = centerY + labelDistance * Math.sin(angle);
        
        // Adjust label position based on angle for better spacing
        let textAnchor = "middle";
        if (labelX < centerX - 20) textAnchor = "end";
        else if (labelX > centerX + 20) textAnchor = "start";
        
        // Additional padding for better readability
        let paddingX = 0;
        let paddingY = 0;
        
        // Add extra padding in different directions based on angle quadrant
        if (angle > -Math.PI/4 && angle < Math.PI/4) paddingY = 6; // bottom
        else if (angle > Math.PI/4 && angle < 3*Math.PI/4) paddingX = -6; // left
        else if ((angle > 3*Math.PI/4) || (angle < -3*Math.PI/4)) paddingY = -6; // top
        else paddingX = 6; // right
        
        // Create label
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.setAttribute("x", labelX + paddingX);
        label.setAttribute("y", labelY + paddingY);
        label.setAttribute("text-anchor", textAnchor);
        label.setAttribute("font-size", "12");
        label.textContent = category;
        svg.appendChild(label);
    });
    
    // Create data polygon points
    let polygonPoints = "";
    values.forEach((value, i) => {
        const angle = i * angleStep - Math.PI/2;
        const distance = (value / maxValue) * radius;
        const x = centerX + distance * Math.cos(angle);
        const y = centerY + distance * Math.sin(angle);
        polygonPoints += `${x},${y} `;
        
        // Add data point circle
        const point = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        point.setAttribute("cx", x);
        point.setAttribute("cy", y);
        point.setAttribute("r", "4");
        point.setAttribute("fill", "#F05B28");
        svg.appendChild(point);
        
        // Add score text
        const scoreX = centerX + (distance + 15) * Math.cos(angle);
        const scoreY = centerY + (distance + 15) * Math.sin(angle);
        const scoreText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        scoreText.setAttribute("x", scoreX);
        scoreText.setAttribute("y", scoreY);
        scoreText.setAttribute("text-anchor", "middle");
        scoreText.setAttribute("dominant-baseline", "middle");
        scoreText.setAttribute("font-size", "12");
        scoreText.setAttribute("font-weight", "bold");
        scoreText.setAttribute("fill", "#F05B28");
        scoreText.textContent = value.toFixed(1);
        svg.appendChild(scoreText);
    });
    
    // Create polygon for data visualization
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", polygonPoints);
    polygon.setAttribute("fill", "rgba(240, 91, 40, 0.3)");
    polygon.setAttribute("stroke", "#F05B28");
    polygon.setAttribute("stroke-width", "2");
    
    // Insert polygon before other elements to ensure it's behind points and labels
    svg.insertBefore(polygon, svg.firstChild);
    
    // Add the chart to the container
    container.appendChild(svg);
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create all radar charts
    createRadarChart('main-radar-chart', assessmentData.pillars);
    createRadarChart('strategy-radar-chart', assessmentData.strategy);
    createRadarChart('execution-radar-chart', assessmentData.execution);
    createRadarChart('results-radar-chart', assessmentData.results);
    
    // Set up tab switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Hide all tab contents
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            // Show selected tab content
            const tabName = tab.getAttribute('data-tab');
            document.getElementById(`${tabName}-tab`).style.display = 'block';
        });
    });
});
