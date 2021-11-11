import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function SideBarCard({title, filter}) {
    return (
        <Card variant='outlined' style={{marginBottom: '1.2rem'}}>
            <CardContent>
                <FormGroup>
                    {title}
                    {Object.keys(filter).map(f => <FormControlLabel key={f} control={<Checkbox/>} label={f}/>)}
                </FormGroup>
            </CardContent>
        </Card>
    );
}

export default SideBarCard;