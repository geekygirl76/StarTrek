"use strict";

(function(){
    if(typeof Asteroids === "undefined"){
        window.Asteroids = {};
    }

    var Asteroid = Asteroids.Asteroid = function(options){
        options.angle = 0;
        options.color = Asteroid.COLOR;
        options.radius = Asteroid.RADIUS;
        options.pos = options.pos|| options.game.randomPosition();
        options.vel = options.vel || Asteroids.Util.randomVec(Asteroid.SPEED);

        Asteroids.MovingObject.call(this,options);
    }

    Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

    Asteroid.COLOR = "#505050";
    Asteroid.RADIUS = 25;
    Asteroid.SPEED = 4;

    Asteroid.prototype.collidedWith= function(otherObject){
        if (otherObject instanceof Asteroids.Ship){
            otherObject.relocate();
        }
    };

    Asteroid.prototype.draw = function(ctx){

        ctx.drawImage(this.image, this.pos[0], this.pos[1]);

    }
})();