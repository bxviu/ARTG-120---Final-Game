class Menu extends Phaser.Scene {
    init(data) {
    }
    preload ()
    {       
        this.load.plugin('rexroundrectangleplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexroundrectangleplugin.min.js', true);
        this.load.plugin('rexkawaseblurpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexkawaseblurpipelineplugin.min.js', true);
        this.load.plugin('rexdropshadowpipelineplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexdropshadowpipelineplugin.min.js', true);
        this.load.path = './assets/';
        this.load.image("background", "background.jpg");
    }   
    create() {
        this.background = this.add.image(450, 200, "background");
        this.background.setOrigin(0.5);
        this.background.setScale(1.5);
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
        super.create();
        let wholeContainer = this.add.container(400, -1000);
        let entireBox = this.add.rexRoundRectangle(0, 0, 700, 500, 30, 0x99b0af, 1);
        entireBox.postFX.addShadow(-1,1,0.02,1,0x000000,12,1);

        wholeContainer.add([entireBox]);

        let title = this.add.text(0, -50, "In the Darkness", {font: "100px Arial", fill: "#000000", wordWrap: { width: 450, useAdvancedWrap: true}, align: 'center' });
        title.setOrigin(0.5);

        wholeContainer.add([title]);

        // clickable button to start the game
        let startBox = this.add.rexRoundRectangle(0, 135, 150, 100, 30, 0xffffaa, 1);
        startBox.postFX.addShadow(-1,1,0.02,1,0x000000,12,1);
        startBox.setInteractive({useHandCursor: true});

        wholeContainer.add([startBox]);

        let startText = this.add.text(0, 135, "Start", { font: '50px Arial', fill: '#ff0000' }).setOrigin(0.5);

        wholeContainer.add([startText]);

        this.tweens.add({
            targets: wholeContainer,
            y: 300,
            duration: 500,
            ease: 'Cubic.out',
            onComplete: () => {
                startBox.on('pointerdown', () => {
                    // this.menuLeave(wholeContainer, "start", "examples", {});    
                    this.menuLeave(wholeContainer, "start", "story", {num:1});    
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
        super.create();

        let wholeContainer = this.add.container(400, -1000);
        let entireBox = this.add.rexRoundRectangle(0, 0, 700, 500, 30, 0x99b0af, 1);
        entireBox.postFX.addShadow(-1,1,0.02,1,0x000000,12,1);

        wholeContainer.add([entireBox]);

        let text = this.wonGame  ? "You won!" : "You lost!";
        let title = this.add.text(0, -190, text, {font: "50px Arial", fill: "#000000"});
        title.setOrigin(0.5);

        wholeContainer.add([title]);

        text = this.wonGame  ? "You successfully banished the dark being and escaped!" : "You were consumed by the monster.";
        let instructionsText = this.add.text(0, 0, text,
                                            {font: "50px Arial", fill: "#000000", wordWrap: { width: 600, useAdvancedWrap: true }});
        instructionsText.setOrigin(0.5);

        wholeContainer.add([instructionsText]);

        let startBox = this.add.rexRoundRectangle(0, 175, 170, 100, 30, 0xffffaa, 1);
        startBox.postFX.addShadow(-1,1,0.02,1,0x000000,12,1);
        startBox.setInteractive({useHandCursor: true});

        wholeContainer.add([startBox]);

        let startText = this.add.text(0, 175, "Replay", { font: '50px Arial', fill: '#ff0000' }).setOrigin(0.5);

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
        this.load.image('x', 'assets/x.png');
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
            image = this.add.image(imageX, imageY, 'salt-b');
        }
        else if (this.item.name == "Crowbar") {
            image = this.add.image(imageX, imageY, 'crowbar-b');
        }
        else if (this.item.name == "Book") {
            image = this.add.image(imageX, imageY, 'book-b');
        }
        else if (this.item.name == "Torch") {
            image = this.add.image(imageX, imageY, 'torch-b');
        }
        else if (this.item.name == "Cross") {
            image = this.add.image(imageX, imageY, 'cross-b');
        }
        image.setScale(0.3).setOrigin(0.5);

        wholeContainer.add([image]);

        //X to quit the ui
        let leave = this.add.image(350, -250, "x").setScale(0.35);
        leave.setInteractive({useHandCursor: true});
        leave.on('pointerdown', () => {
            this.menuLeave(wholeContainer, "iteminfo", "examples", {resume:true});
        })
        .on('pointerover', () => {
            leave.setScale(0.4);
        })
        .on('pointerout', () => {
            leave.setScale(0.35);
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