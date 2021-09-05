function createMoves() {
    for (var i = 0; i < movesdata.length; i++) {
        var curmove = movesdata[i];
        moves.push(new PokemonMove(curmove.slot, curmove.pp, curmove.power, curmove.type, curmove.name, curmove.special));
    }
}
console.log(typecolors, symbols);
class PokemonMove {
    constructor(slot, pp, power, type, name, special) {
        this.type = type;
        this.color = typecolors[this.getTypeIndex()];
        this.symbol = symbols[this.getTypeIndex()];
        this.pp = pp;
        this.maxpp = pp;
        this.slot = slot;
        this.x = 620;
        this.y = 500 + (this.slot) * 85;
        this.w = 450;
        this.h = 75;
        this.power = power;
        this.name = name;
        this.special = special;
    }

    draw() {
        fill(this.color);
        noStroke();
        rect(this.x, this.y, this.w, this.h, 70, 70, 70, 70);
        fill("black");
        quad(this.x + this.w * (2 / 3), this.y, this.x + this.w * (3 / 5), this.y + this.h, this.x + this.w * (9 / 10), this.y + this.h, this.x + this.w * (9 / 10), this.y);
        rect(this.x + this.w * (2 / 3), this.y, this.w / 3, this.h, 70, 70, 70, 70);
        image(this.symbol, this.x + 20, this.y + 6, this.h * (4 / 5), this.h * (4 / 5));
        textSize(30);
        textStyle(1500);
        text(this.name, this.x + this.h * (4 / 5) + 35, this.y + this.h / 2 + this.h / 9.375);
        fill("white");
        text(this.pp + "/" + this.maxpp, this.x + this.w * (3 / 4), this.y + this.h / 2 + this.h / 9.375);
        stroke("black");
    }

    checkClick() {
        if (mouseX > this.x && mouseX < this.x + this.w && mouseY > this.y && mouseY < this.y + this.h) {
            if (FindStats(playerPokemon, "Speed", playerPokemon.ivs.Speed, playerPokemon.evs.Speed, "None", "None") > FindStats(enemyPokemon, "Speed", enemyPokemon.ivs.Speed, enemyPokemon.evs.Speed, "None", "None")) {
                playerPokemon.useMove(playerPokemon.moveset[this.slot]);
                updateTooltips();
                enemyPokemon.randomMove();
            } else {
                enemyPokemon.randomMove();
                if (playerPokemon.alive) {
                    playerPokemon.useMove(playerPokemon.moveset[this.slot]);
                }
                updateTooltips();
            }
        }
    }

    getTypeIndex() {
        for (var i = 0; i < types.length; i++) {
            if (types[i] == this.type) {
                return i;
            }
        }
    }
}