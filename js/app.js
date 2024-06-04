const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
let searchPokemon = 1;

// chamar a api
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status == 200 ) {
        const data = await APIResponse.json();
        return data;
    } else {
        pokemonName.innerHTML = ('Not found!');
        pokemonNumber.innerHTML = ('404');
        pokemonImage.src = ("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif");
        input.value = '';
    }
}

// recuperar dados do pokemon
const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = ('Loading...');
    pokemonNumber.innerHTML = ('');

    const data = await fetchPokemon (pokemon);

    // mostrar dados do pokemon
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    searchPokemon = data.id;
}

// qual pokemon recuperar
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// botão preview/next
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon (searchPokemon);