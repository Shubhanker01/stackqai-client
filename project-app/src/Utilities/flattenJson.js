export const flattenJson = (items) => {
    let res = []
    items.map((item) => {
        item.arr.map((obj) => {
            res.push({ date: item.date, ...obj })
        })
    })

    return res
}