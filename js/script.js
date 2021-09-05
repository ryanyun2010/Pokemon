function setup() {
    createMoves();
    enemyPokemon = new Pokemon("Pangoro", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, 700, 235, 300, 300, enemyImage, [moves[0], moves[1]], true);
    playerPokemon = new Pokemon("Pancham", { "HP": 31, "Atk": 31, "Def": 31, "Speed": 31 }, { "HP": 252, "Atk": 252, "Def": 252, "Speed": 252 }, 300, 520, 150, 200, playerImage, [moves[0], moves[1]], false);
    createCanvas(1100, 800);
}



function draw() {
    image(backgroundImage, 0, 0, 1100, 800);
    if (enemyPokemon.alive) { enemyPokemon.draw(); }
    if (playerPokemon.alive) {
        playerPokemon.draw();
        if (showmoves) {
            for (var move of playerPokemon.moveset) {
                move.draw();
            }
        }
    }
}

function mouseClicked() {
    for (var move of moves) {
        move.checkClick();
    }
}

function updateTooltips() {
    P("#enemytooltip .healthbar div").css("width", (enemyPokemon.hp / enemyPokemon.maxhp) * 100 + "%");
    P("#playertooltip .healthbar div").css("width", (playerPokemon.hp / playerPokemon.maxhp) * 100 + "%");
    P(".healthtext").html(playerPokemon.hp + "/" + playerPokemon.maxhp);
}