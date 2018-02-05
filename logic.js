/**
* Dice logic taken from
* https://jsfiddle.net/estelle/6d5Z6/
*/
function rollDice(player) {
	
	let dice_faces = '';
	
	// compute the number for each dice
	let dice1Value = Math.floor(Math.random() * 6);
	let dice2Value = Math.floor(Math.random() * 6);
	// we need to add plus one to Math.random for the range of 1-6 but the dice unicode for face 1 is 2680 so,
	// we keep the values 0-5 and we add plus 2 after
	let diceResult = dice1Value + dice2Value + 2;
	
	// and display the related unicode
	// reference here http://xahlee.info/comp/unicode_games_cards.html
	dice_faces += "&#x268" + dice1Value + ";";
	dice_faces += "&#x268" + dice2Value + ";";
	document.getElementById('dice').innerHTML = dice_faces;

	// start the animation
	player.style.animationPlayState = "running";
	player.style.animationName = computeAnimationChain(parseInt(player.dataset.position), diceResult);
	player.style.animationDelay = computeAnimationDelays(diceResult);
	
	// play it for seconds equal to the dice results in half (so it looks good) and update player's position
	setTimeout(function() {
		player.style.animationPlayState = "paused";
		if (parseInt(player.dataset.position) + diceResult > 40)
			player.dataset.position = (parseInt(player.dataset.position) + diceResult) - 40;
		else
			player.dataset.position = parseInt(player.dataset.position) + diceResult;
			
		// move list to next player from the list or use the same if dices were equal
		// TODO: count times of seq equals
		if(dice1Value != dice2Value) {
			window.playerOrder.nextPlayer();
		}
		
		// Time for next roll...
		window.rollButton.style.visibility = 'visible';
	}, diceResult * 500);
}

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
				animation = "player_movement40_1";
			position = 1;
		}
		else	
			animation += ", player_movement" + position + "_" + (++position);
	}
	return animation;
}

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

function openSettingsMenu() {
	window.settings_menu.showModal();
}

function saveSettingsMenu() {
	let player_number = document.getElementById("player_number").value;
	setupPlayers(player_number);
	window.settings_menu.close();
}

function setupPlayers(number){
	let go = document.getElementById('board').getElementsByClassName('go')[0];
	
	for(let i=0;i<number;i++) {
		// add players
		let player = document.createElement('span');
		player.id = 'player' + i;
		
		// and set them to 'go'
		go.appendChild(player);
		player.dataset.position = go.dataset.position;
		
		window.playerOrder.push(player);
	}
}