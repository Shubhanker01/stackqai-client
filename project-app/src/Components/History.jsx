import Sidebar from "./Sidebar";
import 'react-chat-elements/dist/main.css'
import { ChatItem } from 'react-chat-elements'
import Searchbar from "./Searchbar";


export default function History() {
    return (
        <>
            <Sidebar />
            <Searchbar />
            <div className="w-[80%] ml-[130px] mt-[30px]">
                <div className="pt-2 relative mx-auto text-gray-600">

                </div>
                <ChatItem
                    alt={'Reactjs'}
                    title={'This is my title'}
                    subtitle={'What are you doing?'}
                    date={new Date()}
                    unread={0}
                />
            </div>
        </>
    )
}