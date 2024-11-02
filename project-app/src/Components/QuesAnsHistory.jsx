import React from 'react'
import Card from 'react-bootstrap/Card';
import Delete from './Delete';

function QuesAnsHistory(props) {
    return (
        <>
            {
                props.data.map((item) => {
                    return <Card key={item._id}>
                        <Card.Body>
                            <Card.Subtitle>
                                {item.question}
                            </Card.Subtitle>
                            <Card.Text>
                                {item.answer}
                            </Card.Text>
                            <Card.Text>
                                {item.time}
                            </Card.Text>
                            <Delete id={item._id} />
                        </Card.Body>
                    </Card>
                })
            }
        </>
    )
}

export default QuesAnsHistory