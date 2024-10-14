export const filterSearch = (search, items) => {
    let arr = items.filter((item) => {
        return item.question.toLowerCase().includes(search.toLowerCase())
    })
    return arr
}

