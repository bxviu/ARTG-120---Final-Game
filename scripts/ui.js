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
        this.scene.add.rectangle(700, 450, 150, 220, 0xaaff33).setOrigin(0.5);
        console.log(card.description);
        this.cardName = this.scene.add.text(700, 350, card.name, {color:"#000000"}).setOrigin(0.5);
        this.cardLore = this.scene.add.text(700, 550, card.lore, {color:"#000000"}).setOrigin(0.5);
        this.cardDes = this.scene.add.text(700, 480, card.description, {color: "#000000"}).setOrigin(0.5).setFontSize(12);
    }

    removeCard(){
        this.cardLore.destroy();
        this.cardName.destroy();
        this.cardDes.destroy();
    }
    
}