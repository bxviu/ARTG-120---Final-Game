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

    navigate(players) {
        //pass players so that the monster knows where the closest player is.
        let closestPlayer = -1
        let closestDistance = 50;
        //Owen 5/25/2023 find the closest player
        players.array.forEach(element => {
            let eX = element.x - this.x;
            let eY = element.y - this.y;
            let distance = Math.sqrt(Math.abs(eX**2 + eY**2));
            if (distance < closestDistance) {
                closestPlayer = element.id;
                closestDistance = distance;
            }
        });

        //Owen 5/25/2023 we know the closest player, figure out which way to move
        //we will advance on the axis that is farthest from the closest player
        
        pX = players[closestPlayer].x;
        pY = players[closestPlayer].y;
        
        dX = pX - this.x;
        dY = pY - this.y;
        
        let moveX = 0;
        let moveY = 0;


        //Owen 5/25/2023 this might be wrong, but might be right
        if (dX > 0) {
            moveX++;
        } 
        else if (dX < 0) {
            moveX--;
        }

        if (dY > 0) {
            moveX++;
        } 
        else if (dY < 0) {
            moveX--;
        }

        this.move(this.x + moveX, this.y + moveY);


        //Owen 5/25/2023 commented out random move code
        /*let moveX = Math.random() > 0.5 ? 1 : -1;
        let moveY = Math.random() > 0.5 ? 1 : -1;
        do {
            moveX = Math.random() > 0.5 ? 1 : -1;
            moveY = Math.random() > 0.5 ? 1 : -1;
        } while (this.x+moveX < 0 || this.x+moveX > this.board.width-1 || this.y+moveY < 0 || this.y+moveY > this.board.height-1);
        */
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