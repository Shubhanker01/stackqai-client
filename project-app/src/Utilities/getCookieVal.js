export const getCookieVal = () => {
    let cookies = document.cookie
    let arr = cookies.split('; ')
    let tokenVal = arr.find((row) => row.startsWith('token='))
    return tokenVal.split("=")[1]
}