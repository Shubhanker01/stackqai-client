import Sidebar from "./Sidebar";
import 'react-chat-elements/dist/main.css'
import Searchbar from "./Searchbar";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import { filterSearch } from '../Utilities/searchfilter'
import Delete from "./Delete";

export default function History() {
    const [items, getItems] = useState([])
    const [search, setSearch] = useState("")
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
            let arr = filterSearch(search, res)
            getItems(arr)
        }).catch(err => console.log(err))
    }, [search, items])


    return (
        <>
            <Sidebar />
            <Searchbar search={search} setSearch={setSearch} />
            <div className="fixed w-[80%] top-[70px] h-[80%] left-[100px] overflow-auto lg:left-[250px] lg:top-[100px]">
                <div className="pt-2 relative mx-auto text-gray-600">
                    {
                        items.length === 0 ?
                            <div>Nothing to Show in History</div> :
                            <div>
                                {/* {items.map((item) => {
                                    return <Card key={item._id} style={{ width: '80%' }} className="mt-2">
                                        <Card.Body className="mb-2">
                                            <Card.Text>{item.date}</Card.Text>
                                            <Card.Subtitle className="mb-2 text-muted">{item.question}</Card.Subtitle>
                                            <Card.Text>
                                                {item.answer}
                                            </Card.Text>
                                            <Delete id={item._id} />
                                        </Card.Body>

                                    </Card>
                                })} */}
                                
                            </div>
                    }
                </div>
            </div>
        </>
    )
}