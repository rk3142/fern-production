import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch} from "react-redux";
import {addFilter, filterProducts, removeFilter} from "../reducers/catalogSlice";

function SideBarCard({title, filter}) {
    const dispatch = useDispatch();

    const onFilterChange = (event, title, label) => {
        if (event.target.checked) {
            dispatch(addFilter({title, label}))
            dispatch(filterProducts())
        }
        else {
            dispatch(removeFilter({title, label}))
            dispatch(filterProducts())
        }
    }

    return (
        <Card variant='outlined' style={{marginBottom: '1.2rem'}}>
            <CardContent>
                <FormGroup>
                    {title}
                    {Object.keys(filter).map(f =>
                        <FormControlLabel
                            key={f}
                            control={<Checkbox/>}
                            label={f}
                            onChange={(e) => onFilterChange(e, title, f)}
                        />
                    )}
                </FormGroup>
            </CardContent>
        </Card>
    );
}

export default SideBarCard;