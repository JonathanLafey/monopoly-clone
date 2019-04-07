/**
 * Class that describes the board
 * This is a singleton and exports only one instance, as it can be only one board
 */
class Board {	
	constructor(){
		if(!Board._instance){
			this.go = document.getElementById('board').getElementsByClassName('go')[0];
			this.prison = document.getElementById('board').getElementsByClassName('prison')[0];
			this.properties = document.getElementById('board').getElementsByClassName('property');
			// Define player list globally
			this.playerOrder = [];
			
			Board._instance = this;
		}
		
		return Board._instance;
	}
	
	/**
	 * Adds a new player in the player list
	 */
	addPlayer (player) {
		this.playerOrder.push(player);
	}
	
	/**
	 * Gets the next player in turn and shifts the list accordingly
	 */
	nextPlayer () {
		if(this.playerOrder.length > 0) {
			this.playerOrder.push(this.playerOrder.shift());
			return this.playerOrder[0];
		}
		else return null;
	}
	
	/**
	 * Provided the json configuration of the properties it initializes all properties on board
	 * @param {Object} properties_json A json with all properties for the board
	 */
	configureProperties(properties_json) {	
		for (let property of this.properties) {
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
	}
}

const _instance = new Board();
Object.freeze(_instance);

export default _instance;