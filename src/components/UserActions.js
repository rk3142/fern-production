import React from 'react';
import './UserActions.css'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonIcon from '@mui/icons-material/Person';
import {authenticateAccess} from "../common/utils";
import {useHistory} from "react-router-dom";

function UserActions() {
    let history = useHistory()

    const onClickSaved = () => authenticateAccess(history, '/saved')
    const onClickProfile = () => authenticateAccess(history, '/profile')

    return (
        <div className='user_actions'>
            <BookmarksIcon onClick={onClickSaved} />
            <PersonIcon onClick={onClickProfile} />
        </div>
    );
}

export default UserActions;