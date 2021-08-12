var playerPokemon, enemyPokemon, playerImage, enemyImage, enemymaxhp, playermaxhp, superpower, symbols;
var types = ["Fighting"]
var typecolors = ["#f0818e"]
var moves = [];


function preload(){
    playerImage = loadImage("img/panchamback.png")
    enemyImage = loadImage("img/pangorofront.png")

    symbols = [];
    for(var curtype of types){
        symbols.push(loadImage("img/moves/symbols/"+curtype+".png"));
    }
}

function setup(){
    createCanvas(1100,800);
    enemyPokemon = new Pokemon("Pangoro",{"HP": 31, "Atk": 31, "Def": 31},{"HP": 252, "Atk": 252, "Def": 252},700,235,300,300,enemyImage);
    playerPokemon = new Pokemon("Pancham",{"HP": 31, "Atk": 31, "Def": 31},{"HP": 252, "Atk": 252, "Def": 252},300,520,150,200,playerImage);
    playerPokemon.draw();
    enemyPokemon.draw();
    enemymaxhp = enemyPokemon.hp;
    playermaxhp = playerPokemon.hp;
    moves.push(new PokemonMove(620,500,450,75,8,120,"Fighting","Superpower",false))
    for(var move of moves){
        move.draw();
    }
}

class PokemonMove{
    constructor(x,y,w,h,pp,power,type,name,special){
        this.type = type;
        this.color = typecolors[this.getTypeIndex()]
        this.symbol = symbols[this.getTypeIndex()]
        this.pp = pp;
        this.maxpp = pp;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.power = power;
        this.name = name;
        this.special = special;
    }

    draw(){
        fill(this.color)
        noStroke()
        rect(this.x, this.y, this.w, this.h, 70, 70, 70, 70);
        fill("black");
        quad(this.x+this.w*(2/3),this.y,this.x+this.w*(3/5),this.y+this.h,this.x+this.w*(9/10),this.y+this.h,this.x+this.w*(9/10),this.y)
        rect(this.x+this.w*(2/3), this.y, this.w/3, this.h, 70, 70, 70, 70);
        image(this.symbol,this.x+20,this.y+6,this.h*(4/5),this.h*(4/5))
        textSize(30);
        textStyle(1500)
        text(this.name,this.x+this.h*(4/5)+35,this.y+this.h/2+this.h/9.375)
        fill("white")
        text(this.pp + "/" + this.maxpp,this.x+this.w*(3/4),this.y+this.h/2+this.h/9.375)
        stroke("black");
    }

    checkClick(){
        if(mouseX > this.x && mouseX < this.x+this.w && mouseY > this.y && mouseY < this.y + this.h){
        playerPokemon.dealDamage((playerPokemon.calcDamage({
            "move": {
                "power": this.power,
                "type": this.type,
                "special": this.special
            },
            "weather": "None"
        },enemyPokemon)),enemyPokemon)
        updateTooltips();    
        }
    }

    getTypeIndex(){
        for(var i = 0; i < types.length; i++){
            if(types[i] == this.type){
                return i;
            }
        }
    }
}



class Pokemon{
    constructor(name,ivs,evs,x,y,w,h,img){
        this.name = name;
        this.img = img;
        this.evs = evs;
        this.ivs = ivs;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hp = (2*GetData(this.name,"HP")+this.ivs.HP+(this.evs.HP/4))+110;
        this.alive = true;
    }
    draw(){
        image(this.img,this.x,this.y,this.w,this.h)
    }
    calcDamage(data,p){
        return Calc(this.name,p.name,data.move.power,data.move.type,data.weather,this.ivs.HP,this.evs.HP,this.ivs.Atk,this.evs.Atk,this.ivs.Def,this.evs.Def,"None","None",data.move.special)
    }
    dealDamage(data,p){
        p.hp -= data.MaxDamage;
        if(p.hp <= 0){
            p.hp = 0;
            p.alive = false;
        }
    }
}



function mouseClicked(){
    for(var move of moves){
        move.checkClick();
    }

    // if(mouseX >= 680 && mouseX <= 1080 && mouseY >= 550 && mouseY <= 615 && document.getElementById("moves").style.display != "none"){
    //     // used SUPERPOWER
    //     document.getElementById("moves").style.display = "none";
    //     playerPokemon.dealDamage((playerPokemon.calcDamage({
    //         "move": {
    //             "power": 120,
    //             "type": "Fighting",
    //             "special": false
    //         },
    //         "weather": "None"
    //     },enemyPokemon)),enemyPokemon)
    //     updateTooltips()
    // }else if(mouseX >= 680 && mouseX <= 1080 && mouseY >= 620 && mouseY < 685 && document.getElementById("moves").style.display != "none"){
    //     document.getElementById("moves").style.display = "none";
    //     playerPokemon.dealDamage((playerPokemon.calcDamage({
    //         "move": {
    //             "power": 80,
    //             "type": "Psychic",
    //             "special": false
    //         },
    //         "weather": "None"
    //     },enemyPokemon)),enemyPokemon)
    //     updateTooltips()
    // }else if(mouseX >= 680 && mouseX <= 1080 && mouseY >= 620 && mouseY <= 755 && document.getElementById("moves").style.display != "none"){
    //     document.getElementById("moves").style.display = "none";
    //     playerPokemon.dealDamage((playerPokemon.calcDamage({
    //         "move": {
    //             "power": 120,
    //             "type": "Poison",
    //             "special": false
    //         },
    //         "weather": "None"
    //     },enemyPokemon)),enemyPokemon)
    //     updateTooltips()
    // }
}

function updateTooltips(){
    var enemyhealthbar = document.querySelector("#enemytooltip .healthbar div");
    var playerhealthbar = document.querySelector("#playertooltip .healthbar div");
    var playerhealthtext = document.querySelector(".healthtext");
    enemyhealthbar.style.width = (enemyPokemon.hp/enemymaxhp)*100 + "%";
    playerhealthbar.style.width = (playerPokemon.hp/playermaxhp)*100 + "%";
    playerhealthtext = playerPokemon.hp + "/" + playermaxhp;

}

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
}