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
    const item =  props.item;
    const [availableAttributes, setAvailableAttributes] = useState([]);
    const [selectedAttributes, setSelectedAttributes] = useState(item.varAttributes || []);

    const onChange = e => {
        const {name, value} = e.target;
        const temp = {...selectedAttributes, [name]: value };
        setSelectedAttributes(temp);
        props.onChangeVarAttributes(temp);
    }

    useEffect(() => {
        for(var i=0; i<auth.categories.length; i++){
            if(auth.categories[i].name === item.category){
                const attrs = auth.categories[i].varAttributes;
                var temp = [];

                for(var i=0; i<auth.varAttributes.length; i++){
                    if(attrs && attrs.includes(auth.varAttributes[i].name)){
                        temp.push(auth.varAttributes[i]);
                    }
                }

                setAvailableAttributes(temp);
                break;
            }
        }
    }, [auth, item.category]);

    return(
        availableAttributes.map (availableAttribute => (
            <FormControl
              fullWidth
              key={availableAttribute.id}
              margin="normal"
              required
              style={{ color: `${auth.themeColor}` }}
            >
                <InputLabel id={`${availableAttribute.name}Label`}>{availableAttribute.name}(choice)</InputLabel>
                <Select
                    id={`${availableAttribute.name}Select`}
                    labelId={`${availableAttribute.name}Label`}
                    multiple
                    name={availableAttribute.name}
                    onChange={onChange}
                    renderValue={selected => (
                        <div>
                            {selected.map(value => (
                                <Chip key={value} label={value}/>
                            ))}
                        </div>
                    )}
                    size={availableAttribute.values.length}
                    value={selectedAttributes[availableAttribute.name] || []}
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
