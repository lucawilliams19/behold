import React, { useState } from 'react'
import * as XLSX from 'xlsx'
import DataTable from 'react-data-table-component'
import { createNewArr } from './components/methods/createNewArr'
import { yNot } from './components/methods/yNot'

function App() {
	const [columns, setColumns] = useState([])
	const [columns1, setColumns1] = useState([])
	const [data, setData] = useState([])
	const [data1, setData1] = useState([])

	// process CVS data
	const processData = (dataString) => {
		let dataStringLines = dataString.split(/\r\n|\n/)
		dataStringLines.unshift('Usernames')
		console.log(`this is the datastringLines ${dataStringLines}`)
		const headers = dataStringLines[0].split(
			/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
		)
		console.log(`this is the headers: ${headers}`)

		const SortedArr = createNewArr(dataStringLines)

		//initialize list
		const list = []
		//loop through datastringLines
		for (let i = 1; i < dataStringLines.length; i++) {
			const row = dataStringLines[i].split(
				/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
			)

			//if the headers exist and the row length is the same as the header length
			if (headers && row.length === headers.length) {
				//init object(not bound by conditional)
				const obj = {}
				//loop through headers or row
				for (let j = 0; j < headers.length; j++) {
					//let d = row at index j
					let d = row[j]
					//if d's length is greater than 0
					if (d.length > 0) {
						//if(d at index 0 === blank)
						//make d equal to d from the first letter to the last one
						if (d[0] === '"') d = d.substring(1, d.length - 1)
						if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1)
					}
					//if header at index j exists
					if (headers[j]) {
						//the object at the index of header is equal to the username
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
			username: c,
			selector: c,
		}))
		setData(list)
		console.log(`this is the list ${list}`)
		setColumns(columns)
		console.log(`this is the colmuns ${columns}`)
	}
	
	const processData1 = (dataString) => {
		let dataStringLines = dataString.split(/\r\n|\n/)
		dataStringLines.unshift('Usernames')
		console.log(`this is the datastringLines ${dataStringLines}`)
		const headers = dataStringLines[0].split(
			/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
		)
		console.log(`this is the headers: ${headers}`)

		const SortedArr = createNewArr(dataStringLines)

		//initialize list
		const list = []
		//loop through datastringLines
		for (let i = 1; i < dataStringLines.length; i++) {
			const row = dataStringLines[i].split(
				/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
			)

			//if the headers exist and the row length is the same as the header length
			if (headers && row.length === headers.length) {
				//init object(not bound by conditional)
				const obj = {}
				//loop through headers or row
				for (let j = 0; j < headers.length; j++) {
					//let d = row at index j
					let d = row[j]
					//if d's length is greater than 0
					if (d.length > 0) {
						//if(d at index 0 === blank)
						//make d equal to d from the first letter to the last one
						if (d[0] === '"') d = d.substring(1, d.length - 1)
						if (d[d.length - 1] === '"') d = d.substring(d.length - 2, 1)
					}
					//if header at index j exists
					if (headers[j]) {
						//the object at the index of header is equal to the username
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
			username: c,
			selector: c,
		}))
		setData1(list)
		console.log(`this is the list ${list}`)
		setColumns1(columns)
		console.log(`this is the colmuns ${columns}`)
	}

	//handle file upload of first box
	const handleFirstFileUpload = (e) => {
		const file = e.target.files[0]
		const reader = new FileReader()

		reader.onload = (evt) => {
			/*Parse Data */
			const bstr = evt.target.result
			console.log(`this is the bstr ${bstr}`)
			const wb = XLSX.read(bstr, { type: 'binary' })
			console.log(`this is the wb ${wb}`)
			/*Get first worksheet */
			const wsname = wb.SheetNames[0]
			console.log(`this is the wsname ${wsname}`)
			const ws = wb.Sheets[wsname]
			console.log(`this is the ws ${ws}`)
			/*Convert array of arrays */
			const data = XLSX.utils.sheet_to_csv(ws, { header: 1 })
			console.log(`this is the data ${data}`)
			processData(data)
		}
		reader.readAsBinaryString(file)
	}

	const handleSecondFileUpload = (e) => {
		const file = e.target.files[0]
		const reader = new FileReader()

		reader.onload = (evt) => {
			/*Parse Data */
			const bstr = evt.target.result
			console.log(`this is the bstr ${bstr}`)
			const wb = XLSX.read(bstr, { type: 'binary' })
			console.log(`this is the wb ${wb}`)
			/*Get first worksheet */
			const wsname = wb.SheetNames[0]
			console.log(`this is the wsname ${wsname}`)
			const ws = wb.Sheets[wsname]
			console.log(`this is the ws ${ws}`)
			/*Convert array of arrays */
			const data = XLSX.utils.sheet_to_csv(ws, { header: 1 })
			console.log(`this is the data ${data}`)
			processData1(data)
		}
		reader.readAsBinaryString(file)
	}

	return (
		<div className='container'>
			<h3>Read CSV file in React</h3>

			<h4>Input 1</h4>
			<input
				type='file'
				accept='.csv,.xlsx,.xls'
				onChange={handleFirstFileUpload}
			/>

			<DataTable pagination highlightOnHover columns={columns} data={data} />
			<h4>Input 2</h4>
			<input
				type='file'
				accept='.csv,.xlsx,.xls'
				onChange={handleSecondFileUpload}
			/>

			<DataTable pagination highlightOnHover columns={columns1} data={data1} />
		</div>
	)
}

export default App
