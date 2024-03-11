
async function searchCharacter(name) {
    try {
        const response = await fetch('https://graphql.anilist.co', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query ($search: String) {
                        Page {
                            characters(search: $search) {
                                id
                                name {
                                    full
                                }
                                image {
                                    large
                                }
                                description
                            }
                        }
                    }
                `,
                variables: {
                    search: name,
                },
            }),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data.data.Page.characters;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

function displayResults(characters) {
    const resultsSection = document.getElementById('results-section');
    resultsSection.innerHTML = '';
    characters.forEach(character => {
        const result = document.createElement('div');
        result.classList.add('result');

        const name = document.createElement('h3');
        name.textContent = character.name.full;

        const image = document.createElement('img');
        image.src = character.image.large;
        image.alt = character.name.full;

        const description = document.createElement('p');
        description.textContent = character.description;

        result.appendChild(name);
        result.appendChild(image);
        result.appendChild(description);
        
        resultsSection.appendChild(result);
    });
}

const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const searchTerm = document.getElementById('search-input').value.trim();
    if (searchTerm !== '') {
        const characters = await searchCharacter(searchTerm);
        displayResults(characters);
    }
});
