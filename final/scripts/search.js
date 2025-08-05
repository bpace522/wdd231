document.addEventListener("DOMContentLoaded", function() {
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

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const searchQuery = params.get('search');

  setupSearchForm();
  
  if (id) {
    loadPersonDetails(id);
  } else if (searchQuery) {
    performSearch(searchQuery);
  } else {
    document.getElementById('search-container').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('person-container').style.display = 'none';
  }

  function loadPersonDetails(id) {
    document.getElementById('search-container').style.display = 'block';
    document.getElementById('results-container').style.display = 'none';
    document.getElementById('person-container').style.display = 'block';
    
    document.getElementById('loading-indicator').style.display = 'block';
    
    fetch(`https://raw.githubusercontent.com/robiningelbrecht/wca-rest-api/master/api/persons/${id}.json`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        document.getElementById('loading-indicator').style.display = 'none';
        
        document.getElementById('person-name').textContent = data.name || 'Unknown';
        document.getElementById('person-id').textContent = data.id || 'Unknown';
        document.getElementById('person-country').textContent = data.country || 'Unknown';
        document.getElementById('person-gender').textContent = data.gender || 'Not specified';
        
        const competitionsCount = data.numberOfCompetitions || (data.competitionIds ? data.competitionIds.length : 'Unknown');
        document.getElementById('person-comps').textContent = competitionsCount;

        const tbody = document.getElementById('record-body');
        tbody.innerHTML = '';

        if (data.results && Object.keys(data.results).length > 0) {
          const personalRecords = {};
          
          Object.values(data.results).forEach(competition => {
            Object.entries(competition).forEach(([eventId, rounds]) => {
              if (!Array.isArray(rounds)) return;
              
              if (!personalRecords[eventId]) {
                personalRecords[eventId] = {
                  eventId: eventId,
                  single: { best: null },
                  average: { best: null }
                };
              }
              
              rounds.forEach(round => {
                if (round.best && round.best > 0) {
                  if (!personalRecords[eventId].single.best || round.best < personalRecords[eventId].single.best) {
                    personalRecords[eventId].single.best = round.best;
                  }
                }
                
                if (round.average && round.average > 0) {
                  if (!personalRecords[eventId].average.best || round.average < personalRecords[eventId].average.best) {
                    personalRecords[eventId].average.best = round.average;
                  }
                }
                
                if (round.solves && Array.isArray(round.solves)) {
                  round.solves.forEach(solve => {
                    if (solve > 0) {
                      if (!personalRecords[eventId].single.best || solve < personalRecords[eventId].single.best) {
                        personalRecords[eventId].single.best = solve;
                      }
                    }
                  });
                }
              });
            });
          });
          
          const recordsArray = Object.values(personalRecords);
          recordsArray.sort((a, b) => a.eventId.localeCompare(b.eventId));
          
          if (recordsArray.length > 0) {
            recordsArray.forEach(record => {
              const row = document.createElement('tr');
              
              const formatTime = (timeObj) => {
                if (!timeObj || !timeObj.best || timeObj.best <= 0) return 'N/A';
                
                const time = timeObj.best;
                
                if (time === -1) return 'DNF';
                
                if (time >= 6000) {
                  const minutes = Math.floor(time / 6000);
                  const seconds = Math.floor((time % 6000) / 100);
                  const centiseconds = time % 100;
                  return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
                }
                
                return (time / 100).toFixed(2) + 's';
              };

              const best = formatTime(record.single);
              const average = formatTime(record.average);

              row.innerHTML = `
                <td>${eventNames[record.eventId] || record.eventId}</td>
                <td>${best}</td>
                <td>${average}</td>
              `;
              tbody.appendChild(row);
            });
          } else {
            tbody.innerHTML = '<tr><td colspan="3">No personal records found</td></tr>';
          }
        } else {
          tbody.innerHTML = '<tr><td colspan="3">No competition results available</td></tr>';
        }
      })
      .catch(error => {
        document.getElementById('loading-indicator').style.display = 'none';
        console.error("Error fetching person:", error);
        document.getElementById('person-name').textContent = "Failed to load person info.";
        
        const errorElement = document.getElementById('error-message');
        if (errorElement) {
          errorElement.textContent = `Error: ${error.message}`;
          errorElement.style.display = 'block';
        }
      });
  }

  function setupSearchForm() {
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
      searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        const query = searchInput.value.trim();
        
        if (query) {
          const url = new URL(window.location.href);
          url.searchParams.set('search', query);
          window.history.pushState({}, '', url);
          
          performSearch(query);
        }
      });
    }
  }

  function performSearch(query) {
    document.getElementById('search-container').style.display = 'block';
    document.getElementById('results-container').style.display = 'block';
    document.getElementById('person-container').style.display = 'none';
    
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = '<p>Searching...</p>';
    
    if (/^\d{4}[A-Za-z]{4}\d{2}$/.test(query)) {
      loadPersonDetails(query);
      return;
    } else {
      resultsContainer.innerHTML = '<p>Please enter a valid WCA ID (format: 2023GENG02). Name search is not supported.</p>';
      return;
    }
  }
});