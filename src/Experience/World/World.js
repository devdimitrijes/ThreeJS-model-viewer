import * as THREE from 'three';
import Experience from "../Experience.js";
import Donut from './Donut.js';
import Environment from './Environment.js';
import Fox from './Fox.js';
import Astronaut from './Astronaut.js';

export default class World{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.resources.on('ready', ()=>{
            this.envronment = new Environment();
            this.astronaut = new Astronaut();
        })
    }

    update(){
        this.minerControls?.update(this.experience.time?.delta);
    }
}