class UI {
    constructor(scene, game) {
        this.game = game
        this.scene = scene;
        this.itemsText = this.scene.add.text(10, 10, "Items: ");
        this.action;
        this.actionUsed = false;
    }

    updateItemsText() {
        let itemList = "";
        this.game.players[0].items.forEach(item => {
            itemList += item.name + " ";
        });
        this.itemsText.setText("Items: " + itemList);
    
    }

    drawCard() {
        //generates random action card
        let rand = Math.floor(Math.random() * 4);

        if(rand == 0){
            this.action = this.scene.add.image(715, 460, 'closer').setScale(0.38);
        }else if(rand == 1){
            this.action = this.scene.add.image(715, 460, 'escape').setScale(0.38);
        }else if(rand == 2){
            this.action = this.scene.add.image(715, 460, 'extraSpace').setScale(0.38);
        }else if(rand == 3){
            this.action = this.scene.add.image(715, 460, 'jump8').setScale(0.38);
        }else{
            this.scene.events.emit("gainCard");
        }
        this.action.setInteractive();
        this.actionUsed = false;

        //performs the action
        this.action.on('pointerdown', () => {
            if(this.actionUsed == false){
                console.log("Action");
                this.actionUsed = true;
            }
        })
    }

    drawMutation(array){
        //generates random number then adds mutation based on that number
        let rand = Math.floor(Math.random() * 10);

        if(rand == 0){
            this.test = this.scene.add.image(100, 475, 'clearMuta');
            this.test.setScale(0.35);
            if(array.length > 0){
                array.splice(Math.floor(Math.random() * array.length), 1);
                console.log("clear");
            }
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
            //if all the mutations are taken already it does nothing
            console.log("Array full");
        }else{
            //redraws it if it got a duplicate
            this.scene.events.emit("drawMutation", array);
        }
    }

    removeCard(){
        //need to change
        this.action.destroy();
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
        //used later to keep track of card number
        this.num = 1;
        //displays what card they are looking at out of how many they have
        this.numText = this.add.text(360, 0, this.num+"/"+this.array.length).setFontSize(50);
        //displays the first card
        this.currentCard = this.add.image(400, 290, this.array[0]).setScale(0.5);
        //left arrow
        this.left = this.add.text(280, 290, "<", {color: "#00ff00"}).setFontSize(50);
        this.left.setInteractive();
        this.left.on('pointerdown', () => {
            if(this.num > 1){
                this.currentCard.destroy();
                this.num--;
                this.numText.setText(this.num+"/"+this.array.length);
                this.currentCard = this.add.image(400, 290, this.array[this.num-1]).setScale(0.5);
            }
        })
        //right arrow
        this.right = this.add.text(494, 290, ">", {color: "#00ff00"}).setFontSize(50);
        this.right.setInteractive();
        this.right.on('pointerdown', () => {
            if(this.num < this.array.length){
                this.currentCard.destroy();
                this.num++;
                this.numText.setText(this.num+"/"+this.array.length);
                this.currentCard = this.add.image(400, 290, this.array[this.num-1]).setScale(0.5);
            }
        })
        //X to quit the ui
        this.leave = this.add.text(750, 0, "X").setFontSize(50);
        this.leave.setInteractive();
        this.leave.on('pointerdown', () => {
            this.scene.stop('display');
            this.scene.resume('examples');
        })
    }
}