import Experience from "../Experience";
export default class Fox{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.setFox();
    }

    setFox(){
        this.model = this.resources.items['foxModel'].scene;
        this.model.rotation.y+=Math.PI*1.15;
        this.model.scale.set(0.8, 0.8, 0.8)
        this.model.position.set(0, -1, 0);
        this.scene.add(this.model);
    }
}