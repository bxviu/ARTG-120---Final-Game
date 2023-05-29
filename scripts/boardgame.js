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
        this.round = 0;
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
        this.items.push(this.createItem(1, 1, 3, "test"));
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
                    // console.log(tileXY)
                    let validSpace = false;
                    player.possibleCoords.forEach(coord => {
                        if (coord.x == tileXY.x && coord.y == tileXY.y) {
                            validSpace = true;
                        }
                    });
                    if (validSpace) {
                        player.move(tileXY.x, tileXY.y);
                        this.nextTurn();
                    }
                    else {
                        console.log("failed")
                    }
                }
                
            });
        })
        .on('tileover', (pointer, tileXY) => {
            // console.log(this.rexBoard);
            this.players.forEach(player => {
                if (this.turn[this.currentTurn] == player.id) {
                    let validSpace = false;
                    player.possibleCoords.forEach(coord => {
                        if (coord.x == tileXY.x && coord.y == tileXY.y) {
                            validSpace = true;
                        }
                    });
                    if (validSpace) {
                        this.board.tileXYZToChess(tileXY.x, tileXY.y, -1).fillAlpha = 1;
                        // let ch = this.board.tileXYZToChess(tileXY.x, tileXY.y, -1);
                        // console.log(this.board.tileXYZToChess(tileXY.x, tileXY.y, -1));
                        // this.scene.tweens.addCounter({
                        //     from: 0.5,
                        //     to: 1.05,
                        //     ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                        //     duration: 350,
                        //     repeat: -1,            // -1: infinity
                        //     yoyo: true,
                        //     onUpdate(tween, targets, key, current, previous, param) {
                        //         // var value = current;
                        //         // var value = tween.getValue();
                        //         ch._scaleX = tween.getValue();
                        //         ch._scaleY = tween.getValue();
                        //     }
                        // });
                        // this.board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
                        // this.scene.rexBoard.add.shape(this.board, tileXY.x, tileXY.y, 0, COLOR_PRIMARY).setScale(0.7); 
                    }
                }
            });
        })        
        .on('tileout', (pointer, tileXY) => {
            // this.scene.tweens.getTweens().forEach(tween => {
            //     tween.seek(300);
            //     this.scene.time.delayedCall(5, () => {
            //         tween.stop();
            //     });
            //     // tween.destroy();
            // });
            this.players.forEach(player => {
                if (this.turn[this.currentTurn] == player.id) {
                    let validSpace = false;
                    player.possibleCoords.forEach(coord => {
                        if (coord.x == tileXY.x && coord.y == tileXY.y) {
                            validSpace = true;
                        }
                    });
                    if (validSpace) {
                        this.board.tileXYZToChess(tileXY.x, tileXY.y, -1).fillAlpha = 0.5;
                        // this.board.removeChess(null, tileXY.x, tileXY.y, 0,  true);
                        // this.scene.rexBoard.add.shape(this.board, tileXY.x, tileXY.y, 0, COLOR_LIGHT).setScale(0.7); 
                    }
                }
            });
        });
        
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
            this.round = this.round + 1;
            // console.log(this.round);
            
            this.scene.events.emit("drawMutation", this.players[0].mutations);
            this.scene.events.emit("gainCard");
        }
        if (this.turn[this.currentTurn] == -1) {
            this.monster.navigate();
            this.scene.time.delayedCall(500, () => {
                this.players[0].showPossibleSpaces();
                this.nextTurn();
            });
        }
    }
    

    updateBoard() {
        // clear everything
        this.board.removeAllChess(true);

        // check if player overlaps item
        this.itemOverlaps();
        this.playerOverlaps();

        // redraw entities
        this.players.forEach(player => {
            player.updateVisual();
        });
        if (this.round % 4 == 0) {
            this.monster.updateVisual();
            // console.log("1")
        }
        else {
            this.monster.showOldLocation();
            // console.log("2")
        }
        // console.log(this.items);
        this.items.forEach(item => {
            item.updateVisual();
        });
        // the altar
        this.scene.rexBoard.add.shape(this.board, 5, 5, 0, 0xFF0000).setScale(0.7);
        this.scene.rexBoard.add.shape(this.board, 5, 6, 0, 0xFF0000).setScale(0.7);
        this.scene.rexBoard.add.shape(this.board, 6, 6, 0, 0xFF0000).setScale(0.7);
        this.scene.rexBoard.add.shape(this.board, 6, 5, 0, 0xFF0000).setScale(0.7);
     }

    itemOverlaps() {
        this.items.forEach(item => {
            if (!item.offBoard && item.x == this.players[0].x && item.y == this.players[0].y) {
                console.log("overlap");
                this.players[0].gainItem(item);
                // this.board.removeChess(null, item.x, item.y, 0, true);
                this.items.splice(this.items.indexOf(item), 1);
                item.removeItemfromBoard();
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