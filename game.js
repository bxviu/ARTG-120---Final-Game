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

        let g = new Game(this, board);
        g.initializeGame(1);
        this.ui = new UI(this, g);

        // this.add.rectangle(500, 500, 100, 100, 0xffffff);
        board
        .setInteractive()
        .on('tiledown', (pointer, tileXY) => {
            // Phaser.Actions.Call(board.tileZToChessArray(0), (gameObject) => {
            //     gameObject.destroy();
            // });
            // board.forEachTileXY( (tileXY) => {
            //     // console.log(tileXY.x, tileXY.y);
            //     // board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
            //     console.log(board.contains(tileXY.x, tileXY.y, 0));   
            //   });
            if (!board.contains(tileXY.x, tileXY.y)) {
                return;
            }

            g.players.forEach(player => {
                if (g.turn[g.currentTurn] == player.id) {
                    if (player.x >= tileXY.x-1 && player.x <= tileXY.x+1 && player.y <= tileXY.y+1 && player.y >= tileXY.y-1) {
                        player.move(tileXY.x, tileXY.y);
                        g.nextTurn();

                        // this.previousLocs.forEach(tile => {
                            // console.log(board.contains(tile.x, tile.y, 0));   
                            // board.removeChess(null, tile.x, tile.y, 0,  true);
                            // board.removeAllChess(true);
                            
                        // });
    
                    }
                    else {
                        player.move(player.x, player.y);
                        // player.updateVisual();
                        // board.removeChess(null, prevLoc.x, prevLoc.y, 0,  true);
                        // this.rexBoard.add.shape(board, player.x, player.y, 0, COLOR_LIGHT).setScale(0.7); 
                    }
                }
                
            });


            // board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
            // g.players.forEach(player => {
            //     let prevLoc = {x:player.x, y:player.y}
            //     this.previousLocs.push(prevLoc);
            //     console.log(this.previousLocs);
            //     player.move(tileXY.x, tileXY.y);
            // });
            // g.players.forEach(player => {
                
                // g.updateBoard();
            // });       
            // board.forEachTileXY( (tileXY) => {
            //     if (board.contains(tileXY.x, tileXY.y, 0)) {
            //         console.log(tileXY.x, tileXY.y);
            //     }
                // board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
                // console.log(board.contains(tileXY.x, tileXY.y, 0));   
            //   });
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
        })
        .on('tileover', (pointer, tileXY) => {
            // console.log(this.rexBoard);
            g.players.forEach(player => {
                // this.previousLocs.forEach(tile => {
                //     // console.log(board.contains(tile.x, tile.y, 0));   
                //     board.removeChess(null, tile.x, tile.y, 0,  true);
                //     // board.removeAllChess(true);
                    
                // });
                if (g.turn[g.currentTurn] == player.id) {
                    if (player.x >= tileXY.x-1 && player.x <= tileXY.x+1 && player.y <= tileXY.y+1 && player.y >= tileXY.y-1) {
                        // board.removeAllChess(true);
                        board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
                        // board.removeChess(null, player.x, player.y, 0,  true);
                        // this.rexBoard.add.shape(board, player.x, player.y, 0, COLOR_LIGHT).setScale(0.7); 
                        this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY).setScale(0.7); 
                        // console.log(board.contains(tileXY.x, tileXY.y, 0));   
                    }
                }
            });
        })        
        .on('tileout', (pointer, tileXY) => {
            // console.log(this.rexBoard);
            g.players.forEach(player => {
                // this.previousLocs.forEach(tile => {
                //     console.log(board.contains(tile.x, tile.y, 0));   
                //     board.removeChess(null, tile.x, tile.y, 0,  true);
                //     // board.removeAllChess(true);
                    
                // });
                if (g.turn[g.currentTurn] == player.id) {
                    if (player.x >= tileXY.x-1 && player.x <= tileXY.x+1 && player.y <= tileXY.y+1 && player.y >= tileXY.y-1) {
                        // this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY).setScale(0.7);    
                        // board.removeAllChess(true);
                        board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
                        // board.removeChess(null, player.x, player.y, 0,  true);
                        this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_LIGHT).setScale(0.7); 
                        // this.rexBoard.add.shape(board, player.x, player.y, 0, COLOR_PRIMARY).setScale(0.7); 
                        // console.log(board.contains(tileXY.x, tileXY.y, 0));
                    }
                }
            });
        });
        
        console.log(this);


    }

    update() {
        this.ui.updateItemsText();
    }
}

