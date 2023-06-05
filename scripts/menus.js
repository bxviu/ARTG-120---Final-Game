class Menu extends Phaser.Scene {
    init(data) {
    }
    preload ()
    {       
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.plugin('rexkawaseblurpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexkawaseblurpipelineplugin.min.js', true);
        this.load.plugin('rexdropshadowpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdropshadowpipelineplugin.min.js', true);

    }
    create() {
    }
    
    update() {
    }

    closeMenu(originalScene,nextScene,config) {
        if (config.resume == true) {
            this.scene.resume('examples');
        }
        else {
        this.scene.start(nextScene, config);
        }
        if (nextScene != originalScene) {
            this.scene.stop(originalScene);
        }
    }

    menuLeave(target, originalScene, nextScene, config) {
        // animate the menu leaving
        this.tweens.add({
            targets: target,
            x: 3550,
            duration: 500,
            ease: 'Cubic.in',
            onComplete: () => {
                this.time.delayedCall(250, ()=>{
                    this.closeMenu(originalScene, nextScene, config);       
                });
            }   
        });
    }
}
  
class StartScreen extends Menu {
    constructor(){
        super("start");
    }

    create() {
        let wholeContainer = this.add.container(400, -1000);
        let entireBox = this.add.rexRoundRectangle(0, 0, 700, 500, 30, 0x99b0af, 1);
        entireBox.postFX.addShadow(-1,1,0.02,1,0x000000,12,1);

        wholeContainer.add([entireBox]);

        let title = this.add.text(0, -190, "Wandering in the Darkness", {font: "50px Arial", fill: "#000000"});
        title.setOrigin(0.5);

        wholeContainer.add([title]);

        let instructionsText = this.add.text(0, -20, "You have performed a ritual and summoned a being. " +
                                            "You must gather the items back and banish it. However, its presence " +
                                            "has caused unforseen mutations to rapidly form and disappear with " +
                                            "every step you take. You will die if the being catches you, unless " +
                                            "you have a mutation or action that may help you escape.\n\nInstructions:" +
                                            "\nClick to move on the highlighted spaces when it is your turn to move.\n" +
                                            "You can hold two items before you need to go to the altar at the center " +
                                            "to place them there and empty your inventory.\nEvery step, you gain a random " +
                                            "mutation, and every few steps you gain an action card that you can click on " +
                                            "to use.\nYou won't know the true location of the dark being every step. Only " +
                                            "after every few steps the monsters true location will be shown." + 
                                            "" +
                                            "" +
                                            "" +
                                            "", 
                                            {font: "18px Arial", fill: "#000000", wordWrap: { width: 600, useAdvancedWrap: true }});
        instructionsText.setOrigin(0.5);

        wholeContainer.add([instructionsText]);

        // clickable button to start the game
        let startBox = this.add.rexRoundRectangle(0, 175, 150, 100, 30, 0xffffaa, 1);
        startBox.postFX.addShadow(-1,1,0.02,1,0x000000,12,1);
        startBox.setInteractive();

        wholeContainer.add([startBox]);

        let startText = this.add.text(0, 175, "Start", { font: '50px Arial', fill: '#af00af' }).setOrigin(0.5);

        wholeContainer.add([startText]);

        this.tweens.add({
            targets: wholeContainer,
            y: 300,
            duration: 500,
            ease: 'Cubic.out',
            onComplete: () => {
                startBox.on('pointerdown', () => {
                    this.menuLeave(wholeContainer, "start", "examples", {});    
                });
            }
        });
    }
}

class EndScreen extends Menu {
    constructor(){
        super("end");
    }

    init(data) {
        // changes text on endscreen depending on whether you won or lost
        this.wonGame = data.wonGame;
    }

