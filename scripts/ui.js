class UI {
    constructor(scene, game) {
        this.game = game
        this.scene = scene;
        this.itemsText = this.scene.add.text(10, 10, "Items: ");
    }

    updateItemsText() {
        let itemList = "";
        this.game.players[0].items.forEach(item => {
            itemList += item.name + " ";
        });
        this.itemsText.setText("Items: " + itemList);
    
    }

    drawCard(card) {
        let bruh = this.scene.add.rectangle(700, 450, 100, 170, 0xaaff33).setOrigin(0.5);
        this.scene.add.text(700, 450, card.name, {color:0xFFFFFF}).setOrigin(0.5).setDepth(10);
        this.scene.add.text(700, 550, card.description, {color:0xFFFFFF}).setOrigin(0.5).setDepth(11);
    }
    
}