function simpleTimeout(consoleTimer){
	console.timeEnd(consoleTimer);
}

// notice how it doesn't matter in what order the setTimeout() is called, the results are in the order the delay is expired
console.time("twoSecond");
setTimeout(simpleTimeout, 2000, "twoSecond");
console.time("oneSecond");
setTimeout(simpleTimeout, 1000, "oneSecond");
console.time("fiveSecond");
setTimeout(simpleTimeout, 5000, "fiveSecond");
console.time("50MilliSecond");
setTimeout(simpleTimeout, 50, "50MilliSecond"); //<Listing First>