    create() {
        let wholeContainer = this.add.container(400, -1000);
        let entireBox = this.add.rexRoundRectangle(0, 0, 700, 500, 30, 0x99b0af, 1);
        entireBox.postFX.addShadow(-1,1,0.02,1,0x000000,12,1);

        wholeContainer.add([entireBox]);

        let text = this.wonGame  ? "You won!" : "You lost!";
        let title = this.add.text(0, -190, text, {font: "50px Arial", fill: "#000000"});
        title.setOrigin(0.5);

        wholeContainer.add([title]);

        text = this.wonGame  ? "You successfully banished the dark being!" : "You got eaten by the dark being!";
        let instructionsText = this.add.text(0, 0, text,
                                            {font: "50px Arial", fill: "#000000", wordWrap: { width: 600, useAdvancedWrap: true }});
        instructionsText.setOrigin(0.5);

        wholeContainer.add([instructionsText]);

        let startBox = this.add.rexRoundRectangle(0, 175, 150, 100, 30, 0xffffaa, 1);
        startBox.postFX.addShadow(-1,1,0.02,1,0x000000,12,1);
        startBox.setInteractive();

        wholeContainer.add([startBox]);

        let startText = this.add.text(0, 175, "Replay", { font: '50px Arial', fill: '#af00af' }).setOrigin(0.5);

        wholeContainer.add([startText]);

        this.tweens.add({
            targets: wholeContainer,
            y: 300,
            duration: 500,
            ease: 'Cubic.out',
            onComplete: () => {
                startBox.on('pointerdown', () => {
                    this.scene.stop('examples');
                    this.menuLeave(wholeContainer, "end", "start", {});    
                });
            }
        });
    }
}

class ItemInfoScreen extends Menu {
    constructor(){
        super('iteminfo');
    }
    init(item){
        this.item = item.item;
    }
    
    preload() {
        this.load.image('torch', 'assets/torch.png');
        this.load.image('book', 'assets/Book.png');
        this.load.image('crowbar', 'assets/crowbar.png');
        this.load.image('salt', 'assets/salt.png');
        this.load.image('cross', 'assets/cross.png');
    }
    create(){
        let wholeContainer = this.add.container(400, -1000);
        let entireBox = this.add.rexRoundRectangle(0, 0, 700, 500, 30, 0x99b0af, 1);
        entireBox.postFX.addShadow(-1,1,0.02,1,0x000000,12,1);

        wholeContainer.add([entireBox]);
        
        let title = this.add.text(0, -190, this.item.name, {font: "50px Arial", fill: "#000000"});
        title.setOrigin(0.5);

        wholeContainer.add([title]);
        
        let text = "";
        if (this.item.name == "Salt") {
            text = "The darkness prefers sugar. An ingredient needed at the altar.";
        }
        else if (this.item.name == "Crowbar") {
            text = "This might be useful in prying open the altar.";
        }
        else if (this.item.name == "Book") {
            text = "A book on dark rituals. Needed to banish the monster.";
        }
        else if (this.item.name == "Torch") {
            text = "A torch to light your way, and set things ablaze.";
        }
        else if (this.item.name == "Cross") {
            text = "A religious item, it has power over the Monster.";
        }
        else {
            text = "unknown item";
        }
        let itemText = this.add.text(125, 0, text,
                                            {font: "50px Arial", fill: "#000000", wordWrap: { width: 400, useAdvancedWrap: true}, align: 'center' });
        itemText.setOrigin(0.5);

        wholeContainer.add([itemText]);

        let image = null;
        let imageX = -200;
        let imageY = 40;
        if (this.item.name == "Salt") {
            image = this.add.image(imageX, imageY, 'salt');
        }
        else if (this.item.name == "Crowbar") {
            image = this.add.image(imageX, imageY, 'crowbar');
        }
        else if (this.item.name == "Book") {
            image = this.add.image(imageX, imageY, 'book');
        }
        else if (this.item.name == "Torch") {
            image = this.add.image(imageX, imageY, 'torch');
        }
        else if (this.item.name == "Cross") {
            image = this.add.image(imageX, imageY, 'cross');
        }
        image.setScale(0.15).setOrigin(0.5);

        wholeContainer.add([image]);

        //X to quit the ui
        let leave = this.add.text(350, -290, "X").setFontSize(50);
        leave.setInteractive();
        leave.on('pointerdown', () => {
            this.menuLeave(wholeContainer, "iteminfo", "examples", {resume:true});
            this.scene.stop('iteminfo');
            // this.scene.resume('examples');
        })

        wholeContainer.add([leave]);
        
        
        this.tweens.add({
            targets: wholeContainer,
            y: 300,
            duration: 500,
            ease: 'Cubic.out',
        });

    }
}