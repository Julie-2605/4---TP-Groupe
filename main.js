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





//FONCTIONS RÉCUPÉRATION DES DONNÉES DES POKEMON UTILISÉS
//Cibler name
function getPokemonName(pokemon) {
    let name = JSON.stringify(pokemon.name);

    let objectName = JSON.parse(name);

    return objectName["fr"];
}

//Cibler Sprites
function getPokemonSprites(pokemon) {

    let sprites = JSON.stringify(pokemon.sprites);

    let objectSprites = JSON.parse(sprites);

    return objectSprites["regular"];
}

//Cibler Types
function getPokemonTypes(pokemon) {

    let types = JSON.stringify(pokemon.types);

    let objectTypes = JSON.parse(types);

    let AllTypes = " ";

    for (let i = 0; i < objectTypes.length; i++) {
        AllTypes = AllTypes + objectTypes[i]["name"] + ` `;
    }

    return AllTypes;
}

//Cibler EvolutionsPre
function getPokemonEvolutionsPre(pokemon) {
    let evolutions = JSON.stringify(pokemon.evolution);

    let objectEvolutions = JSON.parse(evolutions);

    // Cibler Évolution Précédente
    if (objectEvolutions && objectEvolutions["pre"] !== null) {
        let EvolutionPreTab = objectEvolutions["pre"];

        let EvolutionPokeName = EvolutionPreTab[0]["name"];

        console.log('Evolution Pre' + EvolutionPokeName);

        return EvolutionPreTab;
    }

}

//Cibler EvolutionsNext
function getPokemonEvolutionsNext(pokemon) {
    let evolutions = JSON.stringify(pokemon.evolution);

    let objectEvolutions = JSON.parse(evolutions);

    if (objectEvolutions && objectEvolutions["next"] !== null) {
        let EvolutionNextTab = objectEvolutions["next"];

        let EvolutionPokeName = EvolutionNextTab[0]["name"];

        console.log('Evolution Next' + EvolutionPokeName);

        return EvolutionNextTab;
    }
}

//LISTE DE POKEMON
function showPokemon(pokemon) {

    //Cibler
    let cible = document.getElementById("listPokemon");

    //Cibler name
    let PokeName = getPokemonName(pokemon);

    //Cibler Sprites
    let PokeSprites = getPokemonSprites(pokemon);

    //Cibler Types
    let PokeTypes = getPokemonTypes(pokemon);

    //Créer le contenu

   

    let contenu = `
        <article class="PokemonCard" onclick="showPokeDetails(`+ pokemon.pokedexId + `)">
            <p class="infos" > n°`+ pokemon.pokedexId + `
            </br> Nom : `+ PokeName + `
            </br> Type : `+ PokeTypes + `
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
    let PokeName = getPokemonName(pokemon);

    //Cibler Sprites
    let PokeSprites = getPokemonSprites(pokemon);

    //Cibler Types
    let PokeTypes = getPokemonTypes(pokemon);

    //Cibler Evolution
    let EvolutionPre = getPokemonEvolutionsPre(pokemon);

    let EvolutionNext = getPokemonEvolutionsNext(pokemon);

    console.log(EvolutionNext);

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
        <button class="Evolutions" type="button" onclick="EvolutionAnt()"> < `+ EvolutionPre[0]["name"] +`</button>
        <button class="Evolutions" type="button" onclick="EvolutionPrec()"> `+ EvolutionNext[0]["name"] +` > </button>
        </br>
        <button class="goBack" type="button" onclick="goBack()">Retourner à la liste</button>`;

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

