export const yNot = (a, b) => {
	// convert to strings and force lowercase
	a = typeof a === 'string' ? a.toLowerCase() : a.toString()
	b = typeof b === 'string' ? b.toLowerCase() : b.toString()

	// if a organized before b 
	return a.localeCompare(b)
}



//Sorting code
//use lodash
//headers has an issue running
//filter the sets of data for the username column
// let unique = new Set([...data1, ...data2])
// test = .uniqueBy()
