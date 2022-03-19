// export const processData = (dataString) => {
// 	let dataStringLines = dataString.split(/\r\n|\n/)
// 	dataStringLines.unshift('Usernames')
// 	console.log(`this is the datastringLines ${dataStringLines}`)
// 	const headers = dataStringLines[0].split(
// 		/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
// 	)
// 	console.log(`this is the headers: ${headers}`)

// 	const SortedArr = createNewArr(dataStringLines)

// 	//initialize list
// 	const list = []
// 	//loop through datastringLines
// 	for (let i = 1; i < dataStringLines.length; i++) {
// 		const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/)

// 		//if the headers exist and the row length is the same as the header length
// 		if (headers && row.length === headers.length) {
// 			//init object(not bound by conditional)
// 			const obj = {}
// 			//loop through headers or row
// 			for (let j = 0; j < headers.length; j++) {
// 				//let d = row at index j
// 				let d = row[j]
// 				//if d's length is greater than 0
// 				if (d.length > 0) {
// 					//if(d at index 0 === blank)
// 					//make d equal to d from the first letter to the last one
// 					if (d[0] === '"') d = d.substring(1, d.length - 1)
// 					if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1)
// 				}
// 				//if header at index j exists
// 				if (headers[j]) {
// 					//the object at the index of header is equal to the username
// 					obj[headers[j]] = d
// 				}
// 			}

// 			//remove the blank rows
// 			if (Object.values(obj).filter((x) => x).length > 0) {
// 				list.push(obj)
// 			}
// 		}
// 	}
// 	const columns = headers.map((c) => ({
// 		username: c,
// 		selector: c,
// 	}))
// 	setData(list)
// 	console.log(`this is the list ${list}`)
// 	setColumns(columns)
// 	console.log(`this is the colmuns ${columns}`)
// }
