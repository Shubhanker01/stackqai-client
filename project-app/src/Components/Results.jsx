import React from 'react'
import Card from 'react-bootstrap/Card';
function Results(props) {
    return (
        <>
          <Card>
            <Card.Title>Found 0 results for {props.search}</Card.Title>
          </Card>
        </>
    )
}

export default Results