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