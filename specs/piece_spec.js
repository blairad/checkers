const Piece = require('../pieces.js');
const assert = require('assert');

describe('piece', () => {
    beforeEach(() => {
        piece = new Piece(10, 'red');
    });

    it('it has a sample test', () => {
        assert.equal(true, true);
    });

    it('should have a starting position',() => {
        const actual = piece.position;
        assert.equal(actual, 10);
    });

    it('should be able to be assigned a new position', () => {
        piece.position = 28;
        const actual = piece.position;
        assert.equal(actual, 28);
    });

    it('should be assigned a colour',() => {
        const actual = piece.colour;
        assert.equal(actual, 'red');
    });

    it('should be able to store move positions', () => {
        piece.addMovePosition(23);
        piece.addMovePosition(10);
        const actual = piece.movePositions.length;
        assert.equal(actual, 2);
    });
});
