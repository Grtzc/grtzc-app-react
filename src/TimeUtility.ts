export default class TimeUtility {

	static formatTime(time: number): String {
		var sign = '±';
		if (time < 0)
			sign = '-';
		if (time > 0)
			sign = '+';
		time %= 86400;
		time = Math.abs(time);
		var hour = Math.floor(time / 3600);
		var minute = Math.floor((time % 3600) / 60);
		var second = Math.floor(time % 60);
		console.log(`time: ${time}, hours: ${hour}, minute: ${minute}, second: ${second}`);
		var text = `${sign}${TimeUtility.leadNumber(Math.abs(hour))}:${TimeUtility.leadNumber(Math.abs(minute))}`;
		if (second > 0)
			text += `:${TimeUtility.leadNumber(Math.abs(second))}`;
		return text;
	}


	static leadNumber(value: number, length: number = 2, char: string = '0'): String {
		console.log(`value: ${value}`);
		return TimeUtility.leadText(value.toString(), length, char);
	}
	static leadText(text: string, length: number = 2, char: string = '0'): String {
		var result = text;
		while (result.length < length) {
			result = char + result;
		}
		return result;
	}
}