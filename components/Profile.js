import Status from '../components/Status';
import { useAuth } from '../hooks/useAuth';

import {
    Button,
    Chip,
    Container,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import firebase from 'firebase';
import 'firebase/storage';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

const ListingForm = (props) => {
    console.log(props);
    const inputEl = useRef(null);
    const router = useRouter();
    const state = useAuth();

    const [listing, setListing] = useState(props.listing);
    const [listingCategories, setListingCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
      message: '',
      error: ''
    })
    const [categories, setCategories] = useState([])

    const onChange = e => {
      const {name, value} = e.target;
      setListing({...listing, [name]: value });
      setLoading(false);
      setStatus({
        message: '',
        error: ''
      });
    }

    const onChangeListingCategories = e => {
      const {name, value} = e.target;
      setListingCategories(value);
      const temp = value.join(',');
      setListing({...listing, categories: temp });
      setLoading(false);
      setStatus({
        message: '',
        error: ''
      });
    }

    const onChangeAttributes = attributes => {
        setListing({...listing, attributes});
        setLoading(false);
        setStatus({
            message: '',
            error: ''
        });
    }

    const onChangeVarAttributes = varAttributes => {
        setListing({...listing, varAttributes});
        setLoading(false);
        setStatus({
            message: '',
            error: ''
        });
    }

    const onChgImg = (e) => {
        e.preventDefault();
        setListing({...listing, imgFile: e.target.files[0]});
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        // clear status and show waiting
        setStatus({});
        setLoading(true);

        // upload image to storage
        const storageRef = firebase.storage().ref();
        var imgURL;
        if(listing.imgFile){
            const fileRef = storageRef.child(`${listing.category}/${listing.name}/${listing.imgFile.name}`);
            imgURL = await fileRef.put(listing.imgFile).then(async()=>(await fileRef.getDownloadURL()))
        }
        addListingToDB(imgURL || `https://source.unsplash.com/featured/?${process.env.NEXT_PUBLIC_UNSPLASH_BANNER_TAG}`);
    }

    const addListingToDB = async(imgURL) => {
        if (imgURL){
            const temp = listing.categories;
            var operation;
            var record = {...listing, imgURL, categories: temp};

            if(props.isNewListing || !listing.id) {
                operation = 'insert';
            } else{
                operation = 'update';
            }

            await axios.post("/api/db", { operation, record, table: 'listings' })
                .then(res => {
                    if(res.data.error){
                        setStatus({ ...status, ['error']: res.data.error });
                    } else{
                        setStatus({ ...status, ['message']: res.data.message });
                        if(operation === 'insert'){
                            record = { ...record, id: res.data.id };
                            state.insertListing(record);
                            setListing({});
                            setListingCategories([]);
                        } else if(operation === 'update'){
                            state.updateListing(record);
                        }
                    }
                });
        }
        setLoading(false);
    }

    useEffect(() => {
      if(!state.userAuthData){
        router.push('/signin');
      } else{
          setCategories([...state.categories]);
          var temp = [];
          listing.categories && listing.categories.split(',').forEach(l => {
            if(l.trim()){
              temp.push(l.trim());
            }
          })
          setListingCategories(temp);
      }
    },[state, router]);

    return (
        <Container
          maxWidth="xs"
        >
          <br/>
          { (state.userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) && (
            <>
              <Link href="/add">
                <a>
                  <Button color="disabled" variant="outlined">
                    Add Listing
                  </Button>
                </a>
              </Link>
              {' '}
              <Link href="/addcategory">
                <a>
                  <Button color="disabled" variant="outlined">
                    Add Category
                  </Button>
                </a>
              </Link>
              {' '}
              <Link href="/addlisting">
                <a>
                  <Button color="primary" variant="outlined">
                    Add Listing
                  </Button>
                </a>
              </Link>
            </>
          )}<br/><br/><br/>
          <form onSubmit={onSubmit}>
            <TextField
              autoComplete="name"
              id="name"
              InputLabelProps={{
                shrink: true,
              }}
              label="Contact Person"
              margin="normal"
              name="name"
              onChange={onChange}
              placeholder="Name of the Contact Person"
              required
              value={listing.name || ''}
              variant="outlined"
              fullWidth
            />
            <TextField
              autoComplete="description"
              fullWidth
              helperText=""
              id="description"
              InputLabelProps={{
                shrink: true,
              }}
              label="Description of the Listing"
              margin="normal"
              multiline
              name="description"
              onChange={onChange}
              placeholder="Description of the Listing"
              value={listing.description || ''}
              variant="outlined"
            />

            <TextField
              autoComplete="companyName"
              fullWidth
              helperText=""
              id="companyName"
              InputLabelProps={{
                shrink: true,
              }}
              label="Company Name"
              margin="normal"
              name="companyName"
              onChange={onChange}
              placeholder="Name of the Company"
              value={listing.companyName || ''}
              variant="outlined"
            />

            <TextField
              autoComplete="mobileNumber1"
              fullWidth
              helperText="Mobile Ph. No."
              id="mobileNumber1"
              InputLabelProps={{
                shrink: true,
              }}
              label="Mobile Ph. No."
              margin="normal"
              name="mobileNumber1"
              onChange={onChange}
              placeholder="Mobile Ph. No."
              type="number"
              value={listing.mobileNumber1 || ''}
              variant="outlined"
            />
            
            <TextField
              autoComplete="mobileNumber2"
              fullWidth
              helperText="Alternate Mobile Ph. No."
              id="mobileNumber2"
              InputLabelProps={{
                shrink: true,
              }}
              label="Alternate Mobile Ph. No."
              margin="normal"
              name="mobileNumber2"
              onChange={onChange}
              placeholder="Alternate Mobile Ph. No."
              type="number"
              value={listing.mobileNumber2 || ''}
              variant="outlined"
            />

            <TextField
              autoComplete="productsOffered"
              fullWidth
              helperText="Products offered"
              id="productsOffered"
              InputLabelProps={{
                shrink: true,
              }}
              label="Products offered"
              margin="normal"
              multiline
              name="productsOffered"
              onChange={onChange}
              placeholder="Products offered"
              value={listing.productsOffered || ''}
              variant="outlined"
            />

          <FormControl fullWidth margin="normal" required>
            <InputLabel id="categoriesLabel">Categories</InputLabel>
            <Select
              id="categoriesSelect"
              labelId="categoriesLabel"
              multiple
              name="categories"
              onChange={onChangeListingCategories}
              renderValue={selected => (
                <div>
                  {selected.map(value => (
                    <Chip key={value} label={value}/>
                  ))}
                </div>
              )}
              size = {categories.length}
              value={listingCategories || []}
            >
              {categories && categories.map( (category, idx) => (
                <MenuItem key={category.id} value={category.name}>
                  <ListItemText primary={category.name.split('/').join(' > ')}/>
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal" required>
              <InputLabel id="businessTypeLabel">Business Type</InputLabel>
              <Select
                id="businessTypeSelect"
                labelId="businessTypeLabel"
                name="businessType"
                onChange={onChange}
                required
                value={listing.businessType || ''}
              >
                {['Contactor', 'Manufacturer', 'Supplier'].map (businessType => (
                    <MenuItem
                        key={businessType}
                        value={businessType}
                    >
                        { businessType }
                    </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              autoComplete="address"
              fullWidth
              helperText="Address"
              id="address"
              InputLabelProps={{
                shrink: true,
              }}
              label="Address"
              margin="normal"
              multiline
              name="address"
              onChange={onChange}
              placeholder="Address"
              value={listing.address || ''}
              variant="outlined"
            />

            <TextField
              autoComplete="pinCode"
              fullWidth
              helperText="PIN code"
              id="pinCode"
              InputLabelProps={{
                shrink: true,
              }}
              label="PIN code"
              margin="normal"
              name="pinCode"
              onChange={onChange}
              placeholder="PIN code"
              type="number"
              value={listing.pinCode || ''}
              variant="outlined"
            />

            <small>
              Upload Image <br/>
            </small>
            <input
              accept="image/png, image/jpeg"
              label="Upload Image"
              onChange={onChgImg}
              placeholder="Upload Image"
              type="file"
            />
            <br/>
            <Status loading={loading} status={status}/>
            <br/>
            <Button
                color="primary"
                fullWidth
                margin="normal"
                type="submit"
                variant="contained"
            >
              Save
            </Button>
          </form>
        </Container>
      )
}

export default ListingForm;
