let turn = 1;

class Player extends Entity {
    constructor(scene, board, game, x, y, id, items, cards) {
        super(scene, board, game, id, x, y);
        this.items = items || [];
        this.cards = cards || [];
        this.actionCard = "none";
        this.mutations = [];
        let text = this.scene.add.text(0, 0, "P" + this.id, {color:COLOR_DARK}).setOrigin(0.5);
        let image = this.scene.add.rectangle(0, 0, 20, 20, 0xffffff).setOrigin(0.5);
        this.visual = this.scene.add.container(this.x, this.y, [image, text]).setDepth(1);
        this.possibleCoords = [];
        this.revealLocationRounds = 4;
        this.itemSpace = 2;
        this.secondChance = false;
        this.scene.events.on("action", (card) => {
            this.actionCard = card;
            console.log(card);
            if (card == "closer") {
                // moves a random item closer to the player
                let randomItem = this.game.items[Math.floor(Math.random() * this.game.items.length)];
                var ABVector = {x: this.x - randomItem.x, y: this.y - randomItem.y};

                // Normalize the ABVector
                var ABVectorLength = Math.sqrt(ABVector.x * ABVector.x + ABVector.y * ABVector.y);
                var normalizedABVector = {x: ABVector.x / ABVectorLength, y: ABVector.y / ABVectorLength};

                // Calculate the target coordinate
                var targetCoordinate = {x: Math.ceil(randomItem.x + 2 * normalizedABVector.x), y: Math.ceil(randomItem.y + 2 * normalizedABVector.y)};
                // console.log(targetCoordinate);
                randomItem.move(targetCoordinate.x, targetCoordinate.y);
                randomItem.updateVisual();
                // this.game.updateBoard();
            }
            else if (card == "escape") {
                this.secondChance = true;
                this.addSecondChanceVisual();
            }
            else if (card == "extraSpace") {
                this.game.extraTurn = true;
            }
            else if (card = "jump8") {
                this.jump8();
            }
            else {
                this.actionCard = "none";
            }
        });
    }

    move(x, y) {
        super.move(x,y);    
        this.game.updateBoard();
        if(turn != 1){
            this.scene.events.emit("removeCard");
        }
    }

    showPossibleSpaces() {        
        this.possibleCoords = [];
        let hasMutation = false;
        // console.log(this.mutations);
        this.mutations.forEach(mutation => {
            if (mutation == "lShape") {
                this.showSpacesL();
                hasMutation = true;
            }
            if (mutation == "2OutCorner") {
                this.showSpacesCorners2Out();
                hasMutation = true;
            }
            if (mutation == "2OutMiddle") {
                this.showSpacesMiddle2Out();
                hasMutation = true;
            }
            if (mutation == "3OutMiddle") {
                this.showSpacesMiddle3Out();
                hasMutation = true;
            }
            if (mutation == "diagonal") {
                this.showSpacesDiagonal();
                hasMutation = true;
            }          
            if (mutation == "leftRight") {
                this.showSpacesLeftRight();
                hasMutation = true;
            }
            if (mutation == "upDown") {
                this.showSpacesUpDown();
                hasMutation = true;
            }
        });
        if (!hasMutation) {
            this.showSpacesNormal();
        }
    }

