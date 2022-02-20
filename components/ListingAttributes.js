import { useAuth } from '../hooks/useAuth';
import {
    Chip,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select
} from '@material-ui/core';
import { useEffect, useState } from 'react';

const availableAttributes = (props) => {
    const auth = useAuth();
    const listing =  props.listing;
    const [availableAttributes, setAvailableAttributes] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState(listing.attributes || []);

    const onChange = e => {
        const {name, value} = e.target;
        const temp = {...selectedAttributes, [name]: value };
        setSelectedAttributes(temp);
        props.onChangeAttributes(temp);
    }

    useEffect(() => {
        for(var i=0; i<auth.categories.length; i++){
            if(listing.categories.includes(auth.categories[i])){
                const attrs = auth.categories[i].attributes;
                var temp = [];

                for(var i=0; i<auth.attributes.length; i++){
                    if(attrs && attrs.includes(auth.attributes[i].name)){
                        temp.push(auth.attributes[i]);
                    }
                }

                setAvailableAttributes(temp);
                break;
            }
        }
    }, [auth, listing.categories]);

    return(
        availableAttributes.map (availableAttribute => (
            <FormControl fullWidth key={availableAttribute.id}  margin="normal" required>
                <InputLabel id={`${availableAttribute.name}Label`}>{availableAttribute.name}</InputLabel>
                <Select
                    id={`${availableAttribute.name}Select`}
                    labelId={`${availableAttribute.name}Label`}
                    name={availableAttribute.name}
                    onChange={onChange}
                    size={availableAttribute.values.length}
                    value={selectedAttributes[availableAttribute.name] || ''}
                >
                    {availableAttribute.values.map(v => (
                    <MenuItem key={v} value={v}>
                        <ListItemText primary={v}/>
                    </MenuItem>
                    ))}
                </Select>
            </FormControl>
        ))
    )
}

export default availableAttributes;
