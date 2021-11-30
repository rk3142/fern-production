import React, { useEffect, useState } from "react";
import './UserProfile.css';
import { getUserDetails, spendSpores, getSporesHistory } from "../../api.js"
import { Button } from "@mui/material";

function UserProfile(props) {
    const [user, setUser] = useState({})
    const [spores, setSpores] = useState(100)
    const [history, setHistory] = useState({})
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
            setUser(res)
            setSpores(res['current_spore_count'])
        })
        setTimeout(async function () {
            getSporesHistory().then(async response => {
                if (!response) return null
                let res = response["data"]
                await setHistory(res)
                localStorage.setItem("history", JSON.stringify(res))
            })
        }, 6000);
    }, [])

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
                        <Button variant='contained' className={'details__info__more__actions__buttons-spend'} onClick={() => updateSporesCount(400, "CARBON")}>Collect a pound of trash!</Button>
                    </div>
                    <div className="Collect_Trash">
                        <Button variant='contained' className={'details__info__more__actions__buttons-spend'} onClick={() => updateSporesCount(50, "OCEAN")}>Capture a pound of carbon!</Button>
                    </div>
                </div>
            </div>
            <div className="Token_Spend">
                <p className="User_Subtitle">
                    My Impact
                </p>
                {
                    (JSON.parse(localStorage.getItem("history"))).map(item => <p>{item["details"]}</p>)
                }
            </div>
        </div>
    );
}

export default UserProfile;