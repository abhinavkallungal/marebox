import { useAuth } from '../hooks/useAuth';

import { Grid } from '@material-ui/core';

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputBase,
  Radio,
  RadioGroup
} from '@material-ui/core';
import {
  Business,

  Search,
  ShoppingBasket
} from '@material-ui/icons';

// import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { border, maxWidth } from '@mui/system';


const SearchComponent = () => {
  const router = useRouter();
  const state = useAuth();
  const [s, setS] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [searchCategory, setSearchCategory] = useState('shop');

  const onChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setS(value);
  }

  const handleCheck = e => {
    e.preventDefault();
    setIsChecked(!isChecked);
  }

  const changeSearchCategory = e => {
    e.preventDefault();
    console.log(e.target.value);
    setSearchCategory(e.target.value);
  }

  useEffect(() => {
    if (s.trim() !== '') {
      const path = `/search?l=${isChecked ? 'or' : 'and'}&s=${s.trim()}&sc=${searchCategory}`
      router.push(path);
    } else {
      router.push(router.route);
    }
  }, [isChecked, s, searchCategory])

  return (
    <>
    
      <Grid style={{backgroundColor:"grey",minHeight:'91.2vh'}} >
        <Grid  >
          <Grid style={{ display:'flex',flexDirection: 'column' ,width:"80%",alignItems:"center",}} 
           lg={{ flexDirection: 'row'}}>
            <Grid >
              <div style={{ display:"flex",alignItems:"center"}} >
              <Search  />
                <InputBase
                  autoComplete="s"
                  id="s"
                  label="Search Items / Listings..."
                  name="s"
                  onChange={onChange}
                  autoFocus
                  placeholder="Search Items / Listings..."
                  style={{ padding: `3px 3px`}}
                  value={s || ''}
                  variant="outlined"
                  
                />
              </div>
            </Grid>
            <Grid >
              <div  style={{ display:"flex",alignItems:"center"}}> 
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isChecked}
                    onChange={handleCheck}
                    color="primary"
                  />
                }
                label="OR Search"
              />
              <FormControl component="fieldset" >
                <RadioGroup
                  aria-label="searchCategory"
                  defaultValue="shop"
                  name="radio-buttons-group"
                  onChange={changeSearchCategory}
                  row
                  value={searchCategory}
                >
                  <FormControlLabel value="shop" control={<Radio />} label="Shop" />
                  <FormControlLabel value="directory" control={<Radio />} label="Directory" />
                </RadioGroup>
              </FormControl>
              </div>
            </Grid>

          </Grid>

          <Grid>
            <Business />
            <ShoppingBasket />
            {/* <HomeRepairServiceIcon/> */}
          </Grid>
        </Grid>

        <div className="header-sec-link">
                            <a href="#sec1" className="custom-scroll-link"><i className="fal fa-angle-double-down"></i></a> 
                        </div>

        {/* <img src={process.env.NEXT_PUBLIC_COMPANY_BANNER_URL}  /> */}
      </Grid>
    </>
  )
};

export default SearchComponent;