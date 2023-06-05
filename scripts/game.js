const COLOR_PRIMARY = 0x03a9f4;
const COLOR_LIGHT = 0x67daff;
const COLOR_DARK = 0x007ac1;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.scenePlugin('rexboardplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexboardplugin.min.js', 'rexBoard', 'rexBoard');
        this.load.path = './assets/';
        //mutation cards
        this.load.image('clearMuta', 'clearmute.png');
        this.load.image('diagonal', 'diagonal.png');
        this.load.image('extraItem', 'extraitem.png');
        this.load.image('leftRight', 'leftright.png');
        this.load.image('oneItem', 'oneitem.png');
        this.load.image('reveal2', 'reveal2.png');
        this.load.image('reveal6', 'reveal6.png');
        this.load.image('teleport', 'teleport.png');
        this.load.image('upDown', 'updown.png');
        // these images don't exist but i hope someone makes one
        this.load.image('lShape', 'lshape.png');
        this.load.image('2OutCorner', 'diag2.png');
        this.load.image('2OutMiddle', 'udlr2.png');
        this.load.image('3OutMiddle', 'udlr3.png');
        //action cards
        this.load.image('closer', 'closer.png');
        this.load.image('escape', 'escape.png');
        this.load.image('extraSpace', 'extraspace.png');
        this.load.image('jump8', 'jump8.png');
        //player
        this.load.image('player', 'player.png');
        //monster
        this.load.image('monster', 'Monster.png');
        //items
        //regular name without "-b" already taken for the item info screen
        //these are the transparent versions without a large white background
        this.load.image("salt-b", "salt_board.png");
        this.load.image("crowbar-b", "crowbar_board.png");
        this.load.image("book-b", "Book_board.png");
        this.load.image("torch-b", "torch_board.png");
        this.load.image("cross-b", "cross_board.png");
    }

    create() {
        var graphics = this.add.graphics({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 1
            }
        });

        var board = this.rexBoard.add.board({
                // grid: getHexagonGrid(this),
                grid: getQuadGrid(this),
                width: 12,
                height: 12
            })
            .forEachTileXY(function (tileXY, board) {
                var points = board.getGridPoints(tileXY.x, tileXY.y, true);
                graphics.strokePoints(points, true);
            }, this);
        
        // this is to deal with having multiple event listeners when replaying
        // they cause errors if they stay
        this.events.removeListener("gainCard");
        this.events.removeListener("removeCard");
        this.events.removeListener("drawMutation");
        // action listener made in player constructor, which is called in g.initializeGame
        this.events.removeListener("action");

        console.log(board);
        let g = new Game(this, board);
        g.initializeGame(1);
        this.ui = new UI(this, g);

        //button for displaying the mutation cards ui
        this.displayCards = this.add.text(30, 340, "Mutation Cards", {color: "#ffffff"});
        // this.displayCards.setInteractive();
        // this.displayCards.on('pointerdown', () => {
        //     if(g.players[0].mutations.length > 0){
        //         this.scene.pause('examples');
        //         this.scene.launch('display', g.players[0].mutations);
        //     }
        // })
    
        console.log(this);
        this.events.on("gainCard", () => {
            this.ui.drawCard();
          });

        this.events.on("removeCard", () => {
            this.ui.removeCard();
        });
        this.events.on("drawMutation", (param) =>{
            this.ui.drawMutation(param);
        });
        
    }

    update() {
        this.ui.updateItemsText();
        
    }
}

var getQuadGrid = function (scene) {
    var grid = scene.rexBoard.add.quadGrid({
        x: 400,
        y: 100,
        cellWidth: 60,
        cellHeight: 30,
        type: 1
    });
    return grid;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [StartScreen, Demo, Display, EndScreen, ItemInfoScreen]
};

var game = new Phaser.Game(config);