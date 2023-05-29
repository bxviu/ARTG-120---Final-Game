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

    drawMutation(array){
        let rand = Math.floor(Math.random() * 10);

        if(rand == 0 && array.indexOf("clearMuta")==-1){
            array.push("clearMuta");
            this.test = this.scene.add.image(100, 475, 'clearMuta');
            this.test.setScale(0.35);
        }else if(rand == 1 && array.indexOf("diagonal")==-1){
            array.push("diagonal");
            this.test = this.scene.add.image(100, 475, 'diagonal');
            this.test.setScale(0.35);
        }else if(rand == 2 && array.indexOf("extraItem")==-1){
            array.push("extraItem");
            this.test = this.scene.add.image(100, 475, 'extraItem');
            this.test.setScale(0.35);
        }else if(rand == 3 && array.indexOf("leftRight")==-1){
            array.push("leftRight");
            this.test = this.scene.add.image(100, 475, 'leftRight');
            this.test.setScale(0.35);
        }else if(rand == 4 && array.indexOf("oneItem")==-1){
            array.push("oneItem");
            this.test = this.scene.add.image(100, 475, 'oneItem');
            this.test.setScale(0.35);
        }else if(rand == 5 && array.indexOf("reveal2")==-1){
            array.push("reveal2");
            this.test = this.scene.add.image(100, 475, 'reveal2');
            this.test.setScale(0.35);
        }else if(rand == 6 && array.indexOf("reveal6")==-1){
            array.push("reveal6");
            this.test = this.scene.add.image(100, 475, 'reveal6');
            this.test.setScale(0.35);
        }else if(rand == 7 && array.indexOf("teleport")==-1){
            array.push("teleport");
            this.test = this.scene.add.image(100, 475, 'teleport');
            this.test.setScale(0.35);
        }else if(rand == 8 && array.indexOf("upDown")==-1){
            array.push("upDown");
            this.test = this.scene.add.image(100, 475, 'upDown');
            this.test.setScale(0.35);
        }else if(array.length >= 9){
            console.log("Array full");
        }else{
            this.scene.events.emit("drawMutation", array);
        }
    }

    removeCard(){
        this.cardLore.destroy();
        this.cardName.destroy();
        this.cardDes.destroy();
    }
    
}

class Display extends Phaser.Scene{
    constructor(){
        super('display');
        this.array;
    }
    init(array){
        this.array = array;
    }
    preload() {
        this.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');
        this.load.path = './assets/';
        this.load.image('clearMuta', 'clearmute.png');
        this.load.image('diagonal', 'diagonal.png');
        this.load.image('extraItem', 'extraitem.png');
        this.load.image('leftRight', 'leftright.png');
        this.load.image('oneItem', 'oneitem.png');
        this.load.image('reveal2', 'reveal2.png');
        this.load.image('reveal6', 'reveal6.png');
        this.load.image('teleport', 'teleport.png');
        this.load.image('upDown', 'updown.png');
    }
    create(){
        this.test = this.add.image(400, 290, 'clearMuta');
        this.left = this.add.text(300, 290, "<", {color: "#00ff00"}).setFontSize(50);
        this.left.setInteractive();
        this.left.on('pointerdown', () => {

        })
        this.right = this.add.text(470, 290, ">", {color: "#00ff00"}).setFontSize(50);
        this.right.setInteractive();
        this.right.on('pointerdown', () => {

        })
        this.test.setScale(0.35);
        this.leave = this.add.text(750, 0, "X").setFontSize(50);
        this.leave.setInteractive();
        this.leave.on('pointerdown', () => {
            this.scene.stop('display');
            this.scene.resume('examples');
        })
        console.log(this.array);
    }
}