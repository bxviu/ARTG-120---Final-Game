class Player extends Entity {
    constructor(scene, board, game, x, y, id, items, cards) {
        super(scene, board, game, id, x, y);
        this.items = items || [];
        this.cards = cards || [];
        this.mutations = [];
        let text = this.scene.add.text(0, 0, "P" + this.id, {color:COLOR_DARK}).setOrigin(0.5);
        let image = this.scene.add.rectangle(0, 0, 20, 20, 0xffffff).setOrigin(0.5);
        this.visual = this.scene.add.container(this.x, this.y, [image, text]).setDepth(1);
    }

    move(x, y) {
        super.move(x,y);    
        this.game.updateBoard();
    }

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

    checkCards() {
        this.mutations.forEach(mutation => {
            if (mutation.name == "LShapeOnly") {

            }
            if (mutation.name == "diagonalOnly") {
                
            }
            if (mutation.name == "upOrDownOnly") {
                
            }
            if (mutation.name == "leftOrRightOnly") {
                
            }
            if (mutation.name == "revealEarly") {
                
            }
            if (mutation.name == "revealLate") {
                
            }
            if (mutation.name == "itemHoldingDecrease") {
                
            }
            if (mutation.name == "itemHoldingIncrease") {
                
            }
            if (mutation.name == "teleportEscape") {
                
            }
        });
    }

}