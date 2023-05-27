let turn = 1;

class Player extends Entity {
    constructor(scene, board, game, x, y, id, items, cards) {
        super(scene, board, game, id, x, y);
        this.items = items || [];
        this.cards = cards || [];
        let card = new Card("LShapeOnly", "L-Shape", "You Gain Hooves", "You can only move in an L shape like the horse from chess.")
        let card2 = new Card("diagonalOnly", "Diagonal", "Your legs grow protrusions in such a way that you can't move straight.", "You can only move diagonally.")
        this.mutations = [];
        let text = this.scene.add.text(0, 0, "P" + this.id, {color:COLOR_DARK}).setOrigin(0.5);
        let image = this.scene.add.rectangle(0, 0, 20, 20, 0xffffff).setOrigin(0.5);
        this.visual = this.scene.add.container(this.x, this.y, [image, text]).setDepth(1);
        this.possibleCoords = [];
    }

    move(x, y) {
        super.move(x,y);    
        this.game.updateBoard();
        if(turn != 1){
            this.scene.events.emit("removeCard");
        }
        turn++;
    }

    showPossibleSpaces() {        
        this.possibleCoords = [];
        let hasMutation = false;
        // this.board.removeAllChess(true);

        this.mutations.forEach(mutation => {
            if (mutation.name == "LShapeOnly") {
                this.showSpacesL();
                hasMutation = true;
            }
            if (mutation.name == "diagonalOnly") {
                this.showSpacesDiagonal();
                hasMutation = true;
            }          
             
            if (mutation.name == "leftOrRightOnly") {
                this.showSpacesLeftRight();
                hasMutation = true;
            }

            if (mutation.name == "upOrDownOnly") {
                this.showSpacesUpDown();
                hasMutation = true;
            }

        });
        if (!hasMutation) {
            this.showSpacesNormal();
        }
    }

    showSpacesNormal() {
        console.log(this.possibleCoords);
        var resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [0, 1, 2, 3, 4, 5, 6, 7], { end: 1 });
        this.possibleCoords = [...this.possibleCoords, ...resultTileXYArray];
        this.showGivenSpaces();
    }

    showSpacesL() {
        this.possibleCoords = [...this.possibleCoords, {x:this.x+2, y:this.y+1},
            {x:this.x+2, y:this.y-1}, 
            {x:this.x+1, y:this.y-2}, 
            {x:this.x-1, y:this.y-2}, 
            {x:this.x-2, y:this.y+1}, 
            {x:this.x-2, y:this.y-1}, 
            {x:this.x-1, y:this.y+2}, 
            {x:this.x+1, y:this.y+2}];  
        this.showGivenSpaces();
    }

    showSpacesDiagonal() {
        var resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [0, 1, 2, 3], { end: 1 });
        this.possibleCoords = [...this.possibleCoords, ...resultTileXYArray];
        this.showGivenSpaces();
    }

    showSpacesLeftRight() {
        var resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [5,7], { end: 1 });
        this.possibleCoords = [...this.possibleCoords, ...resultTileXYArray];  
        this.showGivenSpaces();
    }

    showSpacesUpDown() {
        var resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [4, 6], { end: 1 });
        this.possibleCoords = [...this.possibleCoords, ...resultTileXYArray];  
        this.showGivenSpaces();
    }

    showGivenSpaces() {         
        this.possibleCoords.forEach(coord => {
            if (!this.board.contains(coord.x, coord.y)) {
                return;
            }
            if (this.game.monster.x == coord.x && this.game.monster.y == coord.y) {
                return;
            }
            if (this.game.items.find(item => !item.offBoard && item.x == coord.x && item.y == coord.y)) {
                return;
            }
            this.board.removeChess(null, coord.x, coord.y, 0, true);
            this.scene.rexBoard.add.shape(this.board, coord.x, coord.y, 0, COLOR_LIGHT).setScale(0.7);
        });  
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