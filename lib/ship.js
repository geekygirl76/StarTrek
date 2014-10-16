

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Ship = Asteroids.Ship = function(options) {

    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || Ship.COLOR;
    options.game = options.game;
    Asteroids.MovingObject.call(this, options);
  };

  Ship.RADIUS = 15;
  Ship.COLOR = "red";

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.collidedWith = function(otherObject){
      if (otherObject instanceof Asteroids.Asteroid){
          this.game.lives -=1;

      }
  }

  Ship.prototype.relocate = function(){
      this.pos = this.game.randomPosition();
      this.vel = [0, 0];
  };

  Ship.prototype.nudge = function(vec){
      this.pos[0] += vec[0];
      this.pos[1] += vec[1];
  };

  Ship.prototype.power= function(impulse){
      this.vel[0] = impulse[0];
      this.vel[1] = impulse[1];
  };

  Ship.prototype.fireBullet = function(){
      var norm = Asteroids.Util.norm(this.vel);

      if(norm ==0){
          var bulletVel = Asteroids.Util.randomVec(30);
      } else {
          var relVel = Asteroids.Util.scale(
              Asteroids.Util.dir(this.vel),
              Asteroids.Bullet.SPEED
          );

          var bulletVel = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];
      }



      var bullet = new Asteroids.Bullet({
          pos: this.pos,
          vel: bulletVel ,
          color: this.color,
          game: this.game
      });

      this.game.add(bullet);
  }

})();