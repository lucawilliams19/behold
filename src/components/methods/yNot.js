export const yNot = (a, b) => {
	// convert to strings and force lowercase
	a = typeof a === 'string' ? a.toLowerCase() : a.toString()
	b = typeof b === 'string' ? b.toLowerCase() : b.toString()

	// if a organized before b 
	return a.localeCompare(b)
}
