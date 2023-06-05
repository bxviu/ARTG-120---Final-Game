class UI {
    constructor(scene, game) {
        this.game = game
        this.scene = scene;
        this.itemsText = this.scene.add.text(160, 120, "Items: ");
        this.itemsText.setScrollFactor(0).setDepth(4);
        this.inventoryVisual = [];
        this.action;
        this.actionUsed = false;
        this.mutationCardVisual = null;
    }

    updateItemsText() {
        if (this.game.players[0].itemSpace == 1) {
            this.itemsText.setText("Item: (Can hold " + this.game.players[0].itemSpace + ")");
        }
        else {
            this.itemsText.setText("Items: (Can hold " + this.game.players[0].itemSpace + ")");
        }
        this.inventoryVisual.forEach(item => {
            item.destroy();
        });
        let imageX = 190;
        let imageY = 165;
        this.game.players[0].items.forEach(item => {
            let image = null;
            if (item.name == "Salt") {
                image = this.scene.add.image(imageX, imageY, 'salt-b').setOrigin(0.5);
            }
            else if (item.name == "Crowbar") {
                image = this.scene.add.image(imageX, imageY, 'crowbar-b').setOrigin(0.5);
            }
            else if (item.name == "Book") {
                image = this.scene.add.image(imageX, imageY, 'book-b').setOrigin(0.5);
            }
            else if (item.name == "Torch") {
                image = this.scene.add.image(imageX, imageY, 'torch-b').setOrigin(0.5);
            }
            else if (item.name == "Cross") {
                image = this.scene.add.image(imageX, imageY, 'cross-b').setOrigin(0.5);
            }
            if (image) {
                image.setScale(0.05);
                image.setScrollFactor(0).setDepth(4);
                imageX += 70;
                this.inventoryVisual.push(image);
            }
        });    
    }

    drawCard() {
        //generates random action card
        let rand = Math.floor(Math.random() * 4);
        if (this.action != null){
            // this.scene.tweens.add({
            //     targets: this.action,
            //     y: 700,
            //     duration: 300,
            //     ease: "Sine.easeInOut",
            //     onComplete: () => {
                    this.action.destroy();
                // }
            // });
        }

        let x = 700;
        let y = 340;

        if(rand == 0){
            this.action = this.scene.add.image(x, y, 'closer').setScale(0.38);
        }else if(rand == 1){
            this.action = this.scene.add.image(x, y, 'escape').setScale(0.38);
        }else if(rand == 2){
            this.action = this.scene.add.image(x, y, 'extraSpace').setScale(0.38);
        }else if(rand == 3){
            this.action = this.scene.add.image(x, y, 'jump8').setScale(0.38);
        }else{
            this.scene.events.emit("gainCard");
        }
        this.action.setInteractive({useHandCursor: true});
        this.action.setScrollFactor(0).setDepth(4);
        this.actionUsed = false;
        let card = null;
        if (rand == 0) {
            card = "closer";
        }else if (rand == 1) {
            card = "escape";
        }else if (rand == 2) {
            card = "extraSpace";
        }else {
            card = "jump8";
        }
        //card moving into the screen left
        this.scene.tweens.add({
            targets: this.action,
            x: 570,
            duration: 300,
            ease: "Sine.easeInOut",
            onComplete: () => {
                if (!this.action)
                    return
                // card moving down into the corner
                this.scene.tweens.add({
                    targets: this.action,
                    y: 570,
                    duration: 200,
                    ease: "Sine.easeInOut",
                    onComplete: () => {
                        if (!this.action)
                            return
                        //performs the action
                        this.action.on('pointerdown', () => {
                            if(this.actionUsed == false){
                                console.log("Action");
                                this.scene.events.emit("action", card);
                                this.action.alpha = 0.5;
                                this.actionUsed = true;
                            }
                        })
                        .on('pointerover', () => {
                            this.scene.tweens.add({
                                targets: this.action,
                                y: this.action.y - 200,
                                duration: 200,
                                onComplete: () => {
                                    this.action.y = 350;
                                    // if (!this.actionUsed)
                                        // this.action.alpha = 1;
                                }
                            })
                        })
                        .on('pointerout', () => {
                            this.scene.tweens.add({
                                targets: this.action,
                                y: this.action.y + 200,
                                duration: 300,
                                onComplete: () => {
                                    this.action.y = 570;
                                    // this.action.alpha = 0.75;
                                }
                            })
                        })
                    }
                })
            }
        });
    }

    drawMutation(array){
        if (this.mutationCardVisual) {
            this.mutationCardVisual.destroy();
        }
        // let card = 
        // if (card != null) 
        this.mutationCardVisual = CardMutator.mutate(this.scene, array);
        if (this.mutationCardVisual) {
            this.mutationCardVisual.setInteractive({useHandCursor: true});
            this.mutationCardVisual.setScrollFactor(0);
            this.mutationCardVisual.x = -100;
            this.mutationCardVisual.y = 340;
            this.mutationCardVisual.setDepth(4);
            console.log(this.mutationCardVisual)
            let bruh = this.mutationCardVisual;
            //card moving into the screen right
            this.scene.tweens.add({
                targets: this.mutationCardVisual,
                x: 225,
                duration: 300,
                ease: "Sine.easeInOut",
                onComplete: () => {
                    // for some reason this.mutationCardVisual has a chance to become null during the animation
                    // saving the variable to bruh fixes the issue
                    // console.log(bruh);
                    // console.log(this.mutationCardVisual)
                    // if (!this.mutationCardVisual)
                    //     return
                    // card moving down into the corner
                    this.scene.tweens.add({
                        targets: bruh,
                        y: 550,
                        duration: 200,
                        ease: "Sine.easeInOut",
                        onComplete: () => {
                            if (!bruh)
                                return
                            bruh.on('pointerdown', () => {
                                if(array.length > 0){
                                    this.scene.scene.pause('examples');
                                    this.scene.scene.launch('display', array);
                                }
                            })
                            .on('pointerover', () => {
                                this.scene.tweens.add({
                                    targets: this.mutationCardVisual,
                                    y: this.mutationCardVisual.y - 180,
                                    duration: 200,
                                    onComplete: () => {
                                        this.mutationCardVisual.y = 370;
                                        // this.mutationCardVisual.alpha = 1;
                                    }
                                })
                            })
                            .on('pointerout', () => {
                                this.scene.tweens.add({
                                    targets: this.mutationCardVisual,
                                    y: this.mutationCardVisual.y + 180,
                                    duration: 300,
                                    onComplete: () => {
                                        this.mutationCardVisual.y = 550;
                                        // this.mutationCardVisual.alpha = 0.75;
                                    }
                                })
                            })
                        }
                    })
                }
            });
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
        this.load.image('arrow', 'arrow.png');
        this.load.image('x', 'x.png');
    }
    create(){
        //used later to keep track of card number
        this.num = 1;
        //displays what card they are looking at out of how many they have
        this.numText = this.add.text(360, 0, this.num+"/"+this.array.length).setFontSize(50);
        //displays the first card
        this.currentCard = this.add.image(400, 290, this.array[0]).setScale(0.5);
        //left arrow
        this.left = this.add.image(240, 290, "arrow").setScale(0.5);//this.add.text(280, 290, "<", {color: "#00ff00"}).setFontSize(50);
        this.left.flipX = true;
        this.left.setInteractive({useHandCursor: true});
        this.left.on('pointerdown', () => {
            if(this.num > 1){
                this.currentCard.destroy();
                this.num--;
                this.numText.setText(this.num+"/"+this.array.length);
                this.currentCard = this.add.image(400, 290, this.array[this.num-1]).setScale(0.5);
            }
        })
        .on('pointerover', () => {
            this.left.setTint(0x00ff00);
        })
        .on('pointerout', () => {
            this.left.clearTint();
        })
        //right arrow
        this.right = this.add.image(560, 290, "arrow").setScale(0.5);
        this.right.setInteractive({useHandCursor: true});
        this.right.on('pointerdown', () => {
            if(this.num < this.array.length){
                this.currentCard.destroy();
                this.num++;
                this.numText.setText(this.num+"/"+this.array.length);
                this.currentCard = this.add.image(400, 290, this.array[this.num-1]).setScale(0.5);
            }
        })
        .on('pointerover', () => {
            this.right.setTint(0x00ff00);
        })
        .on('pointerout', () => {
            this.right.clearTint();
        })
        //X to quit the ui
        this.leave = this.add.image(750, 50, "x").setScale(0.35);
        this.leave.setInteractive({useHandCursor: true});
        this.leave.on('pointerdown', () => {
            this.scene.stop('display');
            this.scene.resume('examples');
        })
        .on('pointerover', () => {
            this.leave.setScale(0.4);
        })
        .on('pointerout', () => {
            this.leave.setScale(0.35);
        })
    }
}