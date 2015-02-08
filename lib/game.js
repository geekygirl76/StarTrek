(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function (images) {
    this.images = images;
    this.ships = [];
    this.asteroids = [];
    this.bullets = [];
    this.addAsteroids(images.asteroid);
    this.score = 0;
    this.lives = 1;
  };

  Game.BG_COLOR = "#000000";
  Game.DIM_X = 1400;
  Game.DIM_Y = 700;
  Game.NUM_ASTEROIDS = 10;



  Game.prototype.add = function (object) {
      if (object instanceof Asteroids.Asteroid) {
        this.asteroids.push(object);
      } else if (object instanceof Asteroids.Bullet) {
        this.bullets.push(object);
      } else if (object instanceof Asteroids.Ship) {
        this.ships.push(object);
      } else {
        throw "wtf?";
      }
    };

  Game.prototype.addBullets = function(bullet){
      this.bullets.push(bullet);
  }

  Game.prototype.addShip = function (image) {
      var ship = new Asteroids.Ship({
        pos: this.randomPosition(),
        game: this,
        image: image
      });

      this.ships.push(ship);

      return ship;
    };

  Game.prototype.allObjects = function(){
      return [].concat(this.ships).concat(this.asteroids)
      .concat(this.bullets);
  }

  Game.prototype.remove = function (object) {
      if (object instanceof Asteroids.Bullet) {
        this.bullets.splice(this.bullets.indexOf(object), 1);
      } else if (object instanceof Asteroids.Asteroid) {
        var idx = this.asteroids.indexOf(object);
        this.asteroids[idx] = new Asteroids.Asteroid({ game: this,image: this.images.asteroid });
      } else if (object instanceof Asteroids.Ship) {
        this.ships.splice(this.ships.indexOf(object), 1);
      } else {
        throw "wtf?";
      }
    };

    Game.prototype.isOutOfBounds = function (pos) {
        return (pos[0] < 0) || (pos[1] < 0)
          || (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
      };

  Game.prototype.step= function(){
      this.moveObjects();
      this.checkCollisions();
    };

  Game.prototype.checkCollisions = function () {
      var game = this;

      this.allObjects().forEach(function (obj1) {
        game.allObjects().forEach(function (obj2) {


          if ((obj1 != obj2) && obj1.isCollidedWith(obj2)) {
              obj1.collidedWith(obj2);
          }
        });
      });
    };
  Game.prototype.wrap = function (pos) {
      return [
        wrap(pos[0], Game.DIM_X), wrap(pos[1], Game.DIM_Y)
      ];

      function wrap (coord, max) {
        if (coord < 0) {
          return max + (coord % max);
        } else if (coord > max) {
          return coord % max;
        } else {
          return coord;
        }
      }
    };

  Game.prototype.moveObjects = function(){
      this.allObjects().forEach(function(obj){
          obj.move();
      });
  };

  Game.prototype.draw = function(ctx){
      var img = document.getElementById("background");
      ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
      ctx.drawImage(img, 0,0);


      ctx.fillStyle = "white";
      ctx.font = 'bold 30pt sans-serif';
      ctx.fillText("My Star Trek", 50,50);

      ctx.fillStyle = "white";
      ctx.font= 'bold 20pt sans-serif';
      ctx.fillText("Press space to shoot, up, down, left, right arrow to move ship",
 Game.DIM_X- 1000, 50 );

     ctx.fillStyle = "white";
     ctx.font= 'bold 20pt sans-serif';
     ctx.fillText("SCORE: " + this.score.toString(),
Game.DIM_X -1000,  Game.DIM_Y -200);



      this.allObjects().forEach(function(obj){
          obj.draw(ctx);
      });
  };

  Game.new = function(images){
      var game = new this(images);
      game.addAsteroids(Game.NUM_ASTEROIDS,images.asteroid);
      return game;
  }

  Game.prototype.addAsteroids = function (image) {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({image:image, game:this }));
    }
  };


  Game.prototype.randomPosition = function () {
    return [
      Game.DIM_X * Math.random(),
      Game.DIM_Y * Math.random()
    ];
  };

})();