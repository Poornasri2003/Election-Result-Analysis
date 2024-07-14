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
        if (alliance1Data.length === 0 && alliance2Data.length === 0) {
            return null;
        }

        return {
            alliance1: aggregateVotesByWard(alliance1Data),
            alliance2: aggregateVotesByWard(alliance2Data),
        };
    }

    // Aggregate votes by ward
    function aggregateVotesByWard(data) {
        const aggregatedData = {};

        data.forEach(row => {
            const { ward, votes } = row;

            if (!aggregatedData[ward]) {
                aggregatedData[ward] = 0;
            }

            aggregatedData[ward] += votes;
        });

        return aggregatedData;
    }

    // Render chart using D3.js
    function renderChart(data) {
        // Clear previous chart
        const existingSvg = document.querySelector('#chart svg');
        if (existingSvg) {
            existingSvg.remove();
        }

        const margin = { top: 20, right: 20, bottom: 100, left: 150 }; // Adjust left margin for ward names
        const width = 1000 - margin.left - margin.right; // Adjust width
        const height = 500 - margin.top - margin.bottom;

        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const wards = Array.from(new Set([
            ...Object.keys(data.alliance1),
            ...Object.keys(data.alliance2)
        ]));

        const x = d3.scaleBand()
            .domain(wards)
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max([
                ...Object.values(data.alliance1),
                ...Object.values(data.alliance2)
            ])])
            .nice()
            .range([height, 0]);

        svg.append('g')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(x))
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .style('text-anchor', 'end');

        svg.append('g')
            .call(d3.axisLeft(y));

        const tooltip = d3.select('#chart')
            .append('div')
            .attr('class', 'tooltip')
            .style('opacity', 0);

        const barWidth = x.bandwidth() / 2;

        svg.selectAll('.bar1')
            .data(Object.entries(data.alliance1))
            .enter()
            .append('rect')
            .attr('class', 'bar1')
            .attr('x', d => x(d[0]))
            .attr('y', d => y(d[1]))
            .attr('width', barWidth)
            .attr('height', d => height - y(d[1]))
            .attr('fill', 'steelblue')
            .on('mouseover', function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`Party: Alliance 1<br>Ward: ${d[0]}<br>Votes: ${d[1]}`)
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function() {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        svg.selectAll('.bar2')
            .data(Object.entries(data.alliance2))
            .enter()
            .append('rect')
            .attr('class', 'bar2')
            .attr('x', d => x(d[0]) + barWidth)
            .attr('y', d => y(d[1]))
            .attr('width', barWidth)
            .attr('height', d => height - y(d[1]))
            .attr('fill', 'orange')
            .on('mouseover', function(event, d) {
                tooltip.transition()
                    .duration(200)
                    .style('opacity', .9);
                tooltip.html(`Party: Alliance 2<br>Ward: ${d[0]}<br>Votes: ${d[1]}`)
                    .style('left', (event.pageX + 5) + 'px')
                    .style('top', (event.pageY - 28) + 'px');
            })
            .on('mouseout', function() {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });

        const legend = svg.append('g')
            .attr('class', 'legend')
            .attr('transform', `translate(${width - 120}, 20)`);

        legend.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', 'steelblue');

        legend.append('text')
            .attr('x', 24)
            .attr('y', 9)
            .attr('dy', '.35em')
            .text('Alliance 1');

        legend.append('rect')
            .attr('x', 0)
            .attr('y', 24)
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', 'orange');

        legend.append('text')
            .attr('x', 24)
            .attr('y', 33)
            .attr('dy', '.35em')
            .text('Alliance 2');
    }
});