class UI {
    constructor(scene, game) {
        this.game = game
        this.scene = scene;
        this.itemsText = this.scene.add.text(10, 10, "Items: ");
    }

    updateItemsText() {
        let itemList = "";
        this.game.players[0].items.forEach(item => {
            itemList += item.name + " ";
        });
        this.itemsText.setText("Items: " + itemList);
    
    }
}

class Game {
    constructor(scene, board) {
        this.scene = scene;
        this.board = board;
        this.turn = [];
        this.currentTurn = null;
        this.players = [];
        this.items = [];
        this.monster = null;
        this.recentPlayerId = -1;
        this.removed = [];
    }

    createPlayer(x, y, items, cards) {
        this.recentPlayerId += 1;
        return new Player(this.scene, this.board, this, x, y, this.recentPlayerId, items, cards);
    }

    createMonster(x, y, cards) {
        return new Monster(this.scene, this.board, this, x, y, 0, cards);
    }

    createItem(x, y, id, name) {
        return new Item(this.scene, this.board, this, x, y, id, name);
    }

    initializeGame(numPlayers) {
        for (let player = 0; player < numPlayers; player++) {
            this.players.push(this.createPlayer(0+player*4, 0+player*2, [], []));     
            this.turn.push(this.players[player].id);
            // console.log(this.players[player]);
        }
        this.monster = this.createMonster(11, 11, []);
        this.turn.push(-1);
        this.items.push(this.createItem(5, 7, 0, "Salt"));
        this.items.push(this.createItem(11, 4, 1, "Crowbar"));
        this.items.push(this.createItem(2, 3, 2, "Book"));
        // this.players.forEach(player => {
        //     this.scene.input.on('pointerdown', (event) => {
        //         player.move(player.x+1, player.y+1);
        //         console.log(event.x, event.y);
        //     });
        // });

        this.updateBoard();
        // console.log(this.turn);
        this.startGame();
    }

    startGame() {
        // while (this.players.length > 0) {
        this.currentTurn = 0;
        this.players[0].showPossibleSpaces();
        this.items.forEach(item => {
            // console.log(item.name);
            item.updateVisual();
        });
            // this.turn.forEach(entityID => {
            //     this.currentTurn = entityID;
            // });
        // }
    }

    nextTurn() {
        this.currentTurn = this.currentTurn + 1;
        // console.log(this.currentTurn);
        if (this.currentTurn > this.turn.length - 1) {
            this.currentTurn = 0;
        }
        if (this.turn[this.currentTurn] == -1) {
            this.scene.time.delayedCall(500, () => {
                this.monster.navigate();
                this.players[0].showPossibleSpaces();
                this.nextTurn();
            });
        }
    }
    

    updateBoard() {
        // clear everything
        Phaser.Actions.Call(this.board.tileZToChessArray(0), (gameObject) => {
            gameObject.destroy();
        });
        // // Phaser.Actions.Call(this.board.tileZToChessArray(0), (gameObject) => {
        // //     gameObject.destroy();
        // // });
        this.board.removeAllChess(true);
        this.board.forEachTileXY( (tileXY) => {
            this.board.removeChess(null, tileXY.x, tileXY.y, 0, true);
            });

        // check if player overlaps item
        this.itemOverlaps();
        this.playerOverlaps();
        // this.board.removeAllChess(true);

        // redraw players
        // console.log(this.items[0]);
        // this.items[0].updateVisual();  
        // this.board.removeAllChess(true);
        // this.items[0].updateVisual();  
        this.players.forEach(player => {
            // console.log(this.board.tileZToChessArray(0));
            // Phaser.Actions.Call(this.board.tileZToChessArray(0), function (gameObject) {
            //     gameObject.destroy();
            // });
            player.updateVisual();
        });
        this.monster.updateVisual();
        // console.log(this.items);
        this.items.forEach(item => {
            // console.log(item.name);
            this.board.removeChess(null, item.x, item.y, 0, true);

            if (!item.offBoard)
                item.updateVisual();
            else {
                // this.scene.rexBoard.add.shape(this.board, item.x, item.y, 0, COLOR_LIGHT).setScale(0.7);
                this.board.removeChess(null, item.x, item.y, 0, true);
                if (!this.board.contains(item.x, item.y, 0)) {
                    this.scene.rexBoard.add.shape(this.board, item.x, item.y, 0, 0x000000).setScale(0.7);
                }
                // this.board.removeChess(null, item.x, item.y, 0, true);
                // this.board.removeChess(null, item.x, item.y, 0, true);
                // item.move(item.x+1, item.y+1);
                // item.updateVisual();
                // console.log(this.board.contains(item.x, item.y, -1));
                // console.log(this.board)
            }
        });
        this.scene.rexBoard.add.shape(this.board, 5, 5, 0, 0xFF0000).setScale(0.7);
        this.scene.rexBoard.add.shape(this.board, 5, 6, 0, 0xFF0000).setScale(0.7);
        this.scene.rexBoard.add.shape(this.board, 6, 6, 0, 0xFF0000).setScale(0.7);
        this.scene.rexBoard.add.shape(this.board, 6, 5, 0, 0xFF0000).setScale(0.7);
        // console.log(this.items[0]);
        // this.items[0].updateVisual();  
        // this.removed.forEach(item => {
            // this.board.removeChess(null, item.x, item.y, 0, true);
        // })
        // this.board.removeAllChess(true);

    }

