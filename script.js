document.addEventListener('DOMContentLoaded', () => {
    const partiesList = [
        // Your list of parties here...
        'dravidamunnetrakazhagam', 'kongunadumakkaldesiakkatchi', 'indiannationalcongress',
        'communistpartyofindia', 'communistpartyofindiamarxist', 'viduthalaichiruthaigalkatchi',
        'indianunionmuslimleague', 'marumalarchidravidamunnetrakazhagam',
        'allindiaannadravidamunnetrakazhagam', 'puthiyatamilagam', 'socialdemocraticpartyofindia',
        'desiyamurpokkudravidakazhagam', 'bharatiyajanataparty', 'indhiyajananayagakatchi',
        'inthiyamakkalkalvimunnetrakazhagam', 'puthiyaneedhikatchi', 'tamizhagamakkalmunnetrakazhagam',
        'pattalimakkalkatchi', 'tamilmaaniliacongressmoopanar', 'ammamakkalmunnettrakzagam',
        'bahujansamajparty', 'naamtamilarkatchi', 'naadaalummakkalkatchi', 'desiyamakkalsakthikatchi',
        'veeraththiyagivishwanatadhossthozhhialalarkalkkatchi', 'ganasangampartyofindia', 'bahujandravidaparty',
        'thakkamkatchi', 'virokevirindianparty', 'annamgrdravidamakkalkalgam', 'aravoormunnetrakazhagam',
        'samaniyamakkalnanalakatchi', 'bharatiyaprajaaikyataparty', 'puthiyamakkalttamilddesamkatchi',
        'tamizhhagamurpokkumakkalkatchi', 'ulzaipalimakkalkatchy', 'unitedrepublicanpartyofindia',
        'aanaithinthiyajananayakapathukappukazhagam', 'allindiajananayakamakkalkazhagam', 'ambedkariteepartyofindia',
        'annapuratchithalaivarammadravidamunnetrakazhagam', 'chennaiyouthparty', 'dhesiyamakkalkazhagam',
        'jebamaniijanata', 'mahathamamakkalmunnetrakazhakam', 'rashtriyasamajpaksha',
        'socialistunitycentreofinddiacommunist', 'tamilagamakkalthannurimaikatchi', 'tamilarmakkalkatchi',
        'tamilmanilamurpokkudravidakazhagam', 'ahimsasocialistparty', 'allindiauzhavargaluzhaippalargalkatchi',
        'allindiayouthdevelopmentparty', 'anaithuindiamakkalkatchi', 'annamakkalkatchi', 'hindhusamajparty',
        'hindustanjantaparty', 'humanityforpeaceparty', 'karunaaduparty', 'makkalnanalakazhagam', 'makkalnnalvaazhvukkatchi',
        'naamindiiarparty', 'namindianaamindiiyarkatchi', 'nationalmhahasabhaparty', 'newgenerationpeoplesparty',
        'punnagaidesamparty', 'republicanpartyofindiasivaraj', 'tamilagamakkalnanalakatchi', 'tipusultanparty',
        'vidiyalaithedumiindhiyargalparty', 'vidhuthalaikkalamkatchi', 'veeraththiyagiviswanathadossthozhilalarkalkkatchi',
        'anticorruptiondynamicparty', 'tamilnadumakkalnalvazhvuperiyakkam', 'socialistunitycentreOfindiacommunist',
        'jebamanijanata', 'mahathmamakkalmunnetrakazhakam', 'aravormunnetrakazhagam', 'tamizhagamurpokkumakkalkatchi',
        'nationalmahasabhaparty', 'tamilmaanilacongressmoopanar', 'samaniyamakkalnalakatchi', 'vidhuthalaikkalamkatchi',
        'ambedkariteepartyofindia', 'newgenerationpeoplesparty', 'puthiyamakkaltamildesamkatchi', 'vidiyalaithedumiindhiyargalparty',
        'ammamakkalmunnettrakazagam', 'naamindiiarparty', 'makkalnnalvaazhvukkatchi', 'namindianaamindiyarkatchi',
        'makkalnanalakazhagam', 'hindhusamajparty', 'tamilagamakkalnanalakatchi', 'allindiapeopledevelopmentparty',
        'socialisunitycentreofindiacommunist', 'viduthalaikalamkatchi', 'ambedkaritepartyofindia', "newgenerationpeople'sparty",
        'puthiyamakkalttamilddesamkatchi', 'vidiyalaithedumindhiyargalparty', 'naamindiarparty', 'makkalnalvaazhvukkatchi',
        'makkalnalakazhagam', 'hindusamajparty', 'tamilagamakkalnalakatchi'
    ];

    // Populate party list
    const draggableParties = document.getElementById('draggableParties');
    partiesList.forEach(party => {
        const partyDiv = document.createElement('div');
        partyDiv.className = 'draggable';
        partyDiv.textContent = party;
        partyDiv.draggable = true;
        partyDiv.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', event.target.textContent);
        });
        draggableParties.appendChild(partyDiv);
    });

    // Event listeners for drop zones
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

    // Submit button listener
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
        const filteredData = data.map(row => ({
            ward: row.ward.replace(/\s|\(|\)/g, '').toLowerCase(),
            party: row.party.replace(/\s/g, '').toLowerCase(),
            votes: parseInt(row.votes, 10)
        }));

        const alliance1Data = filteredData.filter(row => alliance1Parties.includes(row.party));
        const alliance2Data = filteredData.filter(row => alliance2Parties.includes(row.party));

        if (alliance1Data.length === 0 || alliance2Data.length === 0) return null;

        const wards = [...new Set(filteredData.map(row => row.ward))];
        const alliance1Votes = wards.map(ward => alliance1Data.filter(row => row.ward === ward).reduce((sum, row) => sum + row.votes, 0));
        const alliance2Votes = wards.map(ward => alliance2Data.filter(row => row.ward === ward).reduce((sum, row) => sum + row.votes, 0));

        return { wards, alliance1Votes, alliance2Votes, alliance1Labels: alliance1Parties.join(', '), alliance2Labels: alliance2Parties.join(', ') };
    }

    // Render chart using D3.js
    function renderChart({ wards, alliance1Votes, alliance2Votes, alliance1Labels, alliance2Labels }) {
        d3.select('#chart').html('');  // Clear previous chart

        const width = 800;  // Adjusted width for a more centered appearance
        const height = 500;
        const margin = { top: 20, right: 20, bottom: 50, left: 50 };

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
            .attr('y', height + margin.top + 20)
            .attr('text-anchor', 'middle')
            .text('Wards');

        svg.append('text')
            .attr('x', -height / 2)
            .attr('y', -margin.left + 20)
            .attr('transform', 'rotate(-90)')
            .attr('text-anchor', 'middle')
            .text('Votes');

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', -10)
            .attr('text-anchor', 'middle')
            .style('font-size', '1.5em')
            .text('2024 Election Results');

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.top + 40)
            .attr('text-anchor', 'middle')
            .style('font-size', '0.8em')
            .text(`Alliance 1: ${alliance1Labels}`);

        svg.append('text')
            .attr('x', width / 2)
            .attr('y', height + margin.top + 60)
            .attr('text-anchor', 'middle')
            .style('font-size', '0.8em')
            .text(`Alliance 2: ${alliance2Labels}`);

        svg.selectAll('.bar1, .bar2')
            .transition()
            .duration(1000)
            .attr('y', d => y(d))
            .attr('height', d => height - y(d));

        svg.selectAll('text')
            .transition()
            .duration(1000);

        // Animate axis
        svg.select('.x.axis')
            .transition()
            .duration(1000)
            .call(xAxis);

        svg.select('.y.axis')
            .transition()
            .duration(1000)
            .call(yAxis);

        const chartContainer = document.querySelector('.chart-container');
        chartContainer.scrollIntoView({ behavior: 'smooth' });
    }
});
