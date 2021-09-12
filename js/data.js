var playerPokemon, enemyPokemon, playerImage, enemyImage, superpower, symbols, backgroundImage;
var moves = [];
var showmoves = true;
var types = ["Fighting", "Poison"];
var typecolors = ["#f0818e", "#b168d1"];


var pokemondata = {
    "Pancham": {
        "BaseStats": {
            "HP": 67,
            "Attack": 82,
            "Defense": 62,
            "SpecialAttack": 46,
            "SpecialDefense": 48,
            "Speed": 42
        },
        "Types": {
            "Primary": "Fighting",
            "Secondary": "None"
        }
    },
    "Pangoro": {
        "BaseStats": {
            "HP": 95,
            "Attack": 124,
            "Defense": 78,
            "SpecialAttack": 69,
            "SpecialDefense": 71,
            "Speed": 58
        },
        "Types": {
            "Primary": "Fighting",
            "Secondary": "Dark"
        }
    }
};

var movesdata = [{
    "slot": 0,
    "pp": 8,
    "power": 120,
    "type": "Fighting",
    "name": "Superpower",
    "special": false
}, {
    "slot": 1,
    "pp": 8,
    "power": 120,
    "type": "Poison",
    "name": "Gunk Shot",
    "special": false
}, ];


function preload() {
    playerImage = loadImage("img/pokemon/pancham/back.png");
    enemyImage = loadImage("img/pokemon/pangoro/front.png");
    backgroundImage = loadImage("img/background.jpg");

    symbols = [];
    for (var curtype of types) {
        symbols.push(loadImage("img/moves/symbols/" + curtype + ".png"));
    }
}