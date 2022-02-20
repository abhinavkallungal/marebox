import Status from '../components/Status';
import { useAuth } from '../hooks/useAuth';
import { db } from '../utils/firebase';
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
import axios from 'axios';
import firebase from 'firebase';
import 'firebase/storage';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Add = () => {
    const router = useRouter();
    const state = useAuth();

    const [attributes, setAttributes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({
      message: '',
      error: ''
    })
    const [varAttributes, setVarAttributes] = useState([]);

    const onChange = e => {
      const {name, value} = e.target;
      setItem({...item, [name]: value });
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
        var imgPath = `${item.category}/${item.imgFile.name}`;
        if(item.parentCategory){
            imgPath = item.parentCategory + '/' + imgPath;
        }
        const fileRef = storageRef.child(imgPath);
        const imgURL = await fileRef.put(item.imgFile).then(async()=>(await fileRef.getDownloadURL()))
        console.log(imgURL);
        addCategoryToDB(imgURL);
    }

    const addCategoryToDB = async(imgURL) => {
        if (imgURL){
            var record = {...item, imgURL};
            if ( record.parentCategory ) {
                record.name = record.parentCategory + '/' + record.name;
            }

            await axios.post("/api/db", { operation: 'insert', record, table: 'categories' })
                .then(result => {
                    if(result.data.error){
                        setStatus({ ...status, ['error']: result.data.error });
                    } else{
                        setStatus({ ...status, ['message']: result.data.message });
                        state.addCategory(record);
                    }
                });
        }
        setLoading(false);
        setItem({});
    }

    useEffect(() => {
      if(!state.userAuthData || !state.userAuthData.uid){
        router.push('/');
      } else{
          setAttributes(state.attributes);
          setCategories(state.categories);
          console.log(state.varAttributes);
          //setVarAttributes(state.varAttributes);
      }
    },[state, router]);

    return (
        <Container maxWidth="xs">
          <br/>
          <>
           <Link href="/add">
                <a>
                  <Button color="secondary" variant="outlined">
                    Add Item
                  </Button>
                </a>
              </Link>
              {' '}
              <Link href="/addcategory">
                <a>
                  <Button color="primary" variant="outlined">
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
            </>
          <form onSubmit={onSubmit}>
            <TextField
              autoComplete="name"
              id="name"
              InputLabelProps={{
                shrink: true,
              }}
              label="Name of the Category"
              margin="normal"
              name="name"
              onChange={onChange}
              placeholder="Name of the Category"
              required
              value={item.name || ''}
              variant="outlined"
              fullWidth
            />
            <FormControl fullWidth margin="normal">
              <InputLabel id="categoryLabel">Parent category</InputLabel>
              <Select
                id="categorySelect"
                labelId="categoryLabel"
                name="parentCategory"
                onChange={onChange}
                value={item.parentCategory || ''}
              >
                {categories.map (category => (
                    <MenuItem key={category.id} value={category.name}>
                        {category.name.split('/').join(' > ')}
                    </MenuItem>
                ))}
              </Select>
            </FormControl>
            {(varAttributes.length > 0) && <FormControl fullWidth margin="normal">
                <InputLabel id="varAttributesLabel">Variable Attributes</InputLabel>
                <Select
                    id="varAttributesSelect"
                    labelId="varAttributesLabel"
                    multiple
                    name="varAttributes"
                    onChange={onChange}
                    renderValue={selected => (
                        <div>
                            {selected.map(value => (
                                <Chip key={value} label={value}/>
                            ))}
                        </div>
                    )}
                    size={varAttributes.length}
                    value={item.varAttributes || []}
                >
                    {varAttributes.length > 0 && varAttributes.map(attribute => (
                        <MenuItem key={attribute.id} value={attribute.name}>
                            <ListItemText primary={attribute.name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>}

            {attributes && <FormControl fullWidth margin="normal">
                <InputLabel id="attributesLabel">Fixed Attributes</InputLabel>
                <Select
                    id="attributesSelect"
                    labelId="attributesLabel"
                    multiple
                    name="attributes"
                    onChange={onChange}
                    renderValue={selected => (
                        <div>
                            {selected.map(value => (
                                <Chip key={value} label={value}/>
                            ))}
                        </div>
                    )}
                    size={attributes.length}
                    value={item.attributes || []}
                >
                    {attributes.map(attribute => (
                        <MenuItem key={attribute.id} value={attribute.name}>
                            <ListItemText primary={attribute.name}/>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>}

            <small>
              Upload Image <br/>
            </small>
            <input
              accept="image/png, image/jpeg"
              label="Upload Image"
              onChange={onChgImg}
              placeholder="Upload Image"
              required
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

export default Add
