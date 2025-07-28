// fetch('https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/2008/01.json')
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//     })

function fetchData() {
    fetch('https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/competitions/2008.json')
        .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
        })
        .then(data => {
        if (!data.items || data.items.length === 0) {
            document.getElementById('output').textContent = 'No competitions found.';
            return;
        }

        const ul = document.createElement('ul');

        data.items.forEach(comp => {
            const li = document.createElement('li');
            li.innerHTML = `
            <strong>${comp.name}</strong> — ${comp.city}, ${comp.country}<br>
            Dates: ${comp.date.from} to ${comp.date.till}<br>
            Venue: ${comp.venue.name}<br>
            Info: ${comp.information || 'No additional info.'}
            `;
            ul.appendChild(li);
        });

        const output = document.getElementById('output');
        output.textContent = '';
        output.appendChild(ul);
        })
        .catch(error => {
        console.error('Fetch error:', error);
        document.getElementById('output').textContent = 'Failed to load data.';
        });
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
        fetchData();
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