//Récupérer données API
function showListPokemon(list) {
    list.forEach(element => {
        showPokemon(element)
    });
}

function showPokemon(pokemon) {

    //Cibler
    let cible = document.getElementById("listPokemon");

    //Cibler name
    let name = JSON.stringify(pokemon.name);

    console.log(name);

    let objectName = JSON.parse(name);

    let PokeName = objectName["fr"];

    //Cibler Sprites
    let sprites = JSON.stringify(pokemon.sprites);

    let objectSprites = JSON.parse(sprites);

    let PokeSprites = objectSprites["regular"];

    //Créer le contenu
    let contenu = `<div class='cards'>`+
    `<p class="Pokemon"> n°`+ pokemon.pokedexId +`
    </br>`+ pokemon.generation +`e Génération
    </br> Nom :`+ PokeName +`</p>
    </br>
    <img
    class="imgPoke"
    src="`+ PokeSprites +`"
    alt="Image de `+ PokeName +`" />`+`</div>`;

    //Ajouter le contenu dans la cible
    cible.innerHTML = cible.innerHTML + contenu;

}

fetch('https://tyradex.vercel.app/api/v1/pokemon')
.then((response) => response.json())
.then((listPokemon) => showListPokemon(listPokemon));
