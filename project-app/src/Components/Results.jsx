import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { filterSearch } from '../Utilities/searchfilter'
import { flattenJson } from '../Utilities/flattenJson';
function Results(props) {
  const [results, setResults] = useState([])

  useEffect(() => {
    let arr = flattenJson(props.items)
    let filterRes = filterSearch(props.search, arr)
    setResults(filterRes)
    console.log("i am called")
  }, [props.search])

  return (
    <>
      <Card>
        <Card.Title className='p-2'>Found 0 results for {props.search}</Card.Title>
      </Card>
      <div>
        {
          results.map((obj) => {
            return <div key={obj._id}>
              <p>{obj.question}</p>
              <p>{obj.answer}</p>
            </div>
          })
        }
      </div>
    </>
  )
}

export default Results