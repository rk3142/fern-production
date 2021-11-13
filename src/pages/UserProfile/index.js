import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import co2_icon from '../../assets/CO2.png'
import h2o_icon from '../../assets/h2o_icon.png'
import energy_icon from '../../assets/energy_icon.jpeg'
import './UserProfile.css';
import SimilarItemCard from "../../components/SimilarItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllCatalog, selectProducts } from "../../reducers/catalogSlice";
import { getUserDetails } from "../../api.js"
import { Button, CircularProgress } from "@mui/material";

function UserProfile(props) {
    const dispatch = useDispatch();
    const items = useSelector(selectProducts).filteredProducts
    const status = useSelector(selectProducts).status
    const [user, setUser] = useState({})
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
        let sporeCount = 0
        sporeCount -= purchase
        let user_new = user
        user_new["spores"] = sporeCount
        setUser(user_new)
    }

    useEffect(() => {
        getUserData()
    }, [])

    const uploadImage = () => {
        if (image.length == 0) { 
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
                    500 spores
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