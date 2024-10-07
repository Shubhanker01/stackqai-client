import { useEffect, useState } from "react"
import logo from '/stackQAI/Frontend/project-app/src/icons8-dots-loading.gif'

export default function Chatbot(props) {
    const [loader, setLoader] = useState(props.loader)

    // const saveQues = async () => {
    //     let headersList = {
    //         "Accept": "*/*",
    //         "Content-Type": "application/json"
    //     }
    //     let bodyContent = JSON.stringify({
    //         "email": props.email,
    //         "question": props.ques,
    //         "answer": props.answer
    //     })
    //     let response = await fetch("http://localhost:9000/ques", {
    //         method: 'POST',
    //         headers: headersList,
    //         body: bodyContent
    //     })
    //     let data = await response.text()
    //     return data
    // }

    useEffect(() => {
        if (props.answer != "") {
            setLoader(false)
        }
    }, [loader])

    // useEffect(()=>{
    //     console.log(props.answer)
    // },[])

    return (
        <>
            {
                loader == true ?
                    <div>
                        <img src={logo}></img>
                    </div> :
                    <div className="mt-[4px] flex">
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB2UlEQVR4nO2XzUrDQBDH9yGac3f7GH6AFz9KFR8muSuI4FncfQCL6Nm7TajVl/DW9GiF7G4q1pKVKVTbImySpklW84OBkGY2//9MdpkiVFFRsRYaNGgRygeYcb/OZBOZBmbcJ0woCMx4H5kGNt1Anclm/XKoIDCT+8hELMdTEMhUrMpARuArfkyY8AgTcrYx1xiSUO4SGhxlIp4wcZGDaPVbYCrOs6i8KjaCw1Wq7xVvgHfSd4AJUbQBTAVfpQOqDIEqA+yPdmCrLdWTP1HhOFI9f6I2r6VWzHY7/M55jJmTSHTN7rQsxxvAGKBbGITMA4J0Oc+DxZxuX58zHUlsz6/Znv5/BTw4m2F0C0MV55HjKHGO+NDnzPRYjqsfy38e1hvopejActe6cTsQdzBMYgD2AIiGqoKQON/zcs5GjJy1GcgrrP9lwI6/ifM34Oo3MRxVMxPlMuD2Lcc9QElI87Llc34e+C3NmigtaV62dxeqt/fFsx6Ae7u3YfkNECbUzk2o7l8+1XAUqddRNL2Ge2nXQ3kbyDqQyQYwE4HZBih/MNpAgwYtcw1QcZZafFEGMBMCPpuVKq8zgBk/QSZATBYPGC0eMFo8YLR4wGjxAKHidHpRUVGBysoXiqg/QlHbzzMAAAAASUVORK5CYII=" className="h-[35px] w-[35px]" />
                        <p className="font-normal text-sm pl-2 pr-2 text-slate-900 lg:text-lg">{props.answer}</p>
                    </div>
            }

        </>
    )
}