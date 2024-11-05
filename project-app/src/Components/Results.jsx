import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
function Results(props) {
  const [results, setResults] = useState([])
  useEffect(() => {


  }, [])
  return (
    <>
      <Card>
        <Card.Title className='p-2'>Found 0 results for {props.search}</Card.Title>
      </Card>
      <div>
        {
          props.items.map((item) => {
            return item.arr.map((obj) => {
              return <div key={obj._id}>
                <p>{obj.question}</p>
                <p>{obj.answer}</p>
              </div>
            })
          })
        }
      </div>
    </>
  )
}

export default Results