    itemOverlaps() {
        this.items.forEach(item => {
            if (!item.offBoard && item.x == this.players[0].x && item.y == this.players[0].y) {
                console.log("overlap");
                // console.log(item);
                this.players[0].gainItem(item);
                this.board.removeChess(null, item.x, item.y, 0, true);
                // this.items.splice(this.items.indexOf(item), 1);
                // this.removed.push(item);
                item.removeItemfromBoard();
                // this.updateBoard();
            }
        });
    }

    playerOverlaps() {
        if (this.players[0].items.length > 2 && (this.players[0].x == 5 && this.players[0].y == 5) || (this.players[0].x == 5 && this.players[0].y == 6) || (this.players[0].x == 6 && this.players[0].y == 6) || (this.players[0].x == 6 && this.players[0].y == 5)) {
            this.scene.add.text(500, 500, "You Win!", {color:"#FFFFFF"}).setOrigin(0.5);
            console.log("win");
        }
    }
        
    
}

class Entity {
    constructor(scene, board, game, id, x, y) {
        this.scene = scene;
        this.board = board;
        this.id = id;
        this.x = x;
        this.y = y;
        this.visual = null;
        this.game = game;
        this.offBoard = false;
    }

    move(x, y) {
        this.x = x;
        this.y = y;
    }

    updateVisual() {    
        // console.log(this);
        this.scene.rexBoard.add.shape(this.board, this.x, this.y, 0, COLOR_PRIMARY).setScale(0.7);        
        let chess = this.board.tileXYZToChess(this.x, this.y, 0);
        if (this.visual) {
            this.visual.setPosition(chess.x, chess.y);
        }
    }
}

class Item extends Entity {
    constructor(scene, board, game, x, y, id, name) {
        super(scene, board, game, id, x, y);
        let text = this.scene.add.text(0, 0, name, {color:COLOR_DARK}).setOrigin(0.5);
        let image = this.scene.add.rectangle(0, 0, 20, 20, 0xffffff).setOrigin(0.5);
        this.visual = this.scene.add.container(this.x, this.y, [image, text]).setDepth(1);
        this.name = name;
    }

    // updateVisual() {    
    //     // console.log(this);
    //     if (!this.offBoard) {   
    //         let chess = this.board.tileXYToWorldXY(this.x, this.y);
    //         this.visual.setPosition(chess.x, chess.y);
    //         // }
    //     }
    // }

    removeItemfromBoard() {
        while (this.board.contains(this.x, this.y, 0)) {
            this.board.removeChess(null, this.x, this.y, 0, true);
        }
        this.offBoard = true;
        this.visual.destroy();
        this.visual = null;
        // this.game.updateBoard();
    }
}

class Monster extends Entity {
    constructor(scene, board, game, x, y, id, cards) {
        super(scene, board, game, id, x, y);
        this.cards = cards || [];
        this.visual = this.scene.add.text(this.x, this.y, "M", {color:COLOR_DARK}).setOrigin(0.5);
        this.visual.setDepth(1);
    }

