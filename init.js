import Menu from './Menu.js';
import Board from './Board.js';
import Player from './Player.js';
import Dice from './Dice.js';
			
(async () => {
	// get all property info from the json file
	// as we're using await for the Fetch API and the conversion to JSON we need to call these in an async function
	// thankfully we're already in an anonymous self-called function so we can just mark it as async.
	// this requires a server to serve the json file
	const properties_json = await fetch('properties.json').then(response => response.json());
	Board.configureProperties(properties_json);
	
	// open settings at start
	Menu.openSettingsMenu();
})();
