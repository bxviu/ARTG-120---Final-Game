const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');

    }

    create() {
        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });

        var board = this.rexBoard.add.board({
                // grid: getHexagonGrid(this),
                grid: getQuadGrid(this),
                width: 12,
                height: 12
            })
            .forEachTileXY(function (tileXY, board) {
                var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                graphics.strokePoints(points, true);
            }, this);

        board
        .setInteractive()
        .on('tiledown', function (pointer, tileXY) {
            Phaser.Actions.Call(board.tileZToChessArray(0), function (gameObject) {
                gameObject.destroy();
            });

            if (!board.contains(tileXY.x, tileXY.y)) {
                return;
            }

            // this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY).setScale(0.7);
            // var resultTileXYArray = board.getTileXYAtDirection(tileXY, [0, 1, 2, 3, 4, 5, 6, 7], { end: 1 });
            // var resultTileXY;
            // for (var i = 0, cnt = resultTileXYArray.length; i < cnt; i++) {
            //     resultTileXY = resultTileXYArray[i];
            //     if (!board.contains(resultTileXY.x, resultTileXY.y)) {
            //         continue;
            //     }
            //     this.rexBoard.add.shape(board, resultTileXY.x, resultTileXY.y, 0, COLOR_LIGHT).setScale(0.7);
            // }
        }, this)
        
        console.log(this);

        let g = new Game(this, board);
        g.startGame(2);
        // console.log(player);
        // let p = g.createPlayer(0,0,[],[]);
        // p.move(0,0);

        // detect mouse click

    }

    update() {}
}

class Game {
    constructor(scene, board) {
        this.scene = scene;
        this.board = board;
        this.turn = [];
        this.players = [];
        this.recentPlayerId = -1;
    }

    createPlayer(x, y, items, cards) {
        this.recentPlayerId += 1;
        return new Player(this.scene, this.board, x, y, this.recentPlayerId, items, cards);
    }

    startGame(numPlayers) {
        for (let player = 0; player < numPlayers; player++) {
            this.players.push(this.createPlayer(0+player*4, 0+player*2, [], []));     
            this.turn.push(this.players[player].id);
            console.log(this.players[player]);
        }
        this.players.forEach(player => {
            this.scene.input.on('pointerdown', (event) => {
                player.move(player.x+1, player.y+1);
                console.log(event.x, event.y);
            });
        });
        // while (this.players.length > 0) {
            
        // }
        this.updateBoard();
    }

    updateBoard() {
        // clear everything
        Phaser.Actions.Call(this.board.tileZToChessArray(0), function (gameObject) {
            gameObject.destroy();
        });
        // redraw players
        this.players.forEach(player => {

            player.updateVisual();
        });
    }
}

class Entity {
    constructor(scene, board, id, x, y, cards) {
        this.scene = scene;
        this.board = board;
        this.id = id;
        this.x = x;
        this.y = y;
        this.cards = cards || [];
        this.visual = null;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

}

class Player extends Entity {
    constructor(scene, board, x, y, id, items, cards) {
        super(scene, board, id, x, y, cards);
        this.items = items || [];
        this.visual = this.scene.add.text(this.x, this.y, "P" + this.id, {color:COLOR_DARK}).setOrigin(0.5);
        this.visual.setDepth(1);
    }
    

    move(x, y) {
        super.move(x,y);
        this.updateVisual();
    }

    updateVisual() {    
        // let text = this.scene.add.text(this.x, this.y, "P" + this.id).setOrigin(0.5);
        // let playerVisual = this.board.addChess(text, this.x, this.y, 1);

        this.scene.rexBoard.add.shape(this.board, this.x, this.y, 0, COLOR_PRIMARY).setScale(0.7);        
        let chess = this.board.tileXYZToChess(this.x, this.y, 0);
        // console.log("hi"); 
        // console.log(chess);
        this.visual.setPosition(chess.x, chess.y);
        var resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [0, 1, 2, 3, 4, 5, 6, 7], { end: 1 });
        var resultTileXY;
        for (var i = 0, cnt = resultTileXYArray.length; i < cnt; i++) {
            resultTileXY = resultTileXYArray[i];
            if (!this.board.contains(resultTileXY.x, resultTileXY.y)) {
                continue;
            }
            this.scene.rexBoard.add.shape(this.board, resultTileXY.x, resultTileXY.y, 0, COLOR_LIGHT).setScale(0.7);
        }
    }

}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 60,
        cellHeight: 30,
        type: 1
    });
    return grid;
}

var getHexagonGrid = function (scene) {
    var staggeraxis = 'x';
    var staggerindex = 'odd';
    var grid = scene.rexBoard.add.hexagonGrid({
        x: 100,
        y: 100,
        // size: 30,
        cellWidth: 72,
        cellHeight: 72,
        staggeraxis: staggeraxis,
        staggerindex: staggerindex
    })
    return grid;
};

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
};

var game = new Phaser.Game(config);