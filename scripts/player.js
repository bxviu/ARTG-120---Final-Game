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