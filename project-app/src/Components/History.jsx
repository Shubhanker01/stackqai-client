import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { filterSearch } from '../Utilities/searchfilter'
import Showdate from "./Showdate";
import QuesAnsHistory from "./QuesAnsHistory";


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
            // let arr = filterSearch(search, res)
            getItems(res)
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
                                {
                                    items.map((item) => {
                                        return <div key={item.key} className="mb-2">
                                            <Showdate date={item.date} />
                                            <QuesAnsHistory data={item.arr}/>
                                        </div>
                                    })
                                }

                            </div>
                    }
                </div>
            </div>
        </>
    )
}