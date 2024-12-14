import React from 'react'
import Button from 'react-bootstrap/Button';

function Pagination({ postsPerPage, length }) {
    const paginationNumbers = []
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumbers.push(i)
    }
    return (
        <>
            <div>
                {
                    paginationNumbers.map((pageNumber) => {
                        return <Button variant='primary' key={pageNumber}>{pageNumber}</Button>
                    })
                }
            </div>

        </>
    )
}

export default Pagination