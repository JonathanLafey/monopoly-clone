import { Player } from './Player.js';

// Define player list globally
window.playerOrder = [];
window.playerOrder.nextPlayer = () => {
	if(window.playerOrder.length > 0) {
		window.playerOrder.push(window.playerOrder.shift());
		return window.playerOrder[0];
	}
	else return [];
};

window.settings_menu = document.getElementById('settings_menu');
window.rollButton = document.getElementById('roll');

function openSettingsMenu() {
	if(window.hasGameStarted) {
		document.getElementById('settings_save').style.display = 'none';
		document.getElementById('settings_cancel').style.display = 'inline-block';
		document.getElementById('player_number').style.display = 'none';
	}
	else {
		document.getElementById('settings_save').style.display = 'inline-block';
		document.getElementById('settings_cancel').style.display = 'none';
		document.getElementById('player_number').style.display = 'inline-block';
	}
	window.settings_menu.showModal();
}

function closeSettingsMenu() {
	window.settings_menu.close();
}

function saveSettingsMenu() {
	const player_number = document.getElementById("player_number").value;
	Player.setupPlayers(player_number);
	// start the game
	window.hasGameStarted = true;
	window.settings_menu.close();
}

document.getElementById('settings').addEventListener('click', () => openSettingsMenu());
document.getElementById('settings_save').addEventListener('click', () => saveSettingsMenu());
document.getElementById('settings_cancel').addEventListener('click', () => closeSettingsMenu());

// Display initial roll popup
window.rollButton.style.visibility = 'visible';

window.rollButton.addEventListener('click', () => {
	rollButton.style.visibility = 'hidden';
	rollDice(window.playerOrder[0]);
});

window.hasGameStarted = false;
			
(async () => {
	// get all property info from the json file
	// as we're using await for the Fetch API and the conversion to JSON we need to call these in an async function
	// thankfully we're already in an anonymous self-called function so we can just mark it as async.
	const properties_json = await (await fetch('properties.json')).json();
	console.log(properties_json);

	// configure the properties
	let properties = document.getElementById('board').getElementsByClassName('property');
	for (let property of properties) {
		// get config for each property based on the id (property and mark up)
		let property_config =  properties_json.find(p => p.id === property.id)
		
		if(property_config == null) continue;
		
		// add the related elements like color, names and values based on the config
		let color_code = document.createElement('div');
		color_code.className = 'color-code';
		color_code.style.backgroundColor = property_config.color_code;
		
		let property_name = document.createElement('span');
		property_name.className = 'property-name';
		property_name.appendChild(document.createTextNode(property_config.property_name));
		
		let property_value = document.createElement('span');
		property_value.className = 'property-value';
		property_value.appendChild(document.createTextNode(property_config.property_value));
		
		property.appendChild(color_code);
		property.appendChild(property_name);
		property.appendChild(property_value);
	}
	// open settings at start
	openSettingsMenu();

})();
