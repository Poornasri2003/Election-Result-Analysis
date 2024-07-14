document.addEventListener('DOMContentLoaded', () => {
    const partiesList = [
        // Your list of parties here...
        'Naadaalum Makkal Katchi',
        'Jebamani Janata',
        'Puthiya Makkal Tamil Desam Katchi',
        'Hindustan Janta Party',
        'Independent',
        'Anti Corruption Dynamic Party',
        'Indian National Congress',
        'Humanity for Peace Party',
        'Tamil Manila Murpokku Dravida Kazhagam',
        'Aravor Munnetra Kazhagam',
        'Bahujan Dravida Party',
        'All India People Development Party',
        'Bahujan Samaj Party',
        'Tamilar Makkal Katchi',
        'Naam Indiar Party',
        'Ahimsa Socialist Party',
        'Veerath Thiyagi Viswanathadoss Thozhilalarkal Katchi',
        'Anna MGR Dravida Makkal Kalgam',
        'Viduthalai Kalam Katchi',
        'Bharatiya Janata Party',
        'Samaniya Makkal Nala Katchi',
        'Viduthalai Chiruthaigal Katchi',
        'Dravida Munnetra Kazhagam',
        'Indian National Congress',
        'Amma Makkal Munnettra Kazagam',
        'Tamilaga Makkal Nala Katchi',
        'Communist Party of India  (Marxist)',
        'Ulzaipali Makkal Katchy',
        'National Maha Sabha Party',
        'Thakkam Katchi',
        'Anna Makkal Katchi',
        'Viro Ke Vir Indian Party',
        'All India Uzhavargal Uzhaippalargal Katchi',
        'Tipu Sultan Party',
        'New Generation Peopleâ€™s Party',
        'Chennai Youth Party',
        'Tamizhaga Murpokku Makkal Katchi',
        'Tamilaga Makkal Thannurimai Katchi',
        'Marumalarchi Dravida Munnetra Kazhagam',
        'Makkal Nala Kazhagam',
        'Hindu Samaj Party',
        'Tamilnadu Makkal Nalvazhvu Periyakkam',
        'United Republican Party of India',
        'Ganasangam Party of India',
        'Pattali Makkal Katchi',
        'Dhesiya Makkal Kazhagam',
        'Anna Puratchi Thalaivar Amma Dravida Munnetra Kazhagam',
        'Bharatiya Praja Aikyata Party',
        'Desiya Murpokku Dravida Kazhagam',
        'Karunaadu Party',
        'Makkal Nalvaazhvuk Katchi',
        'Desiya Makkal Sakthi Katchi',
        'Vidiyalai Thedum Indhiyargal Party',
        'Naam Tamilar Katchi',
        'All India Anna Dravida Munnetra Kazhagam',
        'All India Jananayaka Makkal Kazhagam',
        'Tamil Maanila Congress  (Moopanar)',
        'Republican Party of India  (Sivaraj)',
        'Mahathma Makkal Munnetra Kazhakam',
        'Punnagai Desam Party',
        'Anaithu India Makkal Katchi',
        'Nam India Naam Indiyar Katchi',
        'Rashtriya Samaj Paksha',
        'Aanaithinthiya Jananayaka Pathukappu Kazhagam',
        'Socialist Unity Centre Of India (COMMUNIST)',
        'All India Youth Development Party',
        'Indian Union Muslim League',
        'Communist Party of India',
        'None of the Above',
        'Ambedkarite Party of India',
    ];

    const draggableParties = document.getElementById('draggableParties');

    // Function to populate party list
    function populatePartyList(parties) {
        draggableParties.innerHTML = ''; // Clear previous list

        parties.forEach(party => {
            const partyDiv = document.createElement('div');
            partyDiv.className = 'draggable';
            partyDiv.textContent = party;
            partyDiv.draggable = true;
            partyDiv.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', event.target.textContent);
            });
            draggableParties.appendChild(partyDiv);
        });
    }

    // Initial population of party list
    populatePartyList(partiesList);

    // Search functionality
    document.getElementById('search').addEventListener('input', (event) => {
        const searchText = event.target.value.toLowerCase().trim();

        if (!searchText) {
            // If search is empty, show all parties
            populatePartyList(partiesList);
        } else {
            const filteredParties = partiesList.filter(party =>
                party.toLowerCase().includes(searchText)
            );
            populatePartyList(filteredParties);
        }
    });

    // Alliance boxes
    const alliance1 = document.getElementById('alliance1');
    const alliance2 = document.getElementById('alliance2');

    function createDraggableParty(partyName) {
        const partyDiv = document.createElement('div');
        partyDiv.className = 'draggable';
        partyDiv.textContent = partyName;
        partyDiv.draggable = true;
        partyDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.textContent);
        });
        partyDiv.addEventListener('dblclick', (event) => {
            event.preventDefault();
            event.target.remove();
        });
        return partyDiv;
    }

    [alliance1, alliance2].forEach(alliance => {
        alliance.addEventListener('dragover', (event) => {
            event.preventDefault();
        });

        alliance.addEventListener('drop', (event) => {
            event.preventDefault();
            const data = event.dataTransfer.getData('text/plain');
            const droppedParty = createDraggableParty(data);
            alliance.appendChild(droppedParty);
        });

        alliance.addEventListener('dblclick', (event) => {
            if (event.target.classList.contains('draggable')) {
                event.target.remove();
            }
        });
    });

    // Reset button
    document.getElementById('reset').addEventListener('click', () => {
        alliance1.innerHTML = '<h3>Alliance 1</h3><span class="placeholder">Drag and drop parties here</span>';
        alliance2.innerHTML = '<h3>Alliance 2</h3><span class="placeholder">Drag and drop parties here</span>';
        chart=document.getElementById('chart');
        chart.innerHTML = '';
    });

    // Submit button
    document.getElementById('submit').addEventListener('click', async () => {
        const alliance1Parties = Array.from(alliance1.children).map(child => child.textContent);
        const alliance2Parties = Array.from(alliance2.children).map(child => child.textContent);
        console.log('Alliance 1:', alliance1Parties);
        console.log('Alliance 2:', alliance2Parties);

        try {
            const filePath = '2024_results.csv';
            const data = await fetchCSVData(filePath);
            if (data) {
                const processedData = processCSVData(data, alliance1Parties, alliance2Parties);
                if (processedData) {
                    renderChart(processedData);
                } else {
                    alert('No data found for the selected parties.');
                }
            } else {
                alert('CSV file not found.');
            }
        } catch (error) {
            console.error('Error fetching or processing CSV data:', error);
        }
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
function processCSVData(data, alliance1Parties, alliance2Parties) {
    // Format alliance party names for matching
    const formattedAlliance1Parties = alliance1Parties.map(party => formatPartyName(party));
    const formattedAlliance2Parties = alliance2Parties.map(party => formatPartyName(party));

    // Format party name function
    function formatPartyName(partyName) {
        return partyName.trim(); // Adjust to your specific formatting needs
    }

    // Filter and process CSV data
    const filteredData = data.map(row => ({
        ward: row.ward.replace(/\s|\(|\)/g, '').toLowerCase(),
        party: formatPartyName(row.party),
        votes: parseInt(row.votes, 10)
    }));

    // Separate data for alliance 1 and alliance 2
    const alliance1Data = filteredData.filter(row => formattedAlliance1Parties.includes(row.party));
    const alliance2Data = filteredData.filter(row => formattedAlliance2Parties.includes(row.party));

    // Check if data exists for both alliances
    if (alliance1Data.length === 0 || alliance2Data.length === 0) {
        return null;
    }

    // Aggregate votes by ward
    const wards = [...new Set(filteredData.map(row => row.ward))];
    const alliance1Votes = wards.map(ward => alliance1Data.filter(row => row.ward === ward).reduce((sum, row) => sum + row.votes, 0));
    const alliance2Votes = wards.map(ward => alliance2Data.filter(row => row.ward === ward).reduce((sum, row) => sum + row.votes, 0));

    // Remove placeholder text from labels
    const alliance1Labels = alliance1Parties.filter(party => party !== "Drag and drop parties here and to remove Double click");
    const alliance2Labels = alliance2Parties.filter(party => party !== "Drag and drop parties here and to remove Double click");

    // Return processed data
    return {
        wards,
        alliance1Votes,
        alliance2Votes,
        alliance1Labels,
        alliance2Labels
    };
}

// Render chart using D3.js
function renderChart({ wards, alliance1Votes, alliance2Votes, alliance1Labels, alliance2Labels }) {
    d3.select('#chart').html('');

    const width = 800;
    const height = 500;
    const margin = { top: 50, right: 20, bottom: 50, left: 50 };

    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(wards)
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([0, d3.max([...alliance1Votes, ...alliance2Votes])])
        .nice()
        .range([height, 0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);

    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis)
        .selectAll('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-45)');

    svg.append('g')
        .call(yAxis);

    const barWidth = x.bandwidth() / 2;

    svg.selectAll('.bar1')
        .data(alliance1Votes)
        .enter().append('rect')
        .attr('class', 'bar1')
        .attr('x', (d, i) => x(wards[i]) - barWidth / 2)
        .attr('y', d => y(d))
        .attr('width', barWidth)
        .attr('height', d => height - y(d))
        .attr('fill', '#007bff');

    svg.selectAll('.bar2')
        .data(alliance2Votes)
        .enter().append('rect')
        .attr('class', 'bar2')
        .attr('x', (d, i) => x(wards[i]) + barWidth / 2)
        .attr('y', d => y(d))
        .attr('width', barWidth)
        .attr('height', d => height - y(d))
        .attr('fill', '#28a745');

    svg.append('text')
        .attr('x', width / 2)
        .attr('y', -margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '1.5em')
        .text('2024 Election Results');

    function formatLabels(labels, maxWidth) {
        const formattedLabels = [];
        let currentLine = [];

        labels.forEach(label => {
            const testLine = [...currentLine, label].join(', ');
            const testWidth = testLine.length * 7;

            if (testWidth > maxWidth) {
                formattedLabels.push(currentLine.join(', '));
                currentLine = [label];
            } else {
                currentLine.push(label);
            }
        });

        formattedLabels.push(currentLine.join(', '));
        return formattedLabels;
    }

    const formattedAlliance1Labels = formatLabels(alliance1Labels, width / 2);
    const formattedAlliance2Labels = formatLabels(alliance2Labels, width / 2);

    const tooltip = d3.select('#chart')
        .append('div')
        .style('position', 'absolute')
        .style('visibility', 'hidden')
        .style('background', 'rgba(0, 0, 0, 0.7)')
        .style('color', '#fff')
        .style('padding', '5px')
        .style('border-radius', '5px');

    svg.selectAll('.bar1')
        .on('mouseover', (event, d) => {
            tooltip.html(`Alliance 1: ${d}`)
                .style('visibility', 'visible')
                .style('left', `${event.pageX}px`)
                .style('top', `${event.pageY}px`);
        })
        .on('mousemove', event => {
            tooltip.style('left', `${event.pageX}px`)
                .style('top', `${event.pageY}px`);
        })
        .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
        });

    svg.selectAll('.bar2')
        .on('mouseover', (event, d) => {
            tooltip.html(`Alliance 2: ${d}`)
                .style('visibility', 'visible')
                .style('left', `${event.pageX}px`)
                .style('top', `${event.pageY}px`);
        })
        .on('mousemove', event => {
            tooltip.style('left', `${event.pageX}px`)
                .style('top', `${event.pageY}px`);
        })
        .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
        });

    svg.selectAll('.bar1-label')
        .data(alliance1Votes)
        .enter().append('text')
        .attr('class', 'bar1-label')
        .attr('x', (d, i) => x(wards[i]) - barWidth / 2 + barWidth / 2)
        .attr('y', d => y(d) - 5)
        .attr('text-anchor', 'middle')
        .style('fill', '#000')
        .style('font-size', '12px')
        .text(d => d);

    svg.selectAll('.bar2-label')
        .data(alliance2Votes)
        .enter().append('text')
        .attr('class', 'bar2-label')
        .attr('x', (d, i) => x(wards[i]) + barWidth / 2 + barWidth / 2)
        .attr('y', d => y(d) - 5)
        .attr('text-anchor', 'middle')
        .style('fill', '#000')
        .style('font-size', '12px')
        .text(d => d);
}
});
