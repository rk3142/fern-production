import React from 'react';
import './UserActions.css'
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import PersonIcon from '@mui/icons-material/Person';

function UserActions(props) {
    // TODO
    const handleSaved = () => {
        console.log('favorited items')
    }

    // TODO
    const handleUserProfile = () => {
        console.log('handles user profile')
    }

    return (
        <div className='user_actions'>
            <BookmarksIcon onClick={handleSaved} />
            <PersonIcon onClick={handleUserProfile} />
        </div>
    );
}

export default UserActions;