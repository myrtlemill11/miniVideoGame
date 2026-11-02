import { ShoppingItem } from "./ShoppingItem.mjs";

export class ShoppingFrenzy {
    //Data for shopping items
    shoppingItems;

    //Selected items
    selectedItems = [];

    //Usertotal score for game
    score = 0;

    correctAnswer = 0;

    //Track number of questions
    roundsPlayed = 0;

    //List of images
    //apple = 'images/apple.png'
    //banana = 'images/banana.png'
    //bread = 'images/bread.png'
    /*milk = 'images/milk.png'
    eggs = 'images/eggs.png'
    cheese = 'images/cheese.png'
    chicken = 'images/chicken.webp'
    rice = 'images/rice.webp'
    pasta = 'images/pasta.webp'
    tomatoSauce = 'images/tomatoSauce.webp' */
    constructor() {
        //Build data
        this.shoppingItems = [
            new ShoppingItem("Apple", 1),
            new ShoppingItem("Banana", 0.5),
            new ShoppingItem("Bread", 2),
            new ShoppingItem("Milk", 1.5),
            new ShoppingItem("Eggs", 3),
            new ShoppingItem("Cheese", 4),
            new ShoppingItem("Chicken", 5),
            new ShoppingItem("Rice", 2.5),
            new ShoppingItem("Pasta", 1.8),
            new ShoppingItem("Tomato Sauce", 2)
        ];

        // Load first set of items
        this.itemSelector();

        // On submit button click
        document.querySelector("#submit").onclick = () => {
            this.processAnswer();
            console.log("Score this round: " + this.score);
            // console.log("Total Score before update: " + this.score);
            // this.currentScore = shoppingFrenzy.score;
            // console.log("Current Score: " + currentScore);

            // Load next set of items
            if (this.roundsPlayed < 4) {
                this.roundsPlayed += 1;
                this.itemSelector();
            }
            else {
                document.querySelector("#gameResponse").innerHTML =
                document.querySelector("#gameResponse").innerHTML + ("Game over!!");
                this.updateScore();
            }
        }
    }


    // Select 5 random items from the shoppingItems array
    itemSelector() {
        document.querySelector("#gameList").innerHTML = "";
        // document.querySelector("#gameResponse").innerHTML = "";
        this.selectedItems = [];
        this.correctAnswer = 0;
        document.querySelector("#question").innerHTML =
            ("What is the price of these items?");
        while (this.selectedItems.length < 5) {
            const randomIndex = Math.floor(Math.random() * this.shoppingItems.length);
            const selectedItem = this.shoppingItems[randomIndex];
            this.selectedItems.push(selectedItem);
            document.querySelector("#gameList").innerHTML = document.querySelector("#gameList").innerHTML
                + (selectedItem.name + " = " + "£" + selectedItem.price + ", ")
            // Get image corresponding to item in list
            //if (selectedItem.image = apple)    
            //    document.getElementById("#apple").innerHTML = selectedItem.image;
            // Move apple image in intervals
            // let position = 0;
            // function moveApple() {
            //     position += 5;
            //     if (position > 300) 
            //         position = 0;
            //     document.getElementById("appleImage").style.left = position + "px";

            // }
            // setInterval(moveApple, 25);

            //  }
            this.correctAnswer += selectedItem.price;
        }
        this.correctAnswer = this.round1Decimal(this.correctAnswer);
        console.log(`Correct answer: ${this.correctAnswer}`)
        console.log(this.selectedItems);
    }

    // Saving score
    updateScore() {
        if (!sessionStorage.loggedInUser) {
            console.log("No user logged in, score not saved.");
            return;
        }
        const username = sessionStorage.getItem("loggedInUser");
        const userData = JSON.parse(localStorage[username]);

        // Update top score if current score is higher
        if (this.score > userData.topScore) {
            userData.topScore = this.score;
            localStorage[username] = JSON.stringify(userData);
        }

    }


    processAnswer() {
        let userAnswer = document.getElementById("inputAnswer").value;
        if (this.round1Decimal(userAnswer) === this.round1Decimal(this.correctAnswer)) {
            // Add points for correct answers
            this.score = this.score + 1;

            //Update user
            document.querySelector("#gameResponse").innerHTML = ("Correct! Score is " + this.score + ". ");
        } else {
            document.querySelector("#gameResponse").innerHTML = ("Incorrect. The correct answer is " + this.correctAnswer + ". ");
            document.querySelector("#gameResponse").innerHTML += ("Score is " + this.score + ". ") ;
        }

    }

    round1Decimal(num){
        return Math.round(num*10) / 10;
    }
}


