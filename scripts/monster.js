class Monster extends Entity {
    constructor(scene, board, game, x, y, id, cards) {
        super(scene, board, game, id, x, y);
        this.oldx = x;
        this.oldy = y;
        this.cards = cards || [];
        let text = this.scene.add.text(0, 0, "", {color:COLOR_DARK});//this.scene.add.text(0, 0, "M", {color:COLOR_DARK}).setOrigin(0.5);
        let image = this.scene.add.image(5, 25, "monster").setScale(0.15);
        // image.originY = 1;
        // image.originX = 1;
        console.log(image);
        this.visual = this.scene.add.container(this.x, this.y, [image, text]).setDepth(1);
        this.visual.setDepth(1);
    }

    move(x, y) {
        super.move(x,y);
        // this.updateVisual();
        this.game.updateBoard();

    }

    navigate(players) {
        //Owen 5/25/2023 pass players so that the monster knows where the closest player is.
        let chanceToMove = 0.70;

        if (Math.random() > chanceToMove) {
            console.log("Monster chose not to move");
            return;
        }
        
        let closestPlayer = -1
        let closestDistance = 50;
        //Owen 5/25/2023 find the closest player
        players.forEach(element => {
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

        //Owen 5/26/2023 if the closest player is far away, fudge its position
        let fX = 0;
        let fY = 0;
        if (closestDistance > 3) {
            fX = Math.random() > 0.5 ? 1 : -1;
            fY = Math.random() > 0.5 ? 1 : -1;
        }

        let pX = players[closestPlayer].x + fX;
        let pY = players[closestPlayer].y + fY;

        console.log("Monster targeting: (" + pX + ", " + pY + ")");
        
        let dX = pX - this.x;
        let dY = pY - this.y;
        
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
            moveY++;
        } 
        else if (dY < 0) {
            moveY--;
        }

        //Owen 5/26/2023 make the monster slower
        
        let mX = this.x + moveX;
        let mY = this.y + moveY;
        console.log("Monster moving: (" + mX + ", " + mY + ")");

        this.move(mX, mY);


        //Owen 5/25/2023 commented out random move code
        /*let moveX = Math.random() > 0.5 ? 1 : -1;
        let moveY = Math.random() > 0.5 ? 1 : -1;
        do {
            moveX = Math.random() > 0.5 ? 1 : -1;
            moveY = Math.random() > 0.5 ? 1 : -1;
        } while (this.x+moveX < 0 || this.x+moveX > this.board.width-1 || this.y+moveY < 0 || this.y+moveY > this.board.height-1);
        */
    }

    showOldLocation(){
        if (this.board.contains(this.oldx, this.oldy, 0)) {
            this.board.removeChess(null, this.oldx, this.oldy, 0, true);
        }
        this.scene.rexBoard.add.shape(this.board, this.oldx, this.oldy, 0, 0xFF0000).setScale(0.7).fillAlpha = 0.5;        
        let chess = this.board.tileXYZToChess(this.oldx, this.oldy, 0);
        if (this.visual) {
            this.visual.setPosition(chess.x, chess.y);
            this.visual.setAlpha(0.5);
        }
    }

    updateVisual(color) {  
        super.updateVisual(color);
        this.visual.setAlpha(1);
        this.oldx = this.x;
        this.oldy = this.y;
    }
    
    die() {  
        super.die();
        // this.scene.events.emit("status", "Phew");
        // fade out and shrink the image
        this.scene.tweens.add({
            targets: this.visual,
            alpha: 0,
            scale: 0.01,
            duration: 100
        });
    }
}