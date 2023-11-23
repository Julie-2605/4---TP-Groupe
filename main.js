//LISTE GENERATION
function showListGeneration(list) {
    list.forEach(element => {
        showGeneration(element)
    });
}


//AFFICHAGE DES BUTTONS GÉNÉRATIONS
function showGeneration(Generation) {
    let cible = document.getElementById("Generation");

    let contenu = `
    <button class="buttonGeneration" type="button" onclick="returnGeneration(`+ Generation.generation + `)"> Génération ` + Generation.generation + `</button>
    `;

    cible.innerHTML = cible.innerHTML + contenu;
}

//Récupérer données API POUR AFFICHER LES BUTTONS GÉNÉRATION
fetch('https://tyradex.vercel.app/api/v1/gen')
    .then((response) => response.json())
    .then((listPokemon) => showListGeneration(listPokemon));


//LISTE DE POKEMON
function showPokemon(pokemon) {

    //Cibler
    let cible = document.getElementById("listPokemon");

    //Cibler name
    let name = JSON.stringify(pokemon.name);

    let objectName = JSON.parse(name);

    let PokeName = objectName["fr"];

    //Cibler Sprites
    let sprites = JSON.stringify(pokemon.sprites);

    let objectSprites = JSON.parse(sprites);

    let PokeSprites = objectSprites["regular"];

    //Cibler Types
    let types = JSON.stringify(pokemon.types);

    let objectTypes = JSON.parse(types);

    console.log(objectTypes);

    // for (let i = 0; i >= objectTypes.length; i++) {
    //     let PokeTypes = PokeTypes + objectTypes[i]["name"];
    //     return PokeTypes;
    // }


    //Créer le contenu
    let contenu = `
        <article class="PokemonCard" onclick="showPokeDetails(`+ pokemon.pokedexId + `)">
            <p> n°`+ pokemon.pokedexId + `
            </br> Nom : `+ PokeName + `
            </p>
            </br>
            <img
            class="imgPoke"
            src="`+ PokeSprites + `"
            alt="Image de `+ PokeName + `" />
        </article>`;

    //Ajouter le contenu dans la cible
    cible.innerHTML = cible.innerHTML + contenu;

}

//RETOUR DU NUMÉRO DE LA GÉNÉRATION
function returnGeneration(NumberGen) {

    //LISTE POKEMON PAR GENERATION
    function showListPokemon(list) {

        list.forEach(element => {
            showPokemon(element)
        });

    }

    //Récupérer données API
    fetch('https://tyradex.vercel.app/api/v1/gen/' + NumberGen)
        .then((response) => response.json())
        .then((listPokemon) => showListPokemon(listPokemon));
}

//POKEMON DETAILS

async function showPokeDetails(PokeID) {

    let response = await fetch('https://tyradex.vercel.app/api/v1/pokemon/' + PokeID);
    let pokemon = await response.json();

    //Cibler name
    let name = JSON.stringify(pokemon.name);

    let objectName = JSON.parse(name);

    let PokeName = objectName["fr"];

    //Cibler Sprites
    let sprites = JSON.stringify(pokemon.sprites);

    let objectSprites = JSON.parse(sprites);

    let PokeSprites = objectSprites["regular"];

    //Cibler Types
    let types = JSON.stringify(pokemon.types);

    let objectTypes = JSON.parse(types);

    console.log(objectTypes);

    let PokeTypes = objectTypes[0]["name"];

    let Evolution = JSON.stringify(pokemon.evolution);

    console.log(Evolution);

    let objectEvolution = JSON.parse(Evolution);

    console.log(objectEvolution);

    let PokeEvolution = objectEvolution["next"]["pokedexId"];


    let contenu = `
        <article>
        <p>n°`+ pokemon.pokedexId + `
        </br>`+ pokemon.generation + `e Génération
        </br> Nom : `+ PokeName + `
        </br> Type : `+ PokeTypes + `
        </p>
        </br>
        <img
        class="imgPoke"
        src="`+ PokeSprites + `"
        alt="Image de `+ PokeName + `" />
        </article>
        <button class="Evolutions" type="button" onclick="EvolutionAnt()"> < </button>
        <button class="Evolutions" type="button" onclick="EvolutionPrec()"> > </button>
        </br>
        <button class="goBack" type="button" onclick="goBack()">Retourner à la liste</button>
        <p>TEST :`+ PokeEvolution + `</p>`;

    $("#PokeDetails").html(contenu);
    $("#listPokemon").hide();
    $("#PokeDetails").show();
}
//REVENIR EN ARRIÈRE SUR LA LISTE
function goBack() {
    $("#PokeDetails").hide();
    $("#listPokemon").show();
}




//POKEMON RANDOM
async function getRandomPokemon() {
    let response = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
    let listAllPokemon = await response.json();

    let RandomId = Math.floor(Math.random() * listAllPokemon.length) + 1;

    let PokeRandom = listAllPokemon[RandomId];
    console.log(PokeRandom);

    return PokeRandom;

}

getRandomPokemon()
    .then((PokeRandom) => {
        let contenu = showPokemon(PokeRandom);
        $("#PokeRandom").html(contenu);
    });



//LISTE PAR TYPE
function showListTypes(list) {
    list.forEach(element => {
        showTypes(element)
    });
}

//TYPES DETAILS

function showListDetails() {

}

