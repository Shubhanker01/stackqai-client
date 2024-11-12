import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { filterSearch } from '../Utilities/searchfilter'
import { flattenJson } from '../Utilities/flattenJson';
import Checkbox from './Checkbox';

function Results({ search, items }) {
  const [results, setResults] = useState([])

  useEffect(() => {
    let arr = flattenJson(items)
    let filterRes = filterSearch(search, arr)
    setResults(filterRes)
  }, [search])

  return (
    <>
      <Card>
        <Card.Title className='p-2'>Found {results.length} results for "{search}"</Card.Title>
      </Card>
      <div>
        {
          results.map((obj) => {
            return <Card key={obj._id}>
              <Card.Body>
                <div className='flex mb-2'>
                  <Checkbox />
                  <Card.Subtitle className='pt-[3px] pl-[5px]'>{obj.date}</Card.Subtitle>
                </div>

                <Card.Subtitle>{obj.question}</Card.Subtitle>
                <Card.Text>{obj.answer}</Card.Text>
                <Card.Text>{obj.time}</Card.Text>
              </Card.Body>

            </Card>
          })
        }
      </div>
    </>
  )
}

export default Results