(function(){
    if(typeof Asteroids === "undefined"){
        window.Asteroids = {};
    };

    var GameView = Asteroids.GameView = function(game, ctx,images){
        this.game = game;
        this.ctx = ctx;
        this.ship = this.game.addShip(images.ship);
        this.timerId = null;
    };

    GameView.prototype.bindKeyHandlers = function(){
        var gameView = this;
        key("up", function(){
            gameView.game.ships[0].angle = Math.PI * 0;
            gameView.game.ships[0].power([0,-2]);
        });

        key("down", function(){
            gameView.game.ships[0].angle = Math.PI * 1;
            gameView.game.ships[0].power([0,2]);
        });

        key("left", function(){
            gameView.game.ships[0].angle = Math.PI * 1.5;
            gameView.game.ships[0].power([-2,0]);
        });

        key("right", function(){
            gameView.game.ships[0].angle = Math.PI * 0.5;
            gameView.game.ships[0].power([2,0]);
        });

        key("space", function(){
            gameView.ship.fireBullet();
        });

        key("e",function(){
            gameView.stop();
        });



    };

    GameView.prototype.start = function(){
        var gameView = this;



        var img = document.getElementById("background");
        this.ctx.clearRect(0,0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);
        this.ctx.drawImage(img, 0,0);

        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 30pt sans-serif';
        this.ctx.fillText("Press s to start",Asteroids.Game.DIM_X/2-100, Asteroids.Game.DIM_Y/2-100);
        key('s', function() {
              key.unbind('s');
              Asteroids.Bullet.RADIUS = 5;
              gameView.game.score = 0;
              gameView.timerId = setInterval(function(){
                  gameView.game.step();
                  gameView.game.draw(gameView.ctx);
                  if (gameView.game.lives ===0){

                      gameView.stop();
                  }
              }, 20);
              gameView.bindKeyHandlers();

            }.bind(gameView));



    };

    GameView.prototype.stop = function(){
        var gameView = this;
        clearInterval(this.timerId);
        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 30pt sans-serif';
        this.ctx.fillText(
          'Game Over',
          Asteroids.Game.DIM_X / 2 - 100,
          Asteroids.Game.DIM_Y / 2 - 30);

        this.ctx.fillStyle = 'white';
        this.ctx.font = 'bold 30pt sans-serif';
        this.ctx.fillText(
        'Score: ' + this.game.score,
        Asteroids.Game.DIM_X / 2 - 100,
        Asteroids.Game.DIM_Y / 2 - 130);


        this.ctx.fillStyle = "white";
        this.ctx.font = 'bold 30pt sans-serif';
        this.ctx.fillText("Press s to replay!",Asteroids.Game.DIM_X/2-100, Asteroids.Game.DIM_Y/2+100);
        key('s', function() {
              key.unbind('s');
              gameView.game.score = 0;
              Asteroids.Bullet.RADIUS = 5;
              gameView.game.lives = 1;
              gameView.timerId = setInterval(function(){
                  gameView.game.step();
                  gameView.game.draw(gameView.ctx);
                  if (gameView.game.lives ===0){

                      gameView.stop();
                  }
              }, 20);
              gameView.bindKeyHandlers();

            }.bind(this));


    };

    // GameView.prototype.restart = function(){
//         var gameView = this;
//         setTimeout(function(){
//             gameView.stop();
//         }, 3000);
//         gameView.start();
//
//     };
})();