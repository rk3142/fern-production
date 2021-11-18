import React, { useEffect, useState } from "react";
import './UserProfile.css';
import { getUserDetails, spendSpores } from "../../api.js"
import { Button } from "@mui/material";

function UserProfile(props) {
    const [user, setUser] = useState({})
    const [spores, setSpores] = useState(100)

    const updateSporesCount = async (purchase) => {
        if (purchase <= spores) {
            setSpores(spores - purchase)
        } else {
            window.alert('Not enough spores!');
        }

        // return spendSpores().then(res => {
        //     if (!res) return null
        //     console.log(res)
        // })
    }

    useEffect( () => {
        getUserDetails().then(response => {
            if (!response) return null
            let res = response["data"]["user"]
            setUser(res)
            setSpores(res['current_spore_count'])
        })
    }, [])

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
            </div>
        </div>
    );
}

export default UserProfile;