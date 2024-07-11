document.addEventListener('DOMContentLoaded', () => {
    const filePath = '2024_results.csv';
    const partiesList = [
        'dravidamunnetrakazhagam', 'kongunadumakkaldesiakkatchi', 'indiannationalcongress',
        'communistpartyofindia', 'communistpartyofindiamarxist', 'viduthalaichiruthaigalkatchi',
        // ... add all other parties here ...
    ];

    // Populate select elements with parties
    const alliance1Select = document.getElementById('alliance1');
    const alliance2Select = document.getElementById('alliance2');
    partiesList.forEach(party => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        option1.value = option2.value = party;
        option1.text = option2.text = party;
        alliance1Select.appendChild(option1);
        alliance2Select.appendChild(option2);
    });

    // Event listener for submit button
    document.getElementById('submit').addEventListener('click', () => {
        const selectedPartiesAlliance1 = Array.from(alliance1Select.selectedOptions).map(option => option.value);
        const selectedPartiesAlliance2 = Array.from(alliance2Select.selectedOptions).map(option => option.value);
        fetchCSVData(filePath).then(data => {
            if (data) {
                const processedData = processCSVData(data, selectedPartiesAlliance1, selectedPartiesAlliance2);
                if (processedData) {
                    renderChart(processedData);
                } else {
                    alert('No data found for the selected parties.');
                }
            } else {
                alert('CSV file not found.');
            }
        });
    });

    // Fetch CSV data
    async function fetchCSVData(filePath) {
        try {
            const response = await fetch(filePath);
            const text = await response.text();
            return d3.csvParse(text);
        } catch (error) {
            console.error('Error fetching CSV data:', error);
            return null;
        }
    }

    // Process CSV data
    function processCSVData(data, alliance1, alliance2) {
        const filteredData = data.map(row => ({
            ward: row.ward.replace(/\s|\(|\)/g, '').toLowerCase(),
            party: row.party.replace(/\s/g, '').toLowerCase(),
            votes: parseInt(row.votes, 10)
        }));

        const alliance1Data = filteredData.filter(row => alliance1.includes(row.party));
        const alliance2Data = filteredData.filter(row => alliance2.includes(row.party));

        if (alliance1Data.length === 0 || alliance2Data.length === 0) return null;

        const wards = [...new Set(filteredData.map(row => row.ward))];
        const alliance1Votes = wards.map(ward => alliance1Data.filter(row => row.ward === ward).reduce((sum, row) => sum + row.votes, 0));
        const alliance2Votes = wards.map(ward => alliance2Data.filter(row => row.ward === ward).reduce((sum, row) => sum + row.votes, 0));

        return { wards, alliance1Votes, alliance2Votes, alliance1Labels: alliance1.join(', '), alliance2Labels: alliance2.join(', ') };
    }

    // Render chart using D3.js
    function renderChart({ wards, alliance1Votes, alliance2Votes, alliance1Labels, alliance2Labels }) {
        d3.select('#chart').html('');  // Clear previous chart

        const width = 1000;  // Increased width to accommodate more wards
        const height = 600;
        const margin = { top: 20, right: 20, bottom: 100, left: 50 };  // Adjusted margin to accommodate rotated labels

        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .range([0, width])
            .domain(wards)
            .padding(0.1);

        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max([...alliance1Votes, ...alliance2Votes])]);

        svg.selectAll('.bar1')
            .data(alliance1Votes)
            .enter().append('rect')
            .attr('class', 'bar1')
            .attr('x', (d, i) => x(wards[i]) - x.bandwidth() / 4)
            .attr('width', x.bandwidth() / 2)
            .attr('y', d => y(d))
            .attr('height', d => height - y(d))
            .attr('fill', 'steelblue');

        svg.selectAll('.bar2')
            .data(alliance2Votes)
            .enter().append('rect')
            .attr('class', 'bar2')
            .attr('x', (d, i) => x(wards[i]) + x.bandwidth() / 4)
            .attr('width', x.bandwidth() / 2)
            .attr('y', d => y(d))
            .attr('height', d => height - y(d))
            .attr('fill', 'orange');

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        svg.append('g')
            .call(d3.axisLeft(y));

        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - height / 2)
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Votes Count');

        svg.append('text')
            .attr('transform', `translate(${width / 2},${height + margin.bottom - 40})`)
            .style('text-anchor', 'middle')
            .text('Wards');

        const legend = svg.append('g')
            .attr('font-family', 'sans-serif')
            .attr('font-size', 10)
            .attr('text-anchor', 'end')
            .selectAll('g')
            .data([`Alliance 1 - ${alliance1Labels}`, `Alliance 2 - ${alliance2Labels}`])
            .enter().append('g')
            .attr('transform', (d, i) => `translate(0,${i * 20})`);

        legend.append('rect')
            .attr('x', width - 19)
            .attr('width', 19)
            .attr('height', 19)
            .attr('fill', (d, i) => i === 0 ? 'steelblue' : 'orange');

        legend.append('text')
            .attr('x', width - 24)
            .attr('y', 9.5)
            .attr('dy', '0.32em')
            .text(d => d);
    }
});
