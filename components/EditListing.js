import ListingForm from './ListingForm';
import { Dialog } from '@material-ui/core';
import { Close, Edit } from '@material-ui/icons';
import { useState } from 'react';

const EditListing = (props) => {
    const [ isDialogOpen, setIsDialogOpen ] = useState(false);
    const [ listing, setListing ] = useState(props.listing);

    const editListing = (e) => {
        e.preventDefault();
        setIsDialogOpen(true);
    }
    const onDialogClose = (e) => {
        e.preventDefault();
        setIsDialogOpen(false);
    }

    return(
        <>
            <Edit onClick={editListing} style={{ color: `orange` }}/>
            <Dialog open={isDialogOpen} onClose={onDialogClose}>
                <Close onClick={onDialogClose}/>
                <ListingForm isNewListing={false} listing={listing}/>
                <br/>
            </Dialog>
        </>
    );
}

export default EditListing;
