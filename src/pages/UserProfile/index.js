import React, { useEffect, useState } from "react";
import './UserProfile.css';
import { getUserDetails } from "../../api.js"
import { Button } from "@mui/material";

function UserProfile(props) {
    const [user, setUser] = useState({})
    const [spores, setSpores] = useState(0)
    const [verifyImage, setVerifyImage] = useState(true)
    const [image, setImage] = useState("")

    const getUserData = async () => {
        return getUserDetails().then(res => {
            if (!res) return null
            const user = res["data"]["user"]
            setUser(user)
        })
    }

    const updateSporesCount = async (purchase) => {
        if (purchase <= spores) {
            setSpores(spores - purchase)
        }
    }

    useEffect(() => {
        getUserData()
        setSpores(500) //change this for the iteration
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