class Pokemon {
    constructor(name, ivs, evs, x, y, w, h, img, moveset, enemy) {
        this.name = name;
        this.img = img;
        this.evs = evs;
        this.ivs = ivs;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hp = (2 * GetData(this.name, "HP") + this.ivs.HP + (this.evs.HP / 4)) + 110;
        this.alive = true;
        this.maxhp = this.hp;
        this.enemy = enemy;
        this.moveset = moveset;
    }
    draw() {
        image(this.img, this.x, this.y, this.w, this.h);
    }
    calcDamage(data, p) {
        return Calc(this.name, p.name, data.move.power, data.move.type, data.weather, this.ivs.HP, this.evs.HP, this.ivs.Atk, this.evs.Atk, this.ivs.Def, this.evs.Def, "None", "None", data.move.special);
    }
    dealDamage(data, p) {
        data = this.calcDamage(data, p);
        p.hp -= data.MaxDamage;
        if (p.hp <= 0) {
            p.hp = 0;
            p.alive = false;
            if (p.enemy) {
                P("#enemytooltip").hide();
            } else {
                P("#playertooltip").hide();
            }
        }
    }
    useMove(move) {
        var movedata = {
            "move": {
                "power": move.power,
                "type": move.type,
                "special": move.special
            },
            "weather": "None"
        };
        if (this.alive) {
            popupController.showText(this.name + " used " + move.name + "!", function(pokemon, data) {
                console.log(pokemon, data)
                if (pokemon.enemy) {
                    pokemon.dealDamage(data, playerPokemon);
                } else {
                    pokemon.dealDamage(data, enemyPokemon);
                }
            }, this, movedata);
        }

    }
    randomMove() {
        var move = this.moveset[floor(random(0, this.moveset.length))];
        this.useMove(move);
    }
}