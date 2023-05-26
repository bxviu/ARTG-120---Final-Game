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

        console.log(board);
        let g = new Game(this, board);
        g.initializeGame(1);
        this.ui = new UI(this, g);
        // board.grid.destroy();
        // graphics.clear()

        // this.add.rectangle(500, 500, 100, 100, 0xffffff);
        // board
        // .setInteractive()
        // .on('tiledown', (pointer, tileXY) => {
        //     // Phaser.Actions.Call(board.tileZToChessArray(0), (gameObject) => {
        //     //     gameObject.destroy();
        //     // });
        //     // board.forEachTileXY( (tileXY) => {
        //     //     // console.log(tileXY.x, tileXY.y);
        //     //     // board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
        //     //     console.log(board.contains(tileXY.x, tileXY.y, 0));   
        //     //   });
        //     if (!board.contains(tileXY.x, tileXY.y)) {
        //         return;
        //     }

        //     g.players.forEach(player => {
        //         if (g.turn[g.currentTurn] == player.id) {
        //             if (player.x >= tileXY.x-1 && player.x <= tileXY.x+1 && player.y <= tileXY.y+1 && player.y >= tileXY.y-1) {
        //                 player.move(tileXY.x, tileXY.y);
        //                 g.nextTurn();

        //                 // this.previousLocs.forEach(tile => {
        //                     // console.log(board.contains(tile.x, tile.y, 0));   
        //                     // board.removeChess(null, tile.x, tile.y, 0,  true);
        //                     // board.removeAllChess(true);
                            
        //                 // });
    
        //             }
        //             else {
        //                 player.move(player.x, player.y);
        //                 // player.updateVisual();
        //                 // board.removeChess(null, prevLoc.x, prevLoc.y, 0,  true);
        //                 // this.rexBoard.add.shape(board, player.x, player.y, 0, COLOR_LIGHT).setScale(0.7); 
        //             }
        //         }
                
        //     });


        //     // board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
        //     // g.players.forEach(player => {
        //     //     let prevLoc = {x:player.x, y:player.y}
        //     //     this.previousLocs.push(prevLoc);
        //     //     console.log(this.previousLocs);
        //     //     player.move(tileXY.x, tileXY.y);
        //     // });
        //     // g.players.forEach(player => {
                
        //         // g.updateBoard();
        //     // });       
        //     // board.forEachTileXY( (tileXY) => {
        //     //     if (board.contains(tileXY.x, tileXY.y, 0)) {
        //     //         console.log(tileXY.x, tileXY.y);
        //     //     }
        //         // board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
        //         // console.log(board.contains(tileXY.x, tileXY.y, 0));   
        //     //   });
        //     // this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY).setScale(0.7);
        //     // var resultTileXYArray = board.getTileXYAtDirection(tileXY, [0, 1, 2, 3, 4, 5, 6, 7], { end: 1 });
        //     // var resultTileXY;
        //     // for (var i = 0, cnt = resultTileXYArray.length; i < cnt; i++) {
        //     //     resultTileXY = resultTileXYArray[i];
        //     //     if (!board.contains(resultTileXY.x, resultTileXY.y)) {
        //     //         continue;
        //     //     }
        //     //     this.rexBoard.add.shape(board, resultTileXY.x, resultTileXY.y, 0, COLOR_LIGHT).setScale(0.7);
        //     // }
        // })
        // .on('tileover', (pointer, tileXY) => {
        //     // console.log(this.rexBoard);
        //     g.players.forEach(player => {
        //         // this.previousLocs.forEach(tile => {
        //         //     // console.log(board.contains(tile.x, tile.y, 0));   
        //         //     board.removeChess(null, tile.x, tile.y, 0,  true);
        //         //     // board.removeAllChess(true);
                    
        //         // });
        //         if (g.turn[g.currentTurn] == player.id) {
        //             if (player.x >= tileXY.x-1 && player.x <= tileXY.x+1 && player.y <= tileXY.y+1 && player.y >= tileXY.y-1) {
        //                 // board.removeAllChess(true);
        //                 board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
        //                 // board.removeChess(null, player.x, player.y, 0,  true);
        //                 // this.rexBoard.add.shape(board, player.x, player.y, 0, COLOR_LIGHT).setScale(0.7); 
        //                 this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY).setScale(0.7); 
        //                 // console.log(board.contains(tileXY.x, tileXY.y, 0));   
        //             }
        //         }
        //     });
        // })        
        // .on('tileout', (pointer, tileXY) => {
        //     // console.log(this.rexBoard);
        //     g.players.forEach(player => {
        //         // this.previousLocs.forEach(tile => {
        //         //     console.log(board.contains(tile.x, tile.y, 0));   
        //         //     board.removeChess(null, tile.x, tile.y, 0,  true);
        //         //     // board.removeAllChess(true);
                    
        //         // });
        //         if (g.turn[g.currentTurn] == player.id) {
        //             if (player.x >= tileXY.x-1 && player.x <= tileXY.x+1 && player.y <= tileXY.y+1 && player.y >= tileXY.y-1) {
        //                 // this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY).setScale(0.7);    
        //                 // board.removeAllChess(true);
        //                 board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
        //                 // board.removeChess(null, player.x, player.y, 0,  true);
        //                 this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_LIGHT).setScale(0.7); 
        //                 // this.rexBoard.add.shape(board, player.x, player.y, 0, COLOR_PRIMARY).setScale(0.7); 
        //                 // console.log(board.contains(tileXY.x, tileXY.y, 0));
        //             }
        //         }
        //     });
        // });
        
        console.log(this);
        this.events.on("gainCard", (param) => {
            this.ui.drawCard(param);
          });

        this.events.on("removeCard", () => {
            this.ui.removeCard();
        });
        
    }

    update() {
        this.ui.updateItemsText();
        
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