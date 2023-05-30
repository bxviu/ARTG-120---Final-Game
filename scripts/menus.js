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
        this.scene.stop('SummaryScene');
        this.scene.start(nextScene, config);
        if (nextScene != originalScene) {
            this.scene.stop(originalScene);
        }
    }

    menuLeave(target, originalScene, nextScene, config) {
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
                    this.menuLeave(wholeContainer, "end", "start", {});    
                });
            }
        });
    }
}