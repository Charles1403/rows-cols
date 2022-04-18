import React, {useEffect, useState} from "react";
import axios from "axios";


const fetchData = () => {
  return  axios.get('https://randomuser.me/api/?results=20')
  .then((res) => {
      const {results} = res.data
      console.log(results)
      return results
  })
  .catch((err) => {
      console.log(err)
  })
}
   
function App() {
const [dataTable,  setDataTable] = useState([])



    useEffect(() => {
      fetchData().then((apiPeople) => setDataTable(apiPeople))
    },[])

 const column = [
   {heading: 'city', value: 'city'},
   {heading: 'latitude', value: ''},
   {heading: 'longitude', value: ''},
   {heading: 'country', value: 'country'},
   {heading: 'postcode', value: 'postcode'},
   {heading: 'state', value: 'state'},
   {heading: 'street number', value: ''},
   {heading: 'street name', value: ''},
   {heading: 'timezone offset', value: ''},
   {heading: 'description', value: 'description'},
 ]   
 
  return (
    <div className="App">
        <table style={{width: "80%"}}>
          <thead>
          <tr>
            {column.map((item, id) => <TableHeadItem key={id}item={item}/>)}
          </tr>
          </thead>
          <tbody>
            {dataTable.map((item, id) => <TableRow key={id} item={item} column={column}/>)}
          </tbody>
        </table>
    </div>
  );
}

const TableHeadItem = ({item}) => {
  return <th>{item.heading}</th>
}

const TableRow = ({item, column}) => {
  return (
      <tr>
          {column.map((columnItem) => {
            if ( columnItem.value.includes('.')){
              const itemSplit = columnItem.value.split('.')
              return <td>{item[itemSplit[0]][itemSplit[1]]}</td>
            }
              return (
                  <td>{item[`${columnItem.value}`]}</td>
              )
          })}
      </tr>
  )
}
  


export default App;


