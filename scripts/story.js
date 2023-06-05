class StoryScreen extends Menu {
    constructor(){
        super('story');
    }
    init(storyPart){
        this.storyPart = storyPart.num;
        this.camera = storyPart.camera;
    }
    
    preload() {
        this.load.path = './assets/';
        this.load.image('monster', 'Monster.png');
        this.load.image("salt-b", "salt_board.png");
        this.load.image("crowbar-b", "crowbar_board.png");
        this.load.image("book-b", "Book_board.png");
        this.load.image("torch-b", "torch_board.png");
        this.load.image("cross-b", "cross_board.png");
        this.load.image('arrow', 'arrow.png');
        this.load.image('x', 'x.png');
    }
    create(){
        let wholeContainer = this.add.container(-1000, 300);
        let entireBox = this.add.rexRoundRectangle(0, 0, 700, 500, 30, 0x99b0af, 1);
        entireBox.postFX.addShadow(-1,1,0.02,1,0x000000,12,1);

        wholeContainer.add([entireBox]);
        
        let progress = this.add.text(0, -190, this.storyPart+"/10", {font: "50px Arial", fill: "#000000"});
        progress.setOrigin(0.5);

        wholeContainer.add([progress]);

        let storyImage = [2,4]
        if (storyImage.includes(this.storyPart)) {
            let image = null;
            let imageX = -200;
            let imageY = 40;
            if (this.storyPart == 2) {
                image = this.add.image(imageX, imageY, "book-b");
                image.setScale(0.3).setOrigin(0.5);
            }
            else if (this.storyPart == 4) {
                image = this.add.image(imageX, imageY, "monster");
                image.setScale(1).setOrigin(0.3);
            }

            wholeContainer.add([image]);
        }
        
        let text = "";
        if (this.storyPart == 1) {
            text = "\"...Magna spiritus, adveni et mihi benedictiones tribue...\"";
        }
        else if (this.storyPart == 2) {
            text = "Within an abandoned temple, you have found a book. In hopes of riches, you performed a ritual with it to summon a being.";
        }
        else if (this.storyPart == 3) {
            text = "As you finish your chant, the torches near you grow dimmer, and you can see the salt circle you placed earlier shaking apart.";
        }
        else if (this.storyPart == 4) {
            text = "Suddenly, a figure emerges from within the circle.";
        }
        else if (this.storyPart == 5) {
            text = "This figure is not what you wanted to summon.";
        }
        else if (this.storyPart == 6) {
            this.camera = this.cameras.main;
            if (this.camera) {
                this.camera.shake(1500, 0.01);
            }
            text = "A burst of energy flows from the figure, causing you and your ritual items to be knocked away from the altar you were at.";
        }
        else if (this.storyPart == 7) {
            text = "You immediately feel strange, you look down and see your body rapidly shifting. Painfully, you get back up.";
        }
        else if (this.storyPart == 8) {
            text = "Are these mutations an effect from the burst of energy?";
        }
        else if (this.storyPart == 9) {
            text = "With these mutations rapidly forming and receding, there is no way you can run away. You must banish this monster.";
        }
        else if (this.storyPart == 10) {
            text = "Hopefully that will solve everything.";
        }
        else if (this.storyPart == 11) {
            text = "Gameplay Instructions:\n" +
                    "\nClick to move on the highlighted spaces when it is your turn to move.\n" +
                    "You can hold two items before you need to go to the altar at the center " +
                    "to place them there and empty your inventory.\nEvery step, you gain a random " +
                    "mutation, and every few steps you gain an action card that you can click on " +
                    "to use.\nYou won't know the true location of the dark being every step. Only " +
                    "after every few steps the monsters true location will be shown.";
        }
        else if (this.storyPart == 12) {
            text = "You reach the altar with all the items.";
        }
        else if (this.storyPart == 13) {
            text = "Quickly using the crowbar, you remove the debris covering the altar.";
        }
        else if (this.storyPart == 14) {
            text = "With the cross, you point it toward the monster, preventing it from coming closer while you finish the banishment ritual.";
        }
        else if (this.storyPart == 15) {
            text = "Flipping through the pages of the book, you find a ritual that can banish this monster.";
        }
        else if (this.storyPart == 16) {
            text = "Following the book, you make an intricate circle on the ground with the salt.";
        }
        else if (this.storyPart == 17) {
            text = "Using the torch in conjunction with the cross, you lead the monster into the salt circle.";
        }
        else if (this.storyPart == 18) {
            text = "\"Abi, entitas inmunda!\"";
        }
        else if (this.storyPart == 19) {
            text = "The monster screeches in pain, and tries to escape the circle. But it is too late, you have finished the ritual.";
        }
        else if (this.storyPart == 20) {
            text = "Utterly exhausted, you leave the altar and the temple. You gained no riches, but you have survived.";
        }
        else {
            text = "error bruh";
        }
        let itemText = null;
        if (storyImage.includes(this.storyPart)) {
            itemText = this.add.text(125, 0, text,
                {font: "40px Arial", fill: "#000000", wordWrap: { width: 400, useAdvancedWrap: true}, align: 'center' });
        }
        else if (this.storyPart == 11) {
            itemText = this.add.text(0, 0, text,
                {font: "20px Arial", fill: "#000000", wordWrap: { width: 600, useAdvancedWrap: true}});
        }
        else {
            itemText = this.add.text(0, 0, text,
                {font: "50px Arial", fill: "#000000", wordWrap: { width: 600, useAdvancedWrap: true}, align: 'center' });
        }
        itemText.setOrigin(0.5);

        wholeContainer.add([itemText]);

        //X to quit the ui
        let leave = this.add.image(350, -250, "x").setScale(0.35);
        leave.setInteractive({useHandCursor: true});
        leave.on('pointerdown', () => {
            this.menuLeave(wholeContainer, "story", "story", {num:11,camera: this.camera});
        })
        .on('pointerover', () => {
            leave.setScale(0.4);
        })
        .on('pointerout', () => {
            leave.setScale(0.35);
        })

        wholeContainer.add([leave]);

        //arrow to continue the story
        let arrow = this.add.image(350, 0, "arrow").setScale(0.35);
        arrow.setInteractive({useHandCursor: true});
        arrow.on('pointerdown', () => {
            if (this.storyPart >= 1 && this.storyPart < 11) {
                this.menuLeave(wholeContainer, "story", "story", {num:this.storyPart+1,camera: this.camera});
            }
            else {
                this.menuLeave(wholeContainer, "story", "examples", {});
            }
        })
        .on('pointerover', () => {
            arrow.setTint(0x00ff00);
        })
        .on('pointerout', () => {
            arrow.clearTint();
        })

        wholeContainer.add([arrow]);
        
        this.tweens.add({
            targets: wholeContainer,
            x: 400,
            duration: 500,
            ease: 'Cubic.out',
        });

    }
}