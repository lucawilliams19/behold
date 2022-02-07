export const createNewArr = (dataStringLines) => {
	 const sortAlphaNumeric = (a, b) => {
			// convert to strings and force lowercase
			a = typeof a === 'string' ? a.toLowerCase() : a.toString()
			b = typeof b === 'string' ? b.toLowerCase() : b.toString()

			return a.localeCompare(b)
		}

	let newArr = []
	for (let i = 0; i < dataStringLines.length - 1; i++) {
		const users = dataStringLines[i].split(
			/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
		)
		newArr.push(users)
	}

	return newArr.sort(sortAlphaNumeric)
}
