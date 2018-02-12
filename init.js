// Define player list globally
window.playerOrder = [];
window.playerOrder.nextPlayer = () => {
	console.log(this.playerOrder);
	if(this.playerOrder.length > 0) {
		this.playerOrder.push(this.playerOrder.shift());
		return this.playerOrder[0];
	}
	else return [];
};
			
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
	
	window.settings_menu = document.getElementById('settings_menu');
	window.rollButton = document.getElementById('roll');
	
	// open settings at start
	window.settings_menu.showModal();
	
	// Display initial roll popup
	window.rollButton.style.visibility = 'visible';
	
	window.rollButton.addEventListener('click', () => {
		rollButton.style.visibility = 'hidden';
		rollDice(window.playerOrder[0]);
	});

})();