import { Hero } from "../units/hero.js";
import { Archer } from "../units/archer.js";
import { Tank } from "../units/tank.js";
import { Halberdier } from "../units/halberdier.js";
import { canvas, teams, Teams, gameObject } from "../state.js";
import { clearArray } from "../utils.js";
import statistics from "../statstics.js";
import RomeTotalWar from "./rome-total-war.js";

export const Quarter = {
    first: 1,
    second: 2,
    third: 3,
    forth: 4
}

export const instaniateUnits = (type, amount, quarter, team) => {

    for (let i = 0; i < amount; i ++) {
        let w = canvas.width/2;
        let h = canvas.height/2;
        let x, y;
       // y = Math.floor(Math.random() * canvas.height);
        switch (quarter) {
            case Quarter.first:
                x = Math.floor(Math.random() * canvas.width/2);
                y = Math.floor(Math.random() * canvas.height/2);
                break;
            case Quarter.second:
                x = canvas.width/2 + Math.floor(Math.random() * canvas.width/2);
                y = Math.floor(Math.random() * canvas.height/2);
                break;
            case Quarter.third:
                x = Math.floor(Math.random() * canvas.width/2);
                y = canvas.height/2 + Math.floor(Math.random() * canvas.height/2);
                break;
            case Quarter.forth:
                x = canvas.width/2 + Math.floor(Math.random() * canvas.width/2);
                y = canvas.height/2 + Math.floor(Math.random() * canvas.height/2);
                break;
        }

        const unit = eval(`new ${type}(x, y, team)`);
        unit.push(gameObject, teams[team]);
    } 
}

const UIs = Array.from(document.querySelectorAll('.content'));
const hideUIs = () => UIs.forEach(el => el.style.display = 'none');

Array.from(document.querySelectorAll('close-btn')).forEach(el => {
    el.innerHTML = `<button class="btn btn-danger" close-game>Close Game</button>`;
    el.onclick = () => {
        // hideUIs();
        setGameMode(RomeTotalWar, RomeTotalWar.defaultGame);
    
        document.querySelector('.haz-main-menu').style.display = 'block';    
        
    }
})



hideUIs();
export let gameMode = undefined;
export const setGameMode = (mode, options) => {
    hideUIs();
    // console.log(mode);


    mode.init(options);
    if (mode.displayUI)
        document.querySelector(`.${mode.ui}`).style.display = 'block';

    gameMode = mode;
}

export const updateGameMode = () => {
    if (gameMode)
        gameMode.update();
}
export const drawGameMode = () => {
    if (gameMode)
        gameMode.draw();
}


export default class GameMode {
    constructor() {
        this.displayUI = true;
    }
    init(options) {
        
    
    clearArray(gameObject);
    teams["blue"] = [];
    teams["red"] = [];

        if (options.displayUI !== undefined)
            this.displayUI = options.displayUI;
        // console.log(this);
    }
    update() {
        for (let i = 0; i < gameObject.length; i ++) {
            gameObject[i].update();
        }
    }
    draw() {
        for (let i = 0; i < gameObject.length; i ++) {
            gameObject[i].draw();
        }
        statistics();
    }
}
