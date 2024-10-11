import Sidebar from "./Sidebar";
import 'react-chat-elements/dist/main.css'
import Searchbar from "./Searchbar";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';

export default function History() {
    const [items, getItems] = useState([])
    const cookies = new Cookies()

    const getHistory = async () => {
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/json"
        }
        let bodyContent = JSON.stringify({
            "token": cookies.get('token')
        });
        let response = await fetch("http://localhost:9000/ques/history", {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });

        let data = await response.json();
        return data

    }
    useEffect(() => {
        getHistory().then((res) => {
            getItems(res)
        }).catch(err => console.log(err))
    }, [items])

    return (
        <>
            <Sidebar />
            <Searchbar />
            <div className="w-[80%] ml-[130px] mt-[30px]">
                <div className="pt-2 relative mx-auto text-gray-600">

                </div>
                {
                    items.length === 0 ?
                        <div>Nothing to Show in History</div> :
                        <div>
                            {items.map((item) => {
                                return <Card key={item._id} style={{ width: '80%' }}>
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-muted">{item.question}</Card.Subtitle>
                                        <Card.Text>
                                            {item.answer}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            })}

                        </div>
                }

            </div>
        </>
    )
}