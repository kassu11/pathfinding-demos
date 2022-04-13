function Random(seed) {
	this.seed = seed || Math.round( Math.random() * 999_999_999_999_999 );
	this.seed2 = Math.abs(Math.round(Math.sin(seed) * 999_999_999_999_999)) || 123;
	this.amount = 1;
	this.randomNum = 1;
	
	this.range = (a = 1, b = 0) => {
		this.amount++;
		this.randomNum = ((Math.max(this.seed, this.seed2) * this.randomNum / Math.min(this.seed, this.seed2) + this.amount) * -1) % 543853483248;
		const r = Math.abs(Math.sin(this.randomNum));
		console.log(r)
		return Math.round(r * (b - a) + a);
	}

	this.setSeed = value => {
		this.amount = 1;
		this.randomNum = 1;
		this.seed = value || Math.round( Math.random() * 999_999_999_999_999 );
		this.seed2 = Math.abs(Math.round(Math.sin(seed) * 999_999_999_999_999)) || 123;
	}

	this.getSeed = () => {
		return this.seed;
	}
}