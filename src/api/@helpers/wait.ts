const wait = (ms: number) => {
	if (ms < 0) throw Error("'ms' must be > 0 in wait(ms)")

	return new Promise<true>(resolve => {
		setTimeout(() => {
			resolve(true)
		}, ms)
	})
}

export default wait;