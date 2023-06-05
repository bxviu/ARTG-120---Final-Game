class Item extends Entity {
    constructor(scene, board, game, x, y, id, name) {
        super(scene, board, game, id, x, y);
        let text = this.scene.add.text(0, 0, "", {color:COLOR_DARK}).setOrigin(0.5); //this.scene.add.text(0, 0, name, {color:COLOR_DARK}).setOrigin(0.5);
        let image = null;//this.scene.add.rectangle(0, 0, 20, 20, 0xffffff).setOrigin(0.5);
        let imageX = 0;
        let imageY = -20;
        if (name == "Salt") {
            image = this.scene.add.image(imageX, imageY, 'salt-b').setOrigin(0.5);
        }
        else if (name == "Crowbar") {
            image = this.scene.add.image(imageX, imageY, 'crowbar-b').setOrigin(0.5);
        }
        else if (name == "Book") {
            image = this.scene.add.image(imageX, imageY, 'book-b').setOrigin(0.5);
        }
        else if (name == "Torch") {
            image = this.scene.add.image(imageX, imageY, 'torch-b').setOrigin(0.5);
        }
        else if (name == "Cross") {
            image = this.scene.add.image(imageX, imageY, 'cross-b').setOrigin(0.5);
        }
        if (image) {
            image.setScale(0.05).setAlpha(0.7);
        }
        this.visual = this.scene.add.container(this.x, this.y, [image, text]).setDepth(1);
        this.name = name;
    }

    showInfo() {
        // the lore box that pops up
        this.scene.scene.pause('examples');
        this.scene.scene.launch('iteminfo', {item: this});
    }

    removeItemfromBoard() {
        while (this.board.contains(this.x, this.y, 0)) {
            this.board.removeChess(null, this.x, this.y, 0, true);
        }
        this.offBoard = true;
        this.visual.destroy();
        this.visual = null;
    }
}