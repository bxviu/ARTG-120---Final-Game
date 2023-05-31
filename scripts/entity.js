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
        console.log(this.board);
        if (this.board.contains(this.x, this.y, 0) != undefined) {
            this.board.removeChess(null, this.x, this.y, 0, true);
        }
        this.x = x;
        this.y = y;
    }

    updateVisual() {    
        if (this.board.contains(this.x, this.y, 0)) {
            // remove existing tile to avoid visual errors that come from adding another tile to it
            this.board.removeChess(null, this.x, this.y, 0, true);
        }
        this.scene.rexBoard.add.shape(this.board, this.x, this.y, 0, COLOR_PRIMARY).setScale(0.7);        
        let chess = this.board.tileXYZToChess(this.x, this.y, 0);
        if (this.visual) {
            this.visual.setPosition(chess.x, chess.y);
        }
    }

    die() {  
        // fade out the entity
        let chess = this.board.tileXYZToChess(this.x, this.y, 0);
        if (chess) {
            this.scene.tweens.addCounter({
                from: 1,
                to: 0,
                ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 1000,
                repeat: 0,            // -1: infinity
                yoyo: false,
                onUpdate(tween, targets, key, current, previous, param) {
                    // var value = current;
                    // var value = tween.getValue();
                    chess.fillAlpha = tween.getValue();
                }
            });
        }
    }
}