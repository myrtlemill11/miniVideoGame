// Trying to import game
import { ShoppingFrenzy } from "./ShoppingFrenzy.mjs";


function startGame() {
    document.querySelector("#gameList").innerHTML = "Welcome to Shopping Frenzy! Click 'Submit' to start playing.";
    const shoppingFrenzy = new ShoppingFrenzy();
   
}
window.onload = ()=>{
    startGame();
} 



