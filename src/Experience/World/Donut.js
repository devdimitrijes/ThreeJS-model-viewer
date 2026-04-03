import Experience from "../Experience";
export default class Donut{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.setDonut();
    }

    setDonut(){
        this.model = this.resources.items['donutModel'].scene;
        this.model.rotation.y+=Math.PI*1.15;
        this.model.scale.set(0.7, 0.7, 0.7)
        // this.model.position.set(0, 0, 0);
        this.scene.add(this.model);
    }
}