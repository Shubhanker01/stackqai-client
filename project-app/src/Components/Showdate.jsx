import Card from 'react-bootstrap/Card';
const Showdate = (props) => {
  return (
    <>
      <Card>
        <Card.Title className='m-2 pl-2'>{props.date}</Card.Title>
      </Card>

    </>
  )
}

export default Showdate