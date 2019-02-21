// All players have money
// All players are added and substructed money
// 

export class Player {
	constructor (id, position) {
		this.id = id;
		this.roll_count = 0;
		this.position = 0;
		this.token;
	}
	
	/**
	 * Creates an element and appends it on the provided element
	 * @param {Object} tile - The element on which to place the player
	 */
	placeOnBoard (tile) {
		this.token = document.createElement('span');
		this.token.id = this.id;
		tile.appendChild(this.token);
		this.position = parseInt(tile.dataset.position) || 0;
	}
	
	static setupPlayers (number) {
		let go = document.getElementById('board').getElementsByClassName('go')[0];
		
		for(let i=0;i<number;i++) {
			// add players
			const player = new this('player' + i);
			// and set them to 'go'
			player.placeOnBoard(go);
			// also add them globally
			window.playerOrder.push(player);
		}
	}
}