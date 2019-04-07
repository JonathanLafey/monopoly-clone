import Board from './Board.js';

// All players have money
// All players are added and substructed money

export default class Player {
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
	
	/**
	 * Creates the number of players provided and set them on the board
	 */
	static setupPlayers (number) {
		for(let i=0;i<number;i++) {
			// add players
			const player = new this('player' + i);
			// set them to 'go'
			player.placeOnBoard(Board.go);
			// also add them player list
			Board.addPlayer(player);
		}
	}
}