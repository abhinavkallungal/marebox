import ItemForm from './ItemForm';
import { Dialog } from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import { useState } from 'react';

const EditItem = (props) => {
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);
    const [ item, setItem ] = useState(props.item);

    const editItem = (e) => {
        e.preventDefault();
        setIsDialogOpen(true);
    }
    const onDialogClose = (e) => {
        e.preventDefault();
        setIsDialogOpen(false);
    }

    return(
        <>
            <Edit onClick={editItem} style={{ color: `orange` }}/>
            <Dialog open={isDialogOpen} onClose={onDialogClose}>
                <Close onClick={onDialogClose}/>
                <ItemForm isNewItem={false} item={item}/>
                <br/>
            </Dialog>
        </>
    );
}

export default EditItem;
