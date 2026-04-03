import Experience from "../Experience";
export default class Astronaut{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.setAstronaut();
    }

    setAstronaut(){
        this.model = this.resources.items['astronautModel'].scene;
        this.model.rotation.y+=0.5;
        this.model.scale.set(1.1, 1.1, 1.1)
        this.model.position.set(-9, -2, -10);
        this.scene.add(this.model);
    }
}