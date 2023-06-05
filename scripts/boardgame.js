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
        this.altarItems = [];
        this.navigated = false;
        this.extraTurn = false;
        this.hoverOverAnimationSpaces = [];
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
        }
        this.monster = this.createMonster(11, 11, []);
        this.turn.push(-1);
        // the items
        this.items.push(this.createItem(6, 9, 0, "Salt"));
        this.items.push(this.createItem(11, 4, 1, "Crowbar"));
        this.items.push(this.createItem(2, 3, 2, "Book"));
        this.items.push(this.createItem(7, 1, 3, "Torch"));
        this.items.push(this.createItem(1, 10, 4, "Cross"));
        this.initializeBoard();

        this.updateBoard();

        this.startGame();
    }

    initializeBoard() {
        this.board
        .setInteractive()
        .on('tiledown', (pointer, tileXY) => {
           
            if (!this.board.contains(tileXY.x, tileXY.y)) {
                return;
            }
            // if it is the player's turn, check if the player allowed to move to the tile
            // move player there if valid space
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
            // if it is the player's turn, change opacity of tiles that player allowed to move to,
            // to a more opaque value, only if mouse goes over the tile
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
                        let ch = this.board.tileXYZToChess(tileXY.x, tileXY.y, -1);
                        // console.log(this.board.tileXYZToChess(tileXY.x, tileXY.y, -1));
                        // create animation where tile gets bigger and smaller
                        let anim = this.scene.tweens.addCounter({
                            from: 0.5,
                            to: 1.05,
                            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                            duration: 350,
                            repeat: -1,            // -1: infinity
                            yoyo: true,
                            onUpdate(tween, targets, key, current, previous, param) {
                                ch._scaleX = tween.getValue();
                                ch._scaleY = tween.getValue();
                                ch.fillAlpha = tween.getValue();
                            }
                        });
                        this.hoverOverAnimationSpaces.push(anim);
                    }
                }
            });
        })        
        .on('tileout', (pointer, tileXY) => {
            this.hoverOverAnimationSpaces.forEach(tween => {
                // stop animation of tile mouseover
                tween.stop();
                let tile = this.board.tileXYZToChess(tileXY.x, tileXY.y, -1);
                if (tile) {
                    // set tile scale back to normal
                    tile._scaleX = 1;
                    tile._scaleY = 1;
                }
            });
            this.players.forEach(player => {
                // if it is the player's turn, change opacity of tiles that player allowed to move to,
                // back to normal, only if mouse goes off the tile
                if (this.turn[this.currentTurn] == player.id) {
                    let validSpace = false;
                    player.possibleCoords.forEach(coord => {
                        if (coord.x == tileXY.x && coord.y == tileXY.y) {
                            validSpace = true;
                        }
                    });
                    if (validSpace) {
                        this.board.tileXYZToChess(tileXY.x, tileXY.y, -1).fillAlpha = 0.5;
                    }
                }
            });
        });
        
    }

    startGame() {
        this.currentTurn = 0;
        this.players[0].showPossibleSpaces();
        this.items.forEach(item => {
            item.updateVisual();
        });
    }

    nextTurn() {
        if (this.players[0].offBoard) {
            return;
        }
        if (!this.extraTurn) {
            this.currentTurn = this.currentTurn + 1;
        }
        else {
            // this is from the action card effect of moving an extra space
            // sets the turn back to the player and shows spaces again with
            // a delay
            this.currentTurn = -999;
            this.scene.time.delayedCall(150, () => {
                this.currentTurn = 0;
                this.players[0].showPossibleSpaces();
            });
            this.extraTurn = false;
        }
        this.players[0].checkCards();
        if (this.currentTurn > this.turn.length - 1) {
            this.currentTurn = 0;
            this.round = this.round + 1;
            // player gains a mutation every round
            this.scene.events.emit("drawMutation", this.players[0].mutations);
            // player gains an action card every 2 rounds
            if (this.round % 2 == 0) {
                this.scene.events.emit("gainCard");
            }
        }
        // monster movement
        if (this.turn[this.currentTurn] == -1 && !this.navigated && !this.monster.offBoard) {
            this.navigated = true;
            this.scene.time.delayedCall(250, () => {
                this.monster.navigate(this.players);
                // check if monster is overlapping player and whether they have an escape options
                let escaped = this.monsterOverlaps();
                // modify the delayed call time depending on if player is caught (an animation plays if they 
                // are caught, so the time is longer)
                let time = 350;
                if (escaped) {
                    time = 1550;
                }
                this.scene.time.delayedCall(time, () => {
                    this.players[0].showPossibleSpaces();
                    this.nextTurn();
                    this.navigated = false;
                });
            });
        }
    }
    

    updateBoard() {
        this.scene.cameras.main.setZoom(1.6);
        // clear everything
        this.board.removeAllChess(true);

        // check if entities overlap
        this.itemOverlaps();
        this.playerOverlaps();

        // redraw entities
        this.players.forEach(player => {
            player.updateVisual();
            // player.showDetectionRadius();
        });
        let pco = this.board.tileXYZToChess(this.players[0].x, this.players[0].y, 0);
        let mco = {x: this.monster.x, y: this.monster.y};
        if (this.round % this.players[0].revealLocationRounds == 0 || this.board.getDistance(pco,mco) <= 3.5) {
            // show monster location if enough rounds have passed or the monster is close to the player
            this.monster.updateVisual();
        }
        else {
            this.monster.showOldLocation();
        }
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
        // check all items if player is the same coordinate
        // only adds item to inventory if player has enough space
        this.items.forEach(item => {
            if (!item.offBoard && this.players[0].itemSpace > this.players[0].items.length && item.x == this.players[0].x && item.y == this.players[0].y) {
                // console.log("overlap");
                this.players[0].gainItem(item);
                item.showInfo();
                this.items.splice(this.items.indexOf(item), 1);
                item.removeItemfromBoard();
            }
        });
    }

    playerOverlaps() {
        // checking if player is in the coordinates for the altar
        // if they have items, give it to the altar
        // if the altar has all the items, win the game
        if (((this.players[0].x == 5 && this.players[0].y == 5) || (this.players[0].x == 5 && this.players[0].y == 6) || (this.players[0].x == 6 && this.players[0].y == 6) || (this.players[0].x == 6 && this.players[0].y == 5))) {
            if (this.altarItems.length < 5) {
                console.log("altar");
                this.altarItems.push(...this.players[0].items);
                console.log(this.altarItems);
                this.players[0].items = [];
            }
            if (this.altarItems.length >= 5) {
                this.monster.die();
                this.scene.add.text(500, 500, "You Win!", {color:"#FFFFFF"}).setOrigin(0.5);
                console.log("win");                
                this.scene.time.delayedCall(1250, () => {
                    this.scene.scene.start("end", {wonGame:true});
                });
            }
        }
    }
        
    monsterOverlaps() {
        // see if player has escacpe options and use them, if not player dies
        if (this.players[0].x == this.monster.x && this.players[0].y == this.monster.y) {
            console.log("bruh_");
            if (this.players[0].mutations.find(mutation => mutation == "teleport") != undefined) {
                console.log("teke");

                this.players[0].teleportEscape(7);
                this.players[0].mutations.splice(this.players[0].mutations.findIndex(object => {
                    return object == "teleport";
                  }), 1);
                return true;
            }
            if (this.players[0].secondChance) {
                console.log("escape");

                this.players[0].teleportEscape(3);
                return true;
            }
            else {
                this.players[0].die();
                this.scene.add.text(500, 500, "You Died...", {color:"#FFFFFF"}).setOrigin(0.5);
                this.scene.time.delayedCall(1250, () => {
                    this.scene.scene.start("end", {wonGame:false});
                });
            }
        }
        return false;
    }
    
}