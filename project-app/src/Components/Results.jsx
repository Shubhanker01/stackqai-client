import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import { filterSearch } from '../Utilities/searchfilter'
import { flattenJson } from '../Utilities/flattenJson';
import Checkbox from './Checkbox';
import Select from './Select';

function Results({ search, items,getItems }) {
  const [results, setResults] = useState([])
  let [noOfSelection, setNoOfSelection] = useState(0)
  let [ids, selectedIds] = useState([])


  useEffect(() => {
    let arr = flattenJson(items)
    let filterRes = filterSearch(search, arr)
    setResults(filterRes)
  }, [search])

  return (
    <>
      {/* {console.log(results)} */}
      <Card>
        <Card.Title className='p-2'>Found {results.length} results for "{search}"</Card.Title>
      </Card>
      <div>
        {
          ids.length !== 0 ?
            <div>
              <Select noOfSelection={noOfSelection} ids={ids} selectedIds={selectedIds} filterResults={results} setResults={setResults} items={items} getItems={getItems}></Select>
            </div> :
            <div></div>
        }
        {
          results.map((obj) => {
            return <Card key={obj._id}>
              <Card.Body>
                <div className='flex mb-2'>
                  <Checkbox id={obj._id} ids={ids} selectedIds={selectedIds} />
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