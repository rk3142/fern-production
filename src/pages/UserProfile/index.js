import React, { useEffect, useState } from "react";
import './UserProfile.css';
import { getUserDetails, spendSpores } from "../../api.js"
import { Button } from "@mui/material";

function UserProfile(props) {
    const getUserData = async () => {
        return await getUserDetails().then(res => {
            if (!res) return null
            //console.log(res)
            let user = res["data"]["user"]
            //console.log(user)
            return user;
        })
    }

    const [user, setUser] = useState(getUserData())
    const [spores, setSpores] = useState(100)
    const [verifyImage, setVerifyImage] = useState(true)
    const [image, setImage] = useState("")

    const updateSporesCount = async (purchase) => {
        if (purchase <= spores) {
            await setSpores(spores - purchase)
        } else {
            alert("Not enough spores")
            return;
        }
        console.log(spores)
        console.log(user)
        return spendSpores().then(res => {
            if (!res) return null
            //console.log(res)
        })
    }

    useEffect(async () => {
        let spore = (await getUserData())["current_spore_count"]
        await setUser(await getUserData())
        setSpores(spore)
    }, [])

    const uploadImage = () => {
        if (image.length === 0) {
            alert("Please choose an image")
            return 
        }
        alert("Image uploaded")
    }

    const changeImage = (event) => {
        setImage(event.target.files[0])
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
                    <Button onClick = {() => uploadImage()}>Upload</Button>
                </div>
            )
        }
    }

    return (
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
                    <Button variant='contained' className={'details__info__more__actions__buttons-spend'} onClick={() => updateSporesCount(300)}>Plant a Tree!</Button>
                </div>
                <div className="Collect_Trash">
                    <Button variant='contained' className={'details__info__more__actions__buttons-spend'} onClick={() => updateSporesCount(400)}>Collect a pound of trash!</Button>
                </div>
                <div className="Collect_Trash">
                    <Button variant='contained' className={'details__info__more__actions__buttons-spend'} onClick={() => updateSporesCount(50)}>Capture a pound of carbon!</Button>
                </div>
                <div className="Collect_Trash">
                    {renderImageVerification()}
                </div>
            </div>
        </div>
    );
}

export default UserProfile;