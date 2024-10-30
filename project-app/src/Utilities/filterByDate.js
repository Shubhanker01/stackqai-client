export const filterByDate = (json) => {
    let dateArr = []
    dateArr.push(json[0].date)
    for (let i = 1; i < json.length; i++) {
        if (json[i].date !== json[i - 1].date) {
            dateArr.push(json[i].date)
        }
    }
    return dateArr
}