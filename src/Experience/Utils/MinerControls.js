import Experience from "../Experience.js";
import * as THREE from "three";

export default class MinerControls{
    constructor(){
        
        this.experience = new Experience();
        this.miner = this.experience.world.miner;
        this.time = this.experience.time;
        this.camera = this.experience.camera.instance;
        this.orbitControlls = this.experience.camera.controls;
        //state
        this.toogleRun = true;
        this.currentAction = 'idle';

        //temp data
        this.keysPressed = {};
        this.walkDirection = new THREE.Vector3();
        this.rotateAngle = new THREE.Vector3(0,1,0);
        this.rotateQuaternion = new THREE.Quaternion();
        this.cameraTarget = new THREE.Vector3();

        //constants
        this.fadeDuration = 0.2;
        this.runVelocity = 0.005;
        this.walkVelocity = 0.002;

        this.keyEvents();
    }
    switchRunToogle(){
        this.toogleRun = !this.toogleRun;
    }

    keyEvents(){
        window.addEventListener("keydown", (event) => {
            if(event.shiftKey){
                this.switchRunToogle();
            }else{
                this.keysPressed[event.key.toLowerCase()] = true;
            }
        });

        window.addEventListener("keyup", (event) => {
            this.keysPressed[event.key.toLowerCase()] = false;
        });
    }

    directionOffset(){
        var directionOffset = 0;
        if(this.keysPressed['w']){
            if(this.keysPressed['a']){
                directionOffset = -Math.PI / 4 - Math.PI / 2;
            }else if(this.keysPressed['d']){
                directionOffset = Math.PI / 4 + Math.PI / 2;
            }else{
                directionOffset = Math.PI;
            }
        } else if(this.keysPressed['s']){
            if(this.keysPressed['a']){
                directionOffset = -Math.PI / 4;
            }else if(this.keysPressed['d']){
                directionOffset = Math.PI / 4;
            }
        } else if(this.keysPressed['a']){
            directionOffset = -Math.PI / 2;
        }else if (this.keysPressed['d']){
            directionOffset = Math.PI / 2;
        }
        return directionOffset;
    }
    updateCameraTarget(moveX, moveZ){
        this.camera.position.x += moveX;
        this.camera.position.z += moveZ;

        this.cameraTarget.x = this.miner.model.position.x;
        this.cameraTarget.y = this.miner.model.position.y;
        this.cameraTarget.z = this.miner.model.position.z;

        this.orbitControlls.target = this.cameraTarget;
    }
    update(delta){
        if(['w', 'a', 's', 'd'].some(key => this.keysPressed[key] == true))
        {
            if(this.currentAction != "walk" || this.currentAction != 'run'){
                this.currentAction = 'walk';
            }
        }else{
            if(this.keysPressed['e'] == true){
                this.currentAction = 'dig';
            }else{
                this.currentAction = 'idle';
            }
        }
        if(this.currentAction == "walk" || this.currentAction == "run"){
            var angleYcameraDirection = Math.atan2(
                this.camera.position.x - this.miner.model.position.x,
                this.camera.position.z - this.miner.model.position.z
            );
            this.miner.animation.play('walking');
            var directionOffset = this.directionOffset();
            this.rotateQuaternion.setFromAxisAngle(this.rotateAngle, angleYcameraDirection + directionOffset);
            this.miner.model.quaternion.rotateTowards(this.rotateQuaternion, 0.2);

            this.camera.getWorldDirection(this.walkDirection);
            this.walkDirection.y = 0;
            this.walkDirection.normalize();
            this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

            const velocity = this.currentAction == 'run' ? this.runVelocity : this.walkVelocity;

            const moveX = -this.walkDirection.x * velocity * delta;
            const moveZ = -this.walkDirection.z * velocity * delta;

            this.miner.model.position.x += moveX;
            this.miner.model.position.z += moveZ;
            this.updateCameraTarget(moveX, moveZ);
        }else if(this.currentAction == 'dig'){  
            this.miner.animation.play("digging");
        }else{          
            this.miner.animation.play('idle');
        }
    }
}