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
        if (this.board.contains(this.x, this.y, 0)) {
            this.board.removeChess(null, this.x, this.y, 0, true);
        }
        this.x = x;
        this.y = y;
    }

    updateVisual() {    
        if (this.board.contains(this.x, this.y, 0)) {
            this.board.removeChess(null, this.x, this.y, 0, true);
        }
        this.scene.rexBoard.add.shape(this.board, this.x, this.y, 0, COLOR_PRIMARY).setScale(0.7);        
        let chess = this.board.tileXYZToChess(this.x, this.y, 0);
        if (this.visual) {
            this.visual.setPosition(chess.x, chess.y);
        }
    }
}