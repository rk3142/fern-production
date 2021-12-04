import React, { useEffect, useState } from "react";
import './UserProfile.css';
import { getUserDetails, spendSpores, getSporesHistory, sendImage } from "../../api.js"
import { Button } from "@mui/material";

function UserProfile(props) {
    const [user, setUser] = useState({})
    const [spores, setSpores] = useState(0)
    const [history, setHistory] = useState({})
    const [verifyImage, setVerifyImage] = useState(true)
    const [image, setImage] = useState("")

    const updateSporesCount = async (purchase, type) => {
        if (purchase <= spores) {
            setSpores(spores - purchase)
        } else {
            window.alert('Not enough spores!');
        }

        return spendSpores(type).then(res => {
            if (!res) return null
            //console.log(res)
        })
    }

    useEffect(async () => {
        await getUserDetails().then(response => {
            if (!response) return null
            let res = response["data"]["user"]
            console.log(res)
            setUser(res)
            setSpores(res['current_spore_count'])
        })
        setTimeout(async function () {
            getSporesHistory().then(async response => {
                if (!response) {
                    return null
                }
                let res = response["data"]
                await setHistory(res)
                localStorage.setItem("history", JSON.stringify(res))
            })
        }, 6000);
    }, [])

    const uploadImage = async () => {
        if (image.length === 0) {
            alert("Please choose an image")
            return
        } else if (image.files[0].size > 1000000) {
            alert("File size must be < 1 MB")
            return
        } else if (image.files[0].type !== "image/png") {
            alert("File must be .png format")
            return
        }
        encodeImageFileAsURL()
        alert("Image uploaded")
    }

    const changeImage = (event) => {
        setImage(event.target)
    }

    const encodeImageFileAsURL = () => {
        var file = image.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result)
            return sendImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    const renderImageVerification = () => {
        if (verifyImage) {
            return (
                <p className="Verify_Text" onClick={() => setVerifyImage(!verifyImage)}>Verify Image</p>
            )
        } else {
            return (
                <div>
                    <input type="file" onChange={changeImage}></input>
                    <Button onClick={async () => await uploadImage()}>Upload</Button>
                </div>
            )
        }
    }

    const renderHistory = () => {
        let history = JSON.parse(localStorage.getItem("history"))
        if (history == null) { return(<p></p>) }
        return (history).map(item => <p>{item["details"]}</p>)
    }

    return (
        <div>
            <div className="User_Info">
                <div className="User_Account_Info">
                    <p className="User_Title">
                        Hi {user["first_name"]}
                    </p>
                    <p className="User_Subtitle">
                        {spores} spores
                    </p>
                </div>
                <div className="Token_Spend">
                    <div className="Plant_Tree">
                        <Button variant='contained' className={'details__info__more__actions__buttons-spend'} onClick={() => updateSporesCount(300, "TREE")}>Plant a Tree!</Button>
                    </div>
                    <div className="Collect_Trash">
                        <Button variant='contained' className={'details__info__more__actions__buttons-spend'} onClick={() => updateSporesCount(400, "OCEAN")}>Collect a pound of trash!</Button>
                    </div>
                    <div className="Collect_Trash">
                        <Button variant='contained' className={'details__info__more__actions__buttons-spend'} onClick={() => updateSporesCount(50, "CARBON")}>Capture a pound of carbon!</Button>
                    </div>
                    <div className="Collect_Trash">
                        {renderImageVerification()}
                    </div>
                </div>
            </div>
            <div className="Token_Spend">
                <p className="User_Subtitle">
                    My Impact
                </p>
                {renderHistory()}
            </div>
        </div>
    );
}

export default UserProfile;