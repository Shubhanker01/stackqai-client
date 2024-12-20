import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import Showdate from "./Showdate";
import QuesAnsHistory from "./QuesAnsHistory";
import Results from "./Results";
import DeleteAll from "./DeleteAll";
import PaginationRecord from "./PaginationRecord";

export default function History() {
    const [items, getItems] = useState([])
    const [search, setSearch] = useState("")
    const [searchState, setSearchState] = useState(false)
    // const [checkDelete, isCheckDelete] = useState(false)
    const [currentPage,setCurrentPage] = useState(1)
    const [recordsPerPage] = useState(2)
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
    }, [search])

    // get current posts
    const indexOfLastRecord = currentPage * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
    const currentRecord = items.slice(indexOfFirstRecord,indexOfLastRecord)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    // console.log(currentRecord)
    // console.log(items)
    return (
        <>
            <Sidebar />
            <Searchbar search={search} setSearch={setSearch} setSearchState={setSearchState} length={items.length} />
            <DeleteAll length={items.length} getItems={getItems} />
            <div className="fixed w-[80%] top-[70px] h-[80%] left-[100px] overflow-auto lg:left-[250px] lg:top-[100px]">
                <div className="pt-2 relative mx-auto text-gray-600">
                    {
                        items.length === 0 ?
                            <div>Nothing to Show in History</div> :
                            <div className="w-[80%]">
                                {
                                    search.length === 0 ? <>
                                        {
                                            currentRecord.map((item) => {
                                                return <div key={item.key} className="mb-4">
                                                    {
                                                        item.arr !== 0 ? <>
                                                            <Showdate date={item.date} />
                                                            <QuesAnsHistory data={item.arr} items={currentRecord} getItems={getItems} itemkey={item.key}/>
                                                        </> :
                                                            <>
                                                                <p>Nothing to Show</p>
                                                            </>
                                                    }
                                                </div>
                                            })
                                            
                                        }
                                        

                                    </> :
                                        <>
                                            <Results search={search} items={items} getItems={getItems} />
                                        </>
                                }

                            </div>
                    }
                </div>
            </div>
            <PaginationRecord recordsPerPage={recordsPerPage} totalRecords={items.length} paginate={paginate} currentPage={currentPage}></PaginationRecord>
        </>
    )
}