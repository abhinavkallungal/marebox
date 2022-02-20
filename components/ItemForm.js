import ItemAttributes from '../components/ItemAttributes';
import ItemVarAttributes from '../components/ItemVarAttributes';
import Status from '../components/Status';
import { useAuth } from '../hooks/useAuth';

import {
    Button,
    Container,
    FormControl,
    InputLabel,
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
import Markdown from 'markdown-to-jsx';

const ItemForm = (props) => {
    const inputEl = useRef(null);
    const router = useRouter();
    const state = useAuth();

    const [item, setItem] = useState(props.item);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
      message: '',
      error: ''
    })
    const [categories, setCategories] = useState([])

    const onChange = e => {
      const {name, value} = e.target;
      setItem({...item, [name]: value });
      setLoading(false);
      setStatus({
        message: '',
        error: ''
      });
    }

    const onChangeAttributes = attributes => {
        setItem({...item, attributes});
        setLoading(false);
        setStatus({
            message: '',
            error: ''
        });
    }

    const onChangeVarAttributes = varAttributes => {
        setItem({...item, varAttributes});
        setLoading(false);
        setStatus({
            message: '',
            error: ''
        });
    }

    const onChgImg = (e) => {
        e.preventDefault();
        setItem({...item, imgFile: e.target.files[0]});
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        // clear status and show waiting
        setStatus({});
        setLoading(true);

        // upload image to storage
        const storageRef = firebase.storage().ref();
        var imgURL;
        if(item.imgFile){
            const fileRef = storageRef.child(`${item.category}/${item.name}/${item.imgFile.name}`);
            imgURL = await fileRef.put(item.imgFile).then(async()=>(await fileRef.getDownloadURL()))
        }
        addItemToDB(imgURL);
    }

    const addItemToDB = async(imgURL) => {
        if (imgURL){
            var operation;
            var record = {...item, imgURL};

            if(props.isNewItem) {
                operation = 'insert';
            } else{
                operation = 'update';
            }

            await axios.post("/api/db", { operation, record, table: 'items' })
                .then(res => {
                    if(res.data.error){
                        setStatus({ ...status, ['error']: res.data.error });
                    } else{
                        setStatus({ ...status, ['message']: res.data.message });
                        if(operation === 'insert'){
                            record = { ...record, id: res.data.id };
                            state.insertItem(record);
                            setItem({});
                        } else if(operation === 'update'){
                            state.updateItem(record);
                        }
                    }
                });
        }
        setLoading(false);
    }
    
    const clearTransactionLogs = async() => {
      const timestamp = new Date().getTime();
      console.log(timestamp);
      await axios.post("/api/db", { operation: 'delete_transaction_logs_before', table: 'items', timestamp });
      await axios.post("/api/db", { operation: 'delete_transaction_logs_before', table: 'listings', timestamp });
    }

    useEffect(() => {
      if(!state.userAuthData){
        router.push('/signin');
      } else{
          var temp = [];
          state.categories.forEach(i => {
              temp.push(i);
          });
          setCategories([...temp]);
      }
    },[state, router]);

    return (
        <Container
          maxWidth="xs"
        >
          <br/>
          <Link href="/add">
            <a>
              <Button color="primary" variant="outlined">
                Add Item
              </Button>
            </a>
          </Link>
          {' '}
          <Link href="/addcategory">
            <a>
              <Button color="secondary" variant="outlined">
                Add Category
              </Button>
            </a>
          </Link>
          {' '}
          <Link href="/addlisting">
            <a>
              <Button color="secondary" variant="outlined">
                Add Listing
              </Button>
            </a>
          </Link>
          {/*
            {' '}
            <Button color="secondary" onClick={clearTransactionLogs} variant="outlined">
              Clear Transaction Log
            </Button>
          */}
      
          <form onSubmit={onSubmit}>
            <TextField
              autoComplete="name"
              id="name"
              InputLabelProps={{
                shrink: true,
              }}
              label="Name of the Item"
              margin="normal"
              name="name"
              onChange={onChange}
              placeholder="Name of the Item"  
              required
              value={item.name || ''}
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
              label="Description of the Item"                  
              margin="normal"
              multiline
              name="description"
              onChange={onChange}
              placeholder="Description of the Item, Markdown supported"            
              value={item.description || ''}
              variant="outlined"
            />
            
            { item.description && (
              <div>
                Preview:
                <Markdown>
                  { item.description }
                </Markdown>
              </div>
            )}
            
            <TextField
              autoComplete="size"
              fullWidth
              helperText=""
              id="size"
              InputLabelProps={{
                shrink: true,
              }}
              label="Size or Dimensions of the Item"
              margin="normal"
              multiline
              name="size"
              onChange={onChange}
              placeholder="Size or Dimensions of the Item, include units also"
              value={item.size || ''}
              variant="outlined"
            />
            <TextField
              autoComplete="weight"
              fullWidth
              helperText=""
              id="weight"
              InputLabelProps={{
                shrink: true,
              }}
              label="Weight of the Item"
              margin="normal"
              multiline
              name="weight"
              onChange={onChange}
              placeholder="Weight of the Item, include units also"
              value={item.weight || ''}
              variant="outlined"
            />
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="categoryLabel">Category</InputLabel>
              <Select
                id="categorySelect"
                labelId="categoryLabel"
                name="category"
                onChange={onChange}
                required
                value={item.category || ''}
              >
                {categories.map (category => (
                    <MenuItem
                        key={category.id}
                        value={category.name}
                    >
                        { category.name.split('/').join(' > ') }
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            {item.category && <ItemAttributes item={item} onChangeAttributes={onChangeAttributes}/>}
            {item.category && <ItemVarAttributes item={item} onChangeVarAttributes={onChangeVarAttributes}/>}
            <TextField
              autoComplete="price"
              fullWidth
              helperText=""
              id="price"
              InputLabelProps={{
                shrink: true,
              }}
              label="Selling price in Rupee"
              margin="normal"
              name="price"
              onChange={onChange}
              placeholder="Selling price in Rupee"            
              required
              type="number"
              value={item.price || ''}
              variant="outlined"
            />
            <TextField
              autoComplete="mrp"
              fullWidth
              helperText="Leave it empty if it same as selling price"
              id="mrp"
              InputLabelProps={{
                shrink: true,
              }}
              label="MRP in Rupee"
              margin="normal"
              name="mrp"
              onChange={onChange}
              placeholder="MRP in Rupee"
              type="number"
              value={item.mrp || ''}
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

export default ItemForm;
