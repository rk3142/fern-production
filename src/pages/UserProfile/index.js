import React, { useEffect, useState } from "react";
import './UserProfile.css';
import { getUserDetails, spendSpores, getSporesHistory, sendImage } from "../../api.js"
import { Button } from "@mui/material";
import sporesImage from '../../assets/spores.png'

function UserProfile() {
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
                <Button variant='contained'
                        className="user_page_btn Verify_Text"
                        onClick={() => setVerifyImage(!verifyImage)}>
                    Verify Purchase
                </Button>
            )
        } else {
            return (
                <div>
                    <input type="file" onChange={changeImage}></input>
                    <Button variant='contained'
                            className='user_page_btn Verify_Text'
                            onClick={async () => await uploadImage()}>
                        Upload
                    </Button>
                </div>
            )
        }
    }

    const renderHistory = () => {
        let history = JSON.parse(localStorage.getItem("history"))
        if (history == null) { return(<p></p>) }
        return (history).map(item => <div className='impact_history'>{item["details"]}</div>)
    }

    return (
        <div className={'user_page'}>
            <div className="User_Info">
                <div className="User_Account_Info">
                    <h1 className="User_Title">
                        Hi {user["first_name"]}
                    </h1>
                    <div className={'User_Account_Info__spores'}>
                        <h2 className="User_Subtitle">
                            {spores} spores
                        </h2>
                        <div className="Collect_Trash">
                           {renderImageVerification()}
                        </div>
                    </div>
                </div>

                <div className="Token_Spend">
                    <h2>Make an Impact</h2>
                    <div className='Token_Spend__details'>
                        <div className="Plant_Tree">
                            For 300 Spores, plant a tree!
                            <Button variant='contained'
                                    className={'user_page_btn details__info__more__actions__buttons-spend'}
                                    onClick={() => updateSporesCount(300, "TREE")}>
                                Plant!
                            </Button>
                        </div>
                        <div className="Collect_Trash">
                            For 400 Spores, collect a pound of trash!
                            <Button variant='contained'
                                    className={'user_page_btn details__info__more__actions__buttons-spend'}
                                    onClick={() => updateSporesCount(400, "OCEAN")}>
                                Collect!
                            </Button>
                        </div>
                        <div className="Collect_Trash">
                            For 50 Spores, capture a pound of carbon!
                            <Button variant='contained'
                                    className={'user_page_btn details__info__more__actions__buttons-spend'}
                                    onClick={() => updateSporesCount(50, "CARBON")}>
                                Capture!
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="Token_Spend">
                    <h2 className="User_Subtitle">
                        My Impact
                    </h2>
                    {renderHistory()}
                </div>
            </div>

            <div className={'user_page__spores'}>
                <img src={sporesImage} alt={'Spores'} />
            </div>

        </div>
    );
}

export default UserProfile;