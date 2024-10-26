const Delete = ({ id }) => {
    const deleteChat = async () => {
        let headersList = {
            "Accept": "*/*"
        }
        let response = await fetch(`http://localhost:9000/ques/history/delete/${id}`, {
            method: "DELETE",
            headers: headersList
        });

        let data = await response.text();
        console.log(data);
    }
    return (
        <>
            <button onClick={deleteChat} className="absolute right-[20px] bottom-[10px]">
                <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/filled-trash.png" alt="filled-trash" />
            </button>
        </>
    )
}

export default Delete