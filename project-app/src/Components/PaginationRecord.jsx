import React from 'react'
import Pagination from 'react-bootstrap/Pagination'

function PaginationRecord({ recordsPerPage, totalRecords, paginate, currentPage }) {
    const paginationNumbers = []
    for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
        paginationNumbers.push(
            <Pagination.Item key={i} onClick={() => { paginate(i) }} active={currentPage == i}>
                {i}
            </Pagination.Item>
        )

    }
    return (
        <>
            <div className='fixed bottom-[10px] left-[100px]'>
                <Pagination>{paginationNumbers}</Pagination>
            </div>

        </>
    )
}

export default PaginationRecord