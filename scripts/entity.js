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

    updateVisual(color) {    
        if (this.board.contains(this.x, this.y, 0)) {
            // remove existing tile to avoid visual errors that come from adding another tile to it
            this.board.removeChess(null, this.x, this.y, 0, true);
        }
        if (color) {
            this.scene.rexBoard.add.shape(this.board, this.x, this.y, 0, color).setScale(0.7);       
        }
        else {
            this.scene.rexBoard.add.shape(this.board, this.x, this.y, 0, COLOR_PRIMARY).setScale(0.7);       
        } 
        let chess = this.board.tileXYZToChess(this.x, this.y, 0);
        if (this.visual) {
            this.scene.tweens.add({
                x: chess.x,
                y: chess.y,
                targets: this.visual,
                ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 100,
                repeat: 0,            // -1: infinity
            });
            this.scene.time.delayedCall(150, () => {
                this.visual.setPosition(chess.x, chess.y);
            });

        }

    }

    die() {  
        // fade out the space on the board
        let chess = this.board.tileXYZToChess(this.x, this.y, 0);
        this.offBoard = true;
        if (chess) {
            this.scene.tweens.addCounter({
                from: 1,
                to: 0,
                ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                duration: 1000,
                repeat: 0,            // -1: infinity
                yoyo: false,
                onUpdate(tween, targets, key, current, previous, param) {
                    chess.fillAlpha = tween.getValue();
                }
            });
        }
    }
}