    showSpacesNormal() {
        // console.log(this.possibleCoords);
        let resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [0, 1, 2, 3, 4, 5, 6, 7], { end: 1 });
        this.possibleCoords = [...this.possibleCoords, ...resultTileXYArray];
        this.showGivenSpaces();
    }

    showSpacesL() {
        // coordinates in an L shape around the player
        this.possibleCoords = [...this.possibleCoords, {x:this.x+2, y:this.y+1},
            {x:this.x+2, y:this.y-1}, 
            {x:this.x+1, y:this.y-2}, 
            {x:this.x-1, y:this.y-2}, 
            {x:this.x-2, y:this.y+1}, 
            {x:this.x-2, y:this.y-1}, 
            {x:this.x-1, y:this.y+2}, 
            {x:this.x+1, y:this.y+2}];  
        // since these mutations can stack, append the new coordinates to the existing ones
        this.showGivenSpaces();
    }

    showSpacesDiagonal() {
        let resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [0, 1, 2, 3], { end: 1 });
        this.possibleCoords = [...this.possibleCoords, ...resultTileXYArray];
        this.showGivenSpaces();
    }

    showSpacesLeftRight() {
        let resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [5,7], { end: 1 });
        this.possibleCoords = [...this.possibleCoords, ...resultTileXYArray];  
        this.showGivenSpaces();
    }

    showSpacesUpDown() {
        let resultTileXYArray = this.board.getTileXYAtDirection({x:this.x, y:this.y}, [4, 6], { end: 1 });
        this.possibleCoords = [...this.possibleCoords, ...resultTileXYArray];  
        this.showGivenSpaces();
    }

    showSpacesCorners2Out() {
        this.possibleCoords = [...this.possibleCoords,
            {x:this.x-2, y:this.y-2}, 
            {x:this.x+2, y:this.y-2}, 
            {x:this.x-2, y:this.y+2}, 
            {x:this.x+2, y:this.y+2}];  
        this.showGivenSpaces();
    }

    showSpacesMiddle2Out() {
        this.possibleCoords = [...this.possibleCoords, 
            {x:this.x, y:this.y-2},
            {x:this.x+2, y:this.y}, 
            {x:this.x, y:this.y+2}, 
            {x:this.x-2, y:this.y}];  
        this.showGivenSpaces();
    }

    showSpacesMiddle3Out() {
        this.possibleCoords = [...this.possibleCoords, 
            {x:this.x, y:this.y-3},
            {x:this.x+3, y:this.y}, 
            {x:this.x, y:this.y+3}, 
            {x:this.x-3, y:this.y}];  
        this.showGivenSpaces();
    }

    showGivenSpaces() {         
        this.possibleCoords.forEach(coord => {

            if (this.board.tileXYZToChess(coord.x, coord.y, -1)) {
                // remove existing tile if it exists to avoid visual glitch of adding on top of it
                this.board.removeChess(null, coord.x, coord.y, -1, true);
            }
            this.scene.rexBoard.add.shape(this.board, coord.x, coord.y, -1, COLOR_LIGHT).setScale(1);
            if (this.board.tileXYZToChess(coord.x, coord.y, -1)) {
                this.board.tileXYZToChess(coord.x, coord.y, -1).fillAlpha = 0.5;
            }
        });  
    }

    showDetectionRadius() {
        // radius where player can see the monster no matter what
        let radius = 2;
        let coordinates = [];

        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                let x = this.x + i;
                let y = this.y + j;
                coordinates.push({ x: x, y: y });
            }
        }
    
        coordinates.forEach(coord => {
            this.board.removeChess(null, coord.x, coord.y, -2, true);
            this.scene.rexBoard.add.shape(this.board, coord.x, coord.y, -2, 0xED7014).setScale(1);
            if (this.board.tileXYZToChess(coord.x, coord.y, -2)) {
                this.board.tileXYZToChess(coord.x, coord.y, -2).fillAlpha = 0.15;
            }
        }); 
    }

    gainItem(item) {
        this.items.push(item);
    }

    gainCard(card) {
        this.cards.push(card);
    }

    teleportEscape(distance) {
        // gets a random location a certain distance away from the player and moves the player there
        var centerX = this.x;
        var centerY = this.y;
        var distance = distance;
        var coordinates = [];

        for (var i = -distance; i <= distance; i++) {
            for (var j = -distance; j <= distance; j++) {
                var x = centerX + i;
                var y = centerY + j;
                var currentDistance = Math.abs(centerX - x) + Math.abs(centerY - y);
    
                if (currentDistance === distance) {
                    coordinates.push({ x: x, y: y });
                }
            }
        }

        var randomIndex = Math.floor(Math.random() * coordinates.length);
        while(!this.board.contains(coordinates[randomIndex].x, coordinates[randomIndex].y)) {
            randomIndex = Math.floor(Math.random() * coordinates.length);
        }
        this.scene.rexBoard.add.shape(this.board, this.x, this.y, 2, COLOR_PRIMARY).setScale(1);

        let ch = this.board.tileXYZToChess(this.x, this.y, 2);
        this.scene.tweens.addCounter({
            from: 1,
            to: 2,
            delay: 500,
            ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0,            // -1: infinity
            yoyo: false,
            onComplete: () => {
                this.move(coordinates[randomIndex].x, coordinates[randomIndex].y);
                ch = this.board.tileXYZToChess(this.x, this.y, 2);
                this.scene.tweens.addCounter({
                    from: 2,
                    to: 1,
                    ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 500,
                    repeat: 0,            // -1: infinity
                    yoyo: false,
                    onComplete: () => {
                        this.board.removeChess(null, this.x, this.y, 2, true);
                        if (this.secondChance) {
                            this.secondChance = false;
                        }
                    },
                    onUpdate(tween, targets, key, current, previous, param) {
                        if (ch) {
                            ch._scaleX = tween.getValue();
                            ch._scaleY = tween.getValue();
                        }
                    }
                    
                });
            },
            onUpdate(tween, targets, key, current, previous, param) {
                if (ch) {
                    ch._scaleX = tween.getValue();
                    ch._scaleY = tween.getValue();
                }
            } 
        });
        // this.move(coordinates[randomIndex].x, coordinates[randomIndex].y);
    }

    jump8() {
        // gets spots 8 spaces away from the player and adds them to the possibleCoords array for them to possibly use
        var centerX = this.x;
        var centerY = this.y;
        var distance = 8;
        var coordinates = [];

        for (var i = -distance; i <= distance; i++) {
            for (var j = -distance; j <= distance; j++) {
                var x = centerX + i;
                var y = centerY + j;
                var currentDistance = Math.abs(centerX - x) + Math.abs(centerY - y);
    
                if (currentDistance === distance) {
                    coordinates.push({ x: x, y: y });
                }
            }
        }

        this.possibleCoords = [...this.possibleCoords, ...coordinates]; 
        this.showGivenSpaces();
    }

    checkCards() {
        let roundRevealModified = false;
        let itemSpaceModified = false;
        this.mutations.forEach(mutation => {
            if (roundRevealModified) {return;}
            if (itemSpaceModified) {return;}
            if (mutation == "reveal2") {
                this.revealLocationRounds = 2;
                roundRevealModified = true;
            }
            if (mutation == "reveal6") {
                this.revealLocationRounds = 6;
                roundRevealModified = true;
            }
            if (mutation == "oneItem") {
                this.itemSpace = 1;          
                itemSpaceModified = true;
                this.dropItems();
            }
            if (mutation == "extraItem") {
                this.itemSpace = 3;
                itemSpaceModified = true;
            }
        });
        if (!roundRevealModified) {
            this.revealLocationRounds = 4;
        }
        if (!itemSpaceModified) {
            this.itemSpace = 2;
            this.dropItems();
        }
        if (this.secondChance) {
            this.addSecondChanceVisual();
        }
    }

    dropItems() {
        let droppedItem = null;
        let droppedX = 0;
        let droppedY = 0;
        // repeatedly drops items until the amount is equal to the itemspace
        while (this.items.length > this.itemSpace) {
            droppedItem = this.items.pop();
            // drops the item 1 space away from the player randomly
            while (!this.board.contains(this.x + droppedX, this.y + droppedY) 
                    && (droppedX == 0 && droppedY == 0) 
                    || this.board.contains(this.x + droppedX, this.x + droppedY, 0)) 
            {
                droppedX = Math.floor(Math.random() * 3) - 1;
                droppedY = Math.floor(Math.random() * 3) - 1;
            }
            console.log(this.x + droppedX, this.y + droppedY, droppedItem.id, droppedItem.name);
            this.game.items.push(this.game.createItem(this.x + droppedX, this.y + droppedY, droppedItem.id, droppedItem.name));
            this.game.items[this.game.items.length - 1].updateVisual();
        }
    }

    addSecondChanceVisual() {
        // a glow to help show the player is protected by a card effect
        this.board.removeChess(null, this.x, this.y, 1, true);
        this.scene.rexBoard.add.shape(this.board, this.x, this.y, 1, 0x009900).setScale(1);
        if (this.board.tileXYZToChess(this.x, this.y, 1)) {
            this.board.tileXYZToChess(this.x, this.y, 1).fillAlpha = 0.35;
        }
    }

}