    move(x, y) {
        super.move(x,y);
        // this.updateVisual();
        this.game.updateBoard();

    }

    navigate() {
        let moveX = Math.random() > 0.5 ? 1 : -1;
        let moveY = Math.random() > 0.5 ? 1 : -1;
        do {
            moveX = Math.random() > 0.5 ? 1 : -1;
            moveY = Math.random() > 0.5 ? 1 : -1;
        } while (this.x+moveX < 0 || this.x+moveX > this.board.width-1 || this.y+moveY < 0 || this.y+moveY > this.board.height-1);
        this.move(this.x+moveX, this.y+moveY);
    }

    // updateVisual() {    
    //     // console.log(this.x, this.y);
    //     this.scene.rexBoard.add.shape(this.board, this.x, this.y, 0, COLOR_PRIMARY).setScale(0.7);        
    //     let chess = this.board.tileXYZToChess(this.x, this.y, 0);
    //     // console.log(chess);
    //     this.visual.setPosition(chess.x, chess.y);
    //     // var resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [0, 1, 2, 3, 4, 5, 6, 7], { end: 1 });
    //     // var resultTileXY;
    //     // for (var i = 0, cnt = resultTileXYArray.length; i < cnt; i++) {
    //     //     resultTileXY = resultTileXYArray[i];
    //     //     if (!this.board.contains(resultTileXY.x, resultTileXY.y)) {
    //     //         continue;
    //     //     }
    //     //     this.scene.rexBoard.add.shape(this.board, resultTileXY.x, resultTileXY.y, 0, COLOR_LIGHT).setScale(0.7);
    //     // }
    // }
}

class Player extends Entity {
    constructor(scene, board, game, x, y, id, items, cards) {
        super(scene, board, game, id, x, y);
        this.items = items || [];
        this.cards = cards || [];
        let text = this.scene.add.text(0, 0, "P" + this.id, {color:COLOR_DARK}).setOrigin(0.5);
        let image = this.scene.add.rectangle(0, 0, 20, 20, 0xffffff).setOrigin(0.5);
        this.visual = this.scene.add.container(this.x, this.y, [image, text]).setDepth(1);// this.board.addChess(this.image, 11, 0, 1, true);
        // console.log(this.board.exists(this.image));
        // this.mover = this.scene.rexBoard.add.moveTo(this.image, {})
    }

    move(x, y) {
        super.move(x,y);    
        // let chess = this.board.tileXYZToChess(this.x, this.y, 0);
        // console.log(chess.x, chess.y);
        // this.image.setPosition(chess.x, chess.y);
        // this.mover.moveTo(chess.x, chess.y);
        // this.updateVisual();
        this.game.updateBoard();

    }

    // updateVisual() {    
    //     // let text = this.scene.add.text(this.x, this.y, "P" + this.id).setOrigin(0.5);
    //     // let playerVisual = this.board.addChess(text, this.x, this.y, 1);
    //     // this.board.forEachTileXY( (tileXY) => {
    //     //     this.board.removeChess(tileXY.x, tileXY.y);
    //     //   });
    //     this.scene.rexBoard.add.shape(this.board, this.x, this.y, 0, COLOR_PRIMARY).setScale(0.7);        
    //     let chess = this.board.tileXYZToChess(this.x, this.y, 0);
    //     // console.log("hi"); 
    //     // console.log(chess);
    //     this.visual.setPosition(chess.x, chess.y);
    // }

    showPossibleSpaces() {
        var resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [0, 1, 2, 3, 4, 5, 6, 7], { end: 1 });
        var resultTileXY;
        for (var i = 0, cnt = resultTileXYArray.length; i < cnt; i++) {
            resultTileXY = resultTileXYArray[i];
            if (!this.board.contains(resultTileXY.x, resultTileXY.y)) {
                continue;
            }
            if (this.game.monster.x == resultTileXY.x && this.game.monster.y == resultTileXY.y) {
                continue;
            }
            if (this.game.items.find(item => !item.offBoard && item.x == resultTileXY.x && item.y == resultTileXY.y)) {
                continue;
            }
            this.scene.rexBoard.add.shape(this.board, resultTileXY.x, resultTileXY.y, 0, COLOR_LIGHT).setScale(0.7);
        }
    }

    gainItem(item) {
        this.items.push(item);
    }

    gainCard(card) {
        this.cards.push(card);
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