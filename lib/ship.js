

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Ship = Asteroids.Ship = function(options) {
      options.angle = Ship.ANGLE ;
    options.radius = Ship.RADIUS;
    options.vel = options.vel || [0, 0];
    options.color = options.color || Ship.COLOR;
    options.game = options.game;
    Asteroids.MovingObject.call(this, options);
  };
  Ship.ANGLE = 0;
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
      this.angle = 0;
      this.vel = [0, 0];
  };


  Ship.prototype.nudge = function(vec){
      this.pos[0] = (this.pos[0]+ vec[0]) * Math.cos(this.angle);
      this.pos[1] = (this.pos[1]+ vec[1]) * Math.cos(this.angle);
  };

  Ship.prototype.power= function(impulse){
      this.vel[0] = impulse[0];
      this.vel[1] = impulse[1];
  };

  Ship.prototype.fireBullet = function(){
      var norm = Asteroids.Util.norm(this.vel);

      if(norm ==0){
          var bulletVel1 = [30 * Math.cos(-Math.PI /2), 30 * Math.sin(-Math.PI /2)];
          var bulletVel2 = [30 * Math.cos(0), 30 * Math.sin(0)];
          var bulletVel3 = [30 * Math.cos(-Math.PI ), 30 * Math.sin(-Math.PI )];
      } else {
          var relVel = Asteroids.Util.scale(
              Asteroids.Util.dir(this.vel),
              Asteroids.Bullet.SPEED
          );

          var bulletVel1 = [relVel[0] + this.vel[0], relVel[1] + this.vel[1]];
          var bulletVel2 = [-relVel[1] - this.vel[1], relVel[0] + this.vel[0]];
          var bulletVel3 = [relVel[1] + this.vel[1],-relVel[0] - this.vel[0] ];
      }



      var bullet1 = new Asteroids.Bullet({
          pos: this.pos,
          vel: bulletVel1 ,
          color: this.color,
          game: this.game,
          angle: this.angle
      });
      
      var bullet2 = new Asteroids.Bullet({
          pos: this.pos,
          vel: bulletVel2 ,
          color: this.color,
          game: this.game,
          angle: this.angle - Math.PI/2
      });
      
      var bullet3 = new Asteroids.Bullet({
          pos: this.pos,
          vel: bulletVel3 ,
          color: this.color,
          game: this.game,
          angle: this.angle + Math.PI/2
      });

      this.game.add(bullet1);
      this.game.add(bullet2);
      this.game.add(bullet3);
  };

  Ship.prototype.draw = function(ctx){

      ctx.save();
      ctx.translate(this.pos[0], this.pos[1]);
      ctx.rotate(this.angle);
      ctx.drawImage(this.image, 0 - this.image.width / 2, 0 - this.image.height / 2);

      ctx.restore();

  };

  Ship.prototype.turn = function(rads) {
   this.angle += rads;
   this.angle %= 2 * Math.PI;
  };

  // Ship.prototype.draw= function(){
//       var img = document.getElementById("ship");
//       ctx.drawImage(img, this.pos[0],this.pos[1]);
//   }

})();