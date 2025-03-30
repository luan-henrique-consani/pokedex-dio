const pokemonOl = document.getElementById('pokemonList');
const loadMore = document.getElementById('loadMore');
const limit = 6;
let offset = 0;
const maxRecords = 151;


function loadPokemon(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemonsList = []) => {
        pokemonOl.innerHTML += pokemonsList.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${String(pokemon.id).padStart(3, '0')}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" alt="${pokemon.name}">
                </div>
            </li>
        `).join('');
    })
}
loadPokemon(offset, limit);
loadMore.addEventListener('click', () => {
    offset += limit;
    
    const qtdRecordsNextPage = offset + limit;

    if(qtdRecordsNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemon(offset, newLimit);
        loadMore.parentElement.removeChild(loadMore);
    }else{
        loadPokemon(offset, limit);
    }
    
});
