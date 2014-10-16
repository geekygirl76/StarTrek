(function(){
    if ( typeof Asteroids === "undefined"){
        window.Asteroids = {};
    }

    var Bullet = Asteroids.Bullet = function(options){
        options.radius = Bullet.RADIUS;
        options.color = options.color || Bullet.COLOR;
        options.vel = options.vel || Asteroids.randomVec(30);

        Asteroids.MovingObject.call(this,options);
    };

    Bullet.COLOR = "red";
    Bullet.RADIUS = 5;
    Bullet.SPEED = 15;

    Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

    Bullet.prototype.collidedWith = function(otherObject){
        if (otherObject instanceof Asteroids.Asteroid) {
            this.game.score += 1;
              this.remove();
              otherObject.remove();
              if (this.game.score === 100){
                  this.game.lives += 1;
                  this.game.score = 0;
              }
            }
    };

    Bullet.prototype.isWrappable = false;
})();