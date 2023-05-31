const movementCards = 4;
const inventoryCards = 2;
const revealRoundsCards = 2;
const abilityCards = 1;
const allMutations = inventoryCards + movementCards + revealRoundsCards + abilityCards;

class CardMutator {

    static mutate(scene, array){
        // making different chances for different types of mutations
        // 60% movement, 10% inventory, 10% reveal rounds, 10% abilities, 10% nothing
        let cardVisual = null;

        if (Math.random() < 0.6) {
            // 60%
            cardVisual = CardMutator.mutateMovement(scene, array);
        }
        else if (Math.random() < 0.75) {
            // 30%
            //  - 10% is mutating inventory
            //  - 10% is reveal rounds 
            //  - 10% is abilities
            if (Math.random() < 0.33) {
                // 10%
                cardVisual = CardMutator.mutateInventory(scene, array);
            }
            else {
                // 20%
                if (Math.random() < 0.5) {
                    // 10%
                    cardVisual = CardMutator.mutateRevealRounds(scene, array);
                }
                else {
                    // 10%
                    cardVisual = CardMutator.mutateAbilities(scene, array);
                }
            }
        }
        else {
            // 10%
            // no mutations happen
        }
        console.log(array);
        return cardVisual;
    }

    // gets a random movement mutation and adds it to the array
    // has a 40% chance to clear a mutation instead
    static mutateMovement(scene, array) {
        let chanceToClear = Math.random() < 0.4;
        //generates random number then adds mutation based on that number
        
        if (chanceToClear) {
            //removes a random mutation
            this.test = scene.add.image(100, 475, 'clearMuta');
            this.test.setScale(0.35);
            if(array.length > 0){
                // only clear mutations of the movement category
                let movementCards = array.filter(x => x == "diagonal" || x == "leftRight" || x == "upDown" || x == "lShape");
                console.log(movementCards);
                let removedMutation = movementCards[Math.floor(Math.random() * movementCards.length)]
                array.splice(array.indexOf(removedMutation), 1);
                console.log("clear");
            }
            return;
        }

        let cardVisual = null;
        let rand = Math.floor(Math.random() * movementCards);
        if(rand == 0 && array.indexOf("diagonal")==-1){
            cardVisual = CardMutator.drawCard(scene, 'diagonal', array);
        }
        else if(rand == 1 && array.indexOf("leftRight")==-1){
            cardVisual = CardMutator.drawCard(scene, 'leftRight', array);
        }
        else if(rand == 2 && array.indexOf("upDown")==-1){
            cardVisual = CardMutator.drawCard(scene, 'upDown', array);
        }
        else if(rand == 3 && array.indexOf("lShape")==-1){
            cardVisual = CardMutator.drawCard(scene, 'lShape', array);
        }
        else if(array.length >= allMutations){
            //if all the mutations are taken already it does nothing
            console.log("Array full");
        }
        else{
            //redraws it if it got a duplicate
            scene.events.emit("drawMutation", array);
        }
        return cardVisual;
    
    }

    static mutateInventory(scene, array) {
        let chanceToClear = Math.random() < 0.3;
        //generates random number then adds mutation based on that number
        
        if (chanceToClear) {
            //removes a random mutation
            this.test = scene.add.image(100, 475, 'clearMuta');
            this.test.setScale(0.35);
            if(array.length > 0){
                // only clear mutations of the inventory category
                let inventoryCards = array.filter(x => x == "extraItem" || x == "oneItem");
                console.log(inventoryCards);
                let removedMutation = inventoryCards[Math.floor(Math.random() * inventoryCards.length)]
                array.splice(array.indexOf(removedMutation), 1);
                console.log("clear");
            }
            return;
        }

        let cardVisual = null;
        let rand = Math.floor(Math.random() * inventoryCards);
        if(rand == 0 && array.indexOf("extraItem")==-1){
            if (array.indexOf("oneItem") != -1) {
                array.splice(array.indexOf("oneItem"), 1);
            }
            cardVisual = CardMutator.drawCard(scene, 'extraItem', array);
        }
        else if(rand == 1 && array.indexOf("oneItem")==-1){
            if (array.indexOf("extraItem") != -1) {
                array.splice(array.indexOf("extraItem"), 1);
            }
            cardVisual = CardMutator.drawCard(scene, 'oneItem', array);
        }
        else if(array.length >= allMutations){
            //if all the mutations are taken already it does nothing
            console.log("Array full");
        }
        else{
            //redraws it if it got a duplicate
            scene.events.emit("drawMutation", array);
        }
        return cardVisual;
    
    }

    static mutateRevealRounds(scene, array) {
        let chanceToClear = Math.random() < 0.2;
        //generates random number then adds mutation based on that number
        
        if (chanceToClear) {
            //removes a random mutation
            this.test = scene.add.image(100, 475, 'clearMuta');
            this.test.setScale(0.35);
            if(array.length > 0){
                // only clear mutations of the reveal rounds category
                let revealRoundsCards = array.filter(x => x == "reveal2" || x == "reveal6");
                console.log(revealRoundsCards);
                let removedMutation = revealRoundsCards[Math.floor(Math.random() * revealRoundsCards.length)]
                array.splice(array.indexOf(removedMutation), 1);
                console.log("clear");
            }
            return;
        }

        let cardVisual = null;
        let rand = Math.floor(Math.random() * revealRoundsCards);
        if(rand == 0 && array.indexOf("reveal2")==-1){
            if (array.indexOf("reveal6") != -1) {
                array.splice(array.indexOf("reveal6"), 1);
            }
            cardVisual = CardMutator.drawCard(scene, 'reveal2', array);
        }   
        else if(rand == 1 && array.indexOf("reveal6")==-1){
            if (array.indexOf("reveal2") != -1) {
                array.splice(array.indexOf("reveal2"), 1);
            }
            cardVisual = CardMutator.drawCard(scene, 'reveal6', array);
        }
        else if(array.length >= allMutations){
            //if all the mutations are taken already it does nothing
            console.log("Array full");
        }
        else{
            //redraws it if it got a duplicate
            scene.events.emit("drawMutation", array);
        }
        return cardVisual;
    }

    static mutateAbilities(scene, array) {
        let chanceToClear = Math.random() < 0.1;
        //generates random number then adds mutation based on that number
        
        if (chanceToClear) {
            //removes a random mutation
            this.test = scene.add.image(100, 475, 'clearMuta');
            this.test.setScale(0.35);
            if(array.length > 0){
                // only clear mutations of the reveal rounds category
                let abilityCards = array.filter(x => x == "teleport")
                console.log(abilityCards);
                let removedMutation = abilityCards[Math.floor(Math.random() * abilityCards.length)]
                array.splice(array.indexOf(removedMutation), 1);
                console.log("clear");
            }
            return;
        }

        let cardVisual = null;
        let rand = Math.floor(Math.random() * abilityCards);
        if(rand == 0 && array.indexOf("teleport")==-1){
            cardVisual = CardMutator.drawCard(scene, 'teleport', array);
        }   
        else if(array.length >= allMutations){
            //if all the mutations are taken already it does nothing
            console.log("Array full");
        }
        else{
            //redraws it if it got a duplicate
            scene.events.emit("drawMutation", array);
        }
        return cardVisual;
    }

    static drawCard(scene, name, array) {
        array.push(name);
        let cardVisual = scene.add.image(100, 475, name);
        cardVisual.setScale(0.35);
        return cardVisual;
    }
}