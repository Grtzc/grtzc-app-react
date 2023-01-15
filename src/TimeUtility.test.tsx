import TimeUtility from './TimeUtility'

test('A54124', () => {
	console.log("-54124");
	expect(TimeUtility.formatTime(-54124)).toBe("-15:02:04");
});