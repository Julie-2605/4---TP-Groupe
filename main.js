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


//Cibler Evolutions
//Cibler EvolutionsPre Name
function getEvolutionsPreName(pokemon) {
    let evolutions = JSON.stringify(pokemon.evolution);

    let objectEvolutions = JSON.parse(evolutions);

    // Cibler Évolution Précédente
    if (objectEvolutions && objectEvolutions["pre"] !== null) {
        let EvolutionPreTab = objectEvolutions["pre"];

        let EvolutionPreName = EvolutionPreTab[EvolutionPreTab.length - 1]["name"];

        return EvolutionPreName;
    }

}

//Cibler EvolutionsPre PokedexID
function getEvolutionsPreID(pokemon) {
    let evolutions = JSON.stringify(pokemon.evolution);

    let objectEvolutions = JSON.parse(evolutions);

    // Cibler Évolution Précédente
    if (objectEvolutions && objectEvolutions["pre"] !== null) {
        let EvolutionPreTab = objectEvolutions["pre"];

        let EvolutionPreID = EvolutionPreTab[EvolutionPreTab.length - 1]["pokedexId"];

        return EvolutionPreID;
    }

}

//Cibler EvolutionsNext Name
function getEvolutionsNextName(pokemon) {
    let evolutions = JSON.stringify(pokemon.evolution);

    let objectEvolutions = JSON.parse(evolutions);

    if (objectEvolutions && objectEvolutions["next"] !== null) {
        let EvolutionNextTab = objectEvolutions["next"];

        let EvolutionNexteName = EvolutionNextTab[0]["name"];

        return EvolutionNexteName;
    }
}

//Cibler EvolutionsNext PokedexID
function getEvolutionsNextID(pokemon) {
    let evolutions = JSON.stringify(pokemon.evolution);

    let objectEvolutions = JSON.parse(evolutions);

    if (objectEvolutions && objectEvolutions["next"] !== null) {
        let EvolutionNextTab = objectEvolutions["next"];

        let EvolutionNextID = EvolutionNextTab[0]["pokedexId"];

        return EvolutionNextID;
    }
}

//Accès Evolutions Button
async function EvolutionPre(EvolutionPreID) {
    showPokeDetails(EvolutionPreID);
}

async function EvolutionNext(EvolutionNextID) {
    showPokeDetails(EvolutionNextID);
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
    let cible = document.getElementById("listPokemon");
    cible.innerHTML = " ";

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
    let EvolutionPreName = getEvolutionsPreName(pokemon);

    let EvolutionNextName = getEvolutionsNextName(pokemon);

    let EvolutionPreID = getEvolutionsPreID(pokemon);

    let EvolutionNextID = getEvolutionsNextID(pokemon);

    let contenu = `
        <article class="PokemonCard">
        <p class="infos">n°`+ pokemon.pokedexId + `
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
        <button class="Evolutions" type="button" onclick="EvolutionPre(`+ EvolutionPreID + `)"> < ` + EvolutionPreName + `</button>
        <button class="Evolutions" type="button" onclick="EvolutionNext(`+ EvolutionNextID + `)"> ` + EvolutionNextName + ` > </button>
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




//LISTE PAR TYPE
function showListTypes(list) {
    list.forEach(element => {
        showTypes(element)
    });
}

//TYPES DETAILS

function showListDetails() {
    let cible = document.getElementById("Types");

    let contenu = `
    <button class="buttonTypes" type="button" onclick="returnTypes(`+ Types.generation + `)"> Génération ` + Types.generation + `</button>
    `;

    cible.innerHTML = cible.innerHTML + contenu;
}



function showListTypes(list) {
    list.forEach(element => {
        showTypes(element)
    });
}


//AFFICHAGE DES BUTTONS GÉNÉRATIONS
function showTypes(Type) {
    let cible = document.getElementById("Types");

    let TypeName = JSON.stringify(Type.name);

    let objectTypeName = JSON.parse(TypeName);

    TypeName = objectTypeName["fr"];

    let contenu = `
    <button class="buttonGeneration" type="button" onclick="returnType(`+ Type.id + `)"> Types ` + TypeName + ` <img src="` + Type.sprites + `"/></button>
    `;

    cible.innerHTML = cible.innerHTML + contenu;
}

//ABANDON
function returnType(TypeName) {
    let cible = document.getElementById("listPokemon");
    cible.innerHTML = " ";

        //LISTE POKEMON PAR GENERATION
        function showListPokemon(list) {

            list.forEach(element => {
                showPokemon(element)
            });

        }

    //Récupérer données API
    fetch('https://tyradex.vercel.app/api/v1/pokemon')
        .then((response) => response.json())
        .then((listPokemon) => showListPokemon(listPokemon));
}






//SEARCH
// function Search() {
//     let input, filter,article, p, textValue;
//     input = document.getElementById("Search");
//     filter = input.ariaValueMax.toUpperCase();
//     main = document.getElementById("ListPokemon");
//     article = article.getElementsByTageName("article");

//     for (i = 0; i < article.length; i++) {
//         p = article[i].getElementsByTageName("p")[0];
//         textValue = p.textcONTENT || p.innerText;
//         if(textValue.toUpperCase().indexOf(filter) > -1) {
//             article[i].style.display = "";
//         } else {
//             article[i].style.display = "none";
//         }
//     }
// }

//Récupérer données API FUNCTION PAR PAGE
function startGen() {
    fetch('https://tyradex.vercel.app/api/v1/gen')
        .then((response) => response.json())
        .then((listPokemon) => showListGeneration(listPokemon));
}

function startIndex() {
    getRandomPokemon()
        .then((PokeRandom) => {
            let contenu = showPokemon(PokeRandom);
            $("#PokeRandom").html(contenu);
        });
}

function startTypes() {
    fetch('https://tyradex.vercel.app/api/v1/types')
        .then((response) => response.json())
        .then((listPokemon) => showListTypes(listPokemon))
}

function startSearch() {
    fetch('https://tyradex.vercel.app/api/v1/pokemon')
        .then((response) => response.json())
        .then((listPokemon) => showListPokemon(listPokemon))
}