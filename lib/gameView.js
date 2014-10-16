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
            gameView.game.ships[0].power([0,-1]);
        });

        key("down", function(){
            gameView.game.ships[0].power([0,1]);
        });

        key("left", function(){
            gameView.game.ships[0].turn(-0.5);
            gameView.game.ships[0].power([-1,0]);
        });

        key("right", function(){
            gameView.game.ships[0].turn(0.5);
            gameView.game.ships[0].power([1,0]);
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


        this.timerId = setInterval(function(){
            gameView.game.step();
            gameView.game.draw(gameView.ctx);
            if (gameView.game.lives ===0){

                gameView.stop();
            }
        }, 20);

        this.bindKeyHandlers();
    };

    GameView.prototype.stop = function(){
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


    }
})();