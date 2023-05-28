class UI {
    constructor(scene, game) {
        this.game = game
        this.scene = scene;
        this.itemsText = this.scene.add.text(10, 10, "Items: ");
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('clearMuta', 'clearmute.png');
        this.load.image('diagonal', 'diagonal.png');
        this.load.image('extraItem', 'extraItem.png');
        this.load.image('leftRight', 'leftright.png');
        this.load.image('oneItem', 'oneitem.png');
        this.load.image('reveal2', 'reveal2.png');
        this.load.image('reveal6', 'reveal6.png');
        this.load.image('teleport', 'teleport.png');
        this.load.image('upDown', 'updown.png');
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

    drawMutation(){
        
    }

    removeCard(){
        this.cardLore.destroy();
        this.cardName.destroy();
        this.cardDes.destroy();
    }
    
}