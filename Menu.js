import Player from './Player.js';

/**
 * Class that represents the menu
 * This is a singleton and exports only one instance, as it can be only one menu
 */
class Menu {
	constructor(){
		if(!Menu._instance){
			// Creating a wrapper object for this property in order to not be affected by the shallow freeze so we can change it
			this.menuSettings = { hasGameStarted: false };
			this.settings_menu = document.getElementById('settings_menu');
			
			// buttons
			this.settings = document.getElementById('settings');
			this.settings_save = document.getElementById('settings_save');
			this.settings_cancel = document.getElementById('settings_cancel');
			this.player_number = document.getElementById('player_number');
			
			// events
			this.settings.addEventListener('click', () => this.openSettingsMenu());
			this.settings_save.addEventListener('click', () => this.saveSettingsMenu());
			this.settings_cancel.addEventListener('click', () => this.closeSettingsMenu());
			
			Menu._instance = this;
		}
		
		return Menu._instance;
	}
	
	/**
	 * Opens the settings menu
	 */
	openSettingsMenu() {
		if(this.menuSettings.hasGameStarted) {
			this.settings_save.style.display = 'none';
			this.settings_cancel.style.display = 'inline-block';
			this.player_number.style.display = 'none';
		}
		else {
			this.settings_save.style.display = 'inline-block';
			this.settings_cancel.style.display = 'none';
			this.player_number.style.display = 'inline-block';
		}
		this.settings_menu.showModal();
	}

	/**
	 * Closes the settings menu
	 */
	closeSettingsMenu() {
		this.settings_menu.close();
	}

	/**
	 * Saves the selected settings and starts the game
	 */
	saveSettingsMenu() {
		const player_number = this.player_number.value;
		Player.setupPlayers(player_number);
		// start the game
		this.menuSettings.hasGameStarted = true;
		this.settings_menu.close();
	}
	
}

const _instance = new Menu();
Object.freeze(_instance);

export default _instance;