const eventNames = {
  "222": "2x2x2",
  "333": "3x3x3",
  "444": "4x4x4",
  "555": "5x5x5",
  "666": "6x6x6",
  "777": "7x7x7",
  "333bf": "3x3x3 Blindfolded",
  "333oh": "3x3x3 One-Handed",
  "333fm": "3x3x3 Fewest Moves",
  "333ft": "3x3x3 With Feet",
  "clock": "Clock",
  "minx": "Megaminx",
  "pyram": "Pyraminx",
  "skewb": "Skewb",
  "sq1": "Square-1",
  "444bf": "4x4x4 Blindfolded",
  "555bf": "5x5x5 Blindfolded",
  "333mbf": "3x3x3 Multi-Blind",
  "333mbo": "3x3x3 Multi-Blind Old",
  "magic": "Rubik's Magic",
  "mmagic": "Master Magic"
};


async function fetchData() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/rank/world/single/333.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById('output').textContent = 'Loading Data, Please Wait...';
        if (!data.items || data.items.length === 0) {
            document.getElementById('output').textContent = 'No competitors found.';
            return;
        }

        const ul = document.createElement('ul');

        for (const person of data.items.slice(0, 50)) { // limit to top 50 for performance
            const name = await fetchPersonName(person.personId);

            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${person.rank?.world ?? 'N/A'}</strong>
                <a href="person.html?id=${person.personId}"><strong>${name}</strong></a><br>
                <strong>Event:</strong> ${eventNames[person.eventId] || person.eventId}<br>
                <strong>Best Single:</strong> ${(person.best / 100).toFixed(2)} seconds<br>
                <strong>World Rank:</strong> ${person.rank?.world ?? 'N/A'}
                <strong>Continent Rank:</strong> ${person.rank?.continent ?? 'N/A'}
                <strong>National Rank:</strong> ${person.rank?.country ?? 'N/A'}
            `;
            ul.appendChild(li);
        }

        const output = document.getElementById('output');
        output.textContent = '';
        output.appendChild(ul);
    } catch (error) {
        console.error('Fetch error:', error);
        document.getElementById('output').textContent = 'Failed to load data.';
    }
}

async function fetchPersonName(personId) {
    const url = `https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${personId}.json`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        return data.name || personId;
    } catch (error) {
        console.error('Fetch error:', error);
        return personId;
    }
}


function cleardata() {
    document.getElementById('output').textContent = 'Cleared.';
    return;
}

document.querySelectorAll('.dropdown-content a').forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();

    switch (this.textContent.trim()) {
      case 'Link 1':
        console.log("You clicked LInk 1");
        break;
      case 'Link 2':
        console.log('You clicked Link 2');
        break;
      case 'Link 3':
        console.log('You clicked Link 3');
        break;
    }
  });
});

const clearDataBtn = document.querySelector('.clear');

clearDataBtn.addEventListener("click", () => (
    cleardata()
));

fetchData();