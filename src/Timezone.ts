class Timezone {
	Name: string;
	Key: string;
	Country: string;
	OffsetInSeconds: number;
	Start: number;
	DaylighSavingTime: boolean;

	constructor(
		name: string, 
		key: string, 
		country: string, 
		offsetInSeconds: number,
		start: number,
		daylighSavingTime: boolean
	) {
		this.Name = name;
		this.Key = key;
		this.Country = country;
		this.OffsetInSeconds = offsetInSeconds;
		this.Start = start;
		this.DaylighSavingTime = daylighSavingTime;
	}
}

export default Timezone;