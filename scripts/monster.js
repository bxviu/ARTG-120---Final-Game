class Monster extends Entity {
    constructor(scene, board, game, x, y, id, cards) {
        super(scene, board, game, id, x, y);
        this.oldx = x;
        this.oldy = y;
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

    showOldLocation(){
        if (this.board.contains(this.oldx, this.oldy, 0)) {
            this.board.removeChess(null, this.oldx, this.oldy, 0, true);
        }
        this.scene.rexBoard.add.shape(this.board, this.oldx, this.oldy, 0, COLOR_PRIMARY).setScale(0.7).fillAlpha = 0.5;        
        let chess = this.board.tileXYZToChess(this.oldx, this.oldy, 0);
        if (this.visual) {
            this.visual.setPosition(chess.x, chess.y);
        }
    }

    updateVisual() {  
        super.updateVisual();
        this.oldx = this.x;
        this.oldy = this.y;
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