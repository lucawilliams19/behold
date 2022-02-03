import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import DataTable from 'react-data-table-component'

function App() {
	const [columns, setColumns] = useState([])
	const [data, setData] = useState([])

	// process CVS data
	const processData = (dataString) => {
		/*DataStringLines: Variable of unnested array of names */
		/*/\r\n|\n/ switches to the next line */
		/*dataString.split(/\r\n|\n/) checks for line breaks in the data and creates a new array of each name that is split by a line seperation */
		const dataStringLines = dataString.split(/\r\n|\n/)
		console.log(`this is the dataStringLines:  ${dataStringLines}`)
		const headers = dataStringLines[0].split(
			/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
		)
		console.log(`this is the headers: ${headers}`)

		const list = []
		for (let i = 1; i < dataStringLines.length; i++) {
			const row = dataStringLines[i].split(
				/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
			)
			if (headers && row.length === headers.length) {
				const obj = {}

				for (let j = 0; j < headers.length; j++) {
					let d = row[j]
					if (d.length > 0) {
						if (d[0] === '"') d = d.substring(1, d.length - 1)
						if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1)
					}
					if (headers[j]) {
						obj[headers[j]] = d
					}
				}
				//remove the blank rows
				if (Object.values(obj).filter((x) => x).length > 0) {
					list.push(obj)
				}
			}
		}
		const columns = headers.map((c) => ({
			name: c,
			selector: c,
		}))
		setData(list)
		setColumns(columns)
	}

	//handle file upload of first box
	const handleFileUpload = (e) => {
		const file = e.target.files[0]
		const reader = new FileReader()

		reader.onload = (evt) => {
			/*Parse Data */
			const bstr = evt.target.result
			const wb = XLSX.read(bstr, { type: 'binary' })
			/*Get first worksheet */
			const wsname = wb.SheetNames[0]
			const ws = wb.Sheets[wsname]
			/*Convert array of arrays */
			const data = XLSX.utils.sheet_to_csv(ws, { header: 1 })
			processData(data)
		}
		reader.readAsBinaryString(file)
	}

	const handleFormat = (names) => {
		const allData = data + data
	}

	return (
		<div className='container'>
			<h3>Read CSV file in React</h3>
			<input type='file' accept='.csv,.xlsx,.xls' onChange={handleFileUpload} />
			<h4>Input 1</h4>
			<button onClick={handleFormat(data)}>format</button>
			<DataTable pagination highlightOnHover columns={columns} data={data} />
		</div>
	)
}

export default App
