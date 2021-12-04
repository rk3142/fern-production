import React, {useEffect, useState} from 'react';

import  './GreenScoreLabel.css'

function GreenScoreLabel({greenScore}) {
    const [color, setColor] = useState('')

    useEffect(() => {
        if (greenScore < 1) setColor('score-1')
        else if (greenScore < 1.5) setColor('score-1_5')
        else if (greenScore < 2) setColor('score-2')
        else if (greenScore < 2.5) setColor('score-2_5')
        else if (greenScore < 3) setColor('score-3')
        else setColor('score-4')
    }, [greenScore])

    return (
        <div className={`green_score_label ${color}`}></div>
    );
}

export default GreenScoreLabel;