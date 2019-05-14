/**
 * Class that describes the board
 * This is a singleton and exports only one instance, as it can be only one board
 */
class Board {	
	constructor(){
		if(!Board._instance){
			this.go = document.getElementById('board').getElementsByClassName('go')[0];
			this.jail = document.getElementById('board').getElementsByClassName('jail')[0];
			this.parking = document.getElementById('board').getElementsByClassName('parking')[0];
			this.goToJail = document.getElementById('board').getElementsByClassName('go-to-jail')[0];
			this.incomeTax = document.getElementById('board').getElementsByClassName('income-tax')[0];
			this.luxuryTax = document.getElementById('board').getElementsByClassName('luxury-tax')[0];
			this.properties = document.getElementById('board').getElementsByClassName('property');
			this.chances = document.getElementById('board').getElementsByClassName('chance');
			this.chests = document.getElementById('board').getElementsByClassName('chest');
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
			let property_config =  properties_json.find(p => p.id === property.id);
			
			if(property_config == null) continue;
			
			// add the related elements like color, names and values based on the config
			let color_code
			if(property_config.color_code) {
				color_code = document.createElement('div');
				color_code.className = 'color-code';
				color_code.style.backgroundColor = property_config.color_code;
				property.appendChild(color_code);
			}
			
			let property_name
			if(property_config.property_name) {
				property_name = document.createElement('span');
				property_name.className = 'property-name';
				property_name.appendChild(document.createTextNode(property_config.property_name));
				property.appendChild(property_name);
			}
			
			let property_value
			if(property_config.property_value) {
				property_value = document.createElement('span');
				property_value.className = 'property-value';
				property_value.appendChild(document.createTextNode(property_config.property_value));
				property.appendChild(property_value);
			}
		}
		
		// set chances
		for (let chance of this.chances) {
			let property_config =  properties_json.find(p => p.id === chance.id)
			
			if(property_config == null) continue;
			
			let title
			if(property_config.title) {
				title = document.createElement('span');
				title.className = 'property-name';
				title.appendChild(document.createTextNode(property_config.title));
				chance.appendChild(title);
			}
		}
		
		// set chances
		for (let chest of this.chests) {
			let property_config =  properties_json.find(p => p.id === chest.id)
			
			if(property_config == null) continue;
			
			let title
			if(property_config.title) {
				title = document.createElement('span');
				title.className = 'property-name';
				title.appendChild(document.createTextNode(property_config.title));
				chest.appendChild(title);
			}
		}
		
		// set Go-To-Jail
		const goToJailConfig = properties_json.find(p => p.id === this.goToJail.id)
		if(goToJailConfig) {
			let property_name = document.createElement('span');
			property_name.className = 'property-name';
			property_name.appendChild(document.createTextNode(goToJailConfig.title));
			this.goToJail.appendChild(property_name);
		}
		
		// set Go
		const goConfig = properties_json.find(p => p.id === this.go.id)
		if(goConfig) {
			let property_name = document.createElement('span');
			property_name.className = 'property-name';
			property_name.appendChild(document.createTextNode(goConfig.title));
			this.go.appendChild(property_name);
		}
		
		// set Jail
		const jailConfig = properties_json.find(p => p.id === this.jail.id)
		if(jailConfig) {
			let property_name = document.createElement('span');
			property_name.className = 'property-name';
			property_name.appendChild(document.createTextNode(jailConfig.title));
			this.jail.appendChild(property_name);
		}
		
		// set Parking
		const parkingConfig = properties_json.find(p => p.id === this.parking.id)
		if(parkingConfig) {
			let property_name = document.createElement('span');
			property_name.className = 'property-name';
			property_name.appendChild(document.createTextNode(parkingConfig.title));
			this.parking.appendChild(property_name);
		}
		
		// set income tax
		const incomeTaxConfig = properties_json.find(p => p.id === this.incomeTax.id)
		if(incomeTaxConfig) {
			let property_name = document.createElement('span');
			property_name.className = 'property-name';
			property_name.appendChild(document.createTextNode(incomeTaxConfig.title));
			this.incomeTax.appendChild(property_name);
		}
		
		// set luxury tax
		const luxuryTaxConfig = properties_json.find(p => p.id === this.luxuryTax.id)
		if(luxuryTaxConfig) {
			let property_name = document.createElement('span');
			property_name.className = 'property-name';
			property_name.appendChild(document.createTextNode(luxuryTaxConfig.title));
			this.luxuryTax.appendChild(property_name);
		}
	}
}

const _instance = new Board();
Object.freeze(_instance);

export default _instance;