import Board from './Board.js';
// TODO: create instance and assign element used
// TODO: parameterize elements instead of getElementBy

/**
 * Computes the name of the animation chain for css
 * @param {Number} position The player's position
 * @param {Number} chainLength The result of the dice
 */
function computeAnimationChain(position, chainLength) {
	let animation = "";
	if (position == 40) {
		animation = "player_movement40_1";
		position = 1;
	}
	else 
		animation = "player_movement" + position + "_" + (++position);
	// the first element is already there so start from 1
	for(let i=1; i < chainLength; i++) {
		if (position == 40) {
			animation += ", player_movement40_1";
			position = 1;
		}
		else	
			animation += ", player_movement" + position + "_" + (++position);
	}
	return animation;
}

/**
 * Computes required delays between each animation stage
 * @param {Number} chainLength The result of the dice
 */
function computeAnimationDelays(chainLength) {
	let delay = "0s";
	let delay_sec = 0;
	// the first element is already there so start from 1
	for(let i=1; i < chainLength; i++) {
		delay_sec = delay_sec + 0.5;
		delay += ", " + delay_sec + "s";
	}
	return delay;
}

/**
 * Class that represents a dice
 * This is a singleton and exports only one instance, as it can be only one dice (pair)
 */
class Dice {
	
	constructor(){
		if(!Dice._instance){
			this.dice = document.getElementById('dice');
			this.rollButton = document.getElementById('roll');
			// initially roll button should be visibility
			this.rollButton.style.visibility = 'visible';
			// on click of the roll button, move the player that it's turn is due
			this.rollButton.addEventListener('click', () => {
				this.rollButton.style.visibility = 'hidden';
				this.rollDice(Board.playerOrder[0]);
			});
			Dice._instance = this;
		}
		
		return Dice._instance;
	}
	
	/**
	 * Dice logic taken from
	 * https://jsfiddle.net/estelle/6d5Z6/
	 */
	rollDice(player) {
		
		let dice_faces = '';
		
		// compute the number for each dice
		let dice1Value = Math.floor(Math.random() * 6);
		let dice2Value = Math.floor(Math.random() * 6);
		// we need to add plus one to Math.random for the range of 1-6 but the dice unicode for face 1 is 2680 so,
		// we keep the values 0-5 and we add plus 2 after
		let diceResult = dice1Value + dice2Value + 2;
		
		// and display the related unicode
		// reference here http://xahlee.info/comp/unicode_games_cards.html
		dice_faces += `&#x268${dice1Value};`;
		dice_faces += `&#x268${dice2Value};`;
		this.dice.innerHTML = dice_faces;
		
		// count player's consequent equal rolls
		if(dice1Value == dice2Value) {
			player.roll_count++;
		}
		
		// if the player rolled equals for 3rd time, sent him to jail
		// TODO: some times the animations for this are clanky
		if(player.roll_count == 3) {
			let jail_position = parseInt(Board.jail.dataset.position);
			diceResult = (player.position > jail_position) ? 40 - player.position + jail_position : jail_position - player.position;
		}

		// start the animation
		player.token.style.animationPlayState = "running";
		player.token.style.animationName = computeAnimationChain(player.position, diceResult);
		player.token.style.animationDelay = computeAnimationDelays(diceResult);
		
		// play it for seconds equal to the dice results in half (so it looks good) and update player's position
		setTimeout(() => {
			player.token.style.animationPlayState = "paused";
			if (player.position + diceResult > 40)
				player.position = (player.position + diceResult) - 40;
			else
				player.position = player.position + diceResult;
				
			// move list to next player from the list or use the same if dices were equal
			if(dice1Value !== dice2Value || player.roll_count === 3) {
				// reset player's roll count
				player.roll_count = 0;
				Board.nextPlayer();
			}
			
			// Time for next roll...
			this.rollButton.style.visibility = 'visible';
		}, diceResult * 500);
	}

}

const _instance = new Dice();
Object.freeze(_instance);

export default _instance;