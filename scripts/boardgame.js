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
        this.initializeBoard();

        this.updateBoard();
        // console.log(this.turn);
        this.startGame();
    }

    initializeBoard() {
        
        this.board
        .setInteractive()
        .on('tiledown', (pointer, tileXY) => {
           
            if (!this.board.contains(tileXY.x, tileXY.y)) {
                return;
            }

            this.players.forEach(player => {
                if (this.turn[this.currentTurn] == player.id) {
                    if (player.x >= tileXY.x-1 && player.x <= tileXY.x+1 && player.y <= tileXY.y+1 && player.y >= tileXY.y-1) {
                        player.move(tileXY.x, tileXY.y);
                        this.nextTurn();
                    }
                    else {
                        player.move(player.x, player.y);
                        player.showPossibleSpaces();
                    }
                }
                
            });
        })
        .on('tileover', (pointer, tileXY) => {
            // console.log(this.rexBoard);
            this.players.forEach(player => {
                if (this.turn[this.currentTurn] == player.id) {
                    if (player.x >= tileXY.x-1 && player.x <= tileXY.x+1 && player.y <= tileXY.y+1 && player.y >= tileXY.y-1) {
                        // board.removeAllChess(true);
                        this.board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
                        // board.removeChess(null, player.x, player.y, 0,  true);
                        // this.rexBoard.add.shape(board, player.x, player.y, 0, COLOR_LIGHT).setScale(0.7); 
                        this.scene.rexBoard.add.shape(this.board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY).setScale(0.7); 
                        // console.log(board.contains(tileXY.x, tileXY.y, 0));   
                    }
                }
            });
        })        
        .on('tileout', (pointer, tileXY) => {
            // console.log(this.rexBoard);
            this.players.forEach(player => {

                if (this.turn[this.currentTurn] == player.id) {
                    if (player.x >= tileXY.x-1 && player.x <= tileXY.x+1 && player.y <= tileXY.y+1 && player.y >= tileXY.y-1) {
                        // this.rexBoard.add.shape(board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY).setScale(0.7);    
                        // board.removeAllChess(true);
                        this.board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
                        // board.removeChess(null, player.x, player.y, 0,  true);
                        this.scene.rexBoard.add.shape(this.board, tileXY.x, tileXY.y, 0, COLOR_LIGHT).setScale(0.7); 
                        // this.rexBoard.add.shape(board, player.x, player.y, 0, COLOR_PRIMARY).setScale(0.7); 
                        // console.log(board.contains(tileXY.x, tileXY.y, 0));
                    }
                }
            });
        });
        
        
        // return board;
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
            this.scene.events.emit("gainCard", {name:"test", description:"description"});
            console.log("Gain card");
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
        if (this.players[0].items.length > 2 && ((this.players[0].x == 5 && this.players[0].y == 5) || (this.players[0].x == 5 && this.players[0].y == 6) || (this.players[0].x == 6 && this.players[0].y == 6) || (this.players[0].x == 6 && this.players[0].y == 5))) {
            this.scene.add.text(500, 500, "You Win!", {color:"#FFFFFF"}).setOrigin(0.5);
            console.log(this.players[0].items)
            console.log("win");
        }
    }
        
    
}