import React, {useEffect, useState} from 'react';
import InfoIcon from '@mui/icons-material/Info';
import Popover from '@mui/material/Popover';

import  './GreenScoreLabel.css'

function GreenScoreLabel({greenScore, isDetail}) {
    const [color, setColor] = useState('')
    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        if (greenScore < 1) setColor('score-1')
        else if (greenScore < 1.5) setColor('score-1_5')
        else if (greenScore < 2) setColor('score-2')
        else if (greenScore < 2.5) setColor('score-2_5')
        else if (greenScore < 3) setColor('score-3')
        else setColor('score-4')
    }, [greenScore])

    return (
        <div className={'green_score'}>
            <div className={`green_score__label ${color}`}></div>
            { isDetail && (
                <div className={'green_score__label__detail'}>
                    <div className={'green_score__label__detail__score'}>Greenness Score: {greenScore}</div>

                    <InfoIcon fontSize={'small'}
                              sx={{ color: '#7D7D7D' }}
                              onMouseEnter={handlePopoverOpen}
                              onMouseLeave={handlePopoverClose} />
                    <Popover id="mouse-over-popover"
                             sx={{pointerEvents: 'none',}}
                             open={open}
                             anchorEl={anchorEl}
                             anchorOrigin={{
                                vertical: 'center',
                                horizontal: 'center',
                             }}
                             transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                             }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                    >
                        <div className={'green_score__label__detail__popover'}>
                            We calculate the greenness of products by considering carbon emission, water consumption, and
                            energy cost. The lower the score is, the greener the product is!
                        </div>
                    </Popover>
                </div>
            )}
        </div>
    );
}

export default GreenScoreLabel;