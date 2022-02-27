import { useAuth } from '../hooks/useAuth';

import { Grid } from '@material-ui/core';

import styles from "../styles/Home.module.css"

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputBase,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';
import {
  Business,
  HomeWorkRounded,  
  Search,
  ShoppingBasket,
  ArrowDropDown
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
      <Grid style={{ background:`url(https://media.istockphoto.com/photos/artificial-intelligence-and-communication-network-concept-picture-id1297832728?b=1&k=20&m=1297832728&s=170667a&w=0&h=6kLz5QqY7DihAzzznA_hcMy8MxhtdNPkgeVu-gLETog=)`, height: '91.2vh',objectFit:'cover', width:"100%", 
      backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center center" }} >
        <Grid  style={{ display: 'flex', flexDirection: 'column',height:"100%", width: "80%", justifyContent: "space-evenly",
         alignItems:"center",margin:" 0 auto" }}   lg={{ flexDirection: 'row' }}>

          <div>
            <Typography variant='h3' style={{color:"#ffffff",fontWeight:'bold',textShadow:" 2px 2px 4px #000000",textAlign:"center"}}>
              All Construction Services In One Touch
            </Typography>
            <Typography variant='subtitle1' style={{color:"#ffffff",fontWeight:'bold',textShadow:" 2px 2px 4px #000000",textAlign:"center"}}>
             Business To Business ,Business To Customer
            </Typography>
          </div>
          <Grid  container style={{maxWidth:"900px",backgroundColor:"#ffffff",borderRadius:"8px",border:"5px solid #00000010"}}>
            <Grid item xs={12} sm={12}    md={12} lg={4} style={{padding:"20px"}} className="serchItemInput" >
              <div style={{ display: "flex", alignItems: "center" }} >
                <Search />
           
                <InputBase
                  autoComplete="s"
                  id="s"
                  label="Search Items / Listings..."
                  name="s"
                  onChange={onChange}
                  autoFocus
                  placeholder="Search Items / Listings..."
                  style={{ padding: `3px 3px` }}
                  value={s || ''}
                  variant="outlined"

                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}    md={6} lg={4}  style={{padding:"20px"}} className="serchItem">

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

              
            </Grid>

            <Grid item xs={12} sm={6}    md={6} lg={4} style={{padding:"20px 10px"}} >
              <div style={{display:"flex"}}>

              
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

          <Grid className={styles.iconWrapper}>
            <Business className={styles.bannerIcon}  />
            <ShoppingBasket className={styles.bannerIcon}   />
            <HomeWorkRounded className={styles.bannerIcon}  /> 
          </Grid>
        </Grid>

        <div className="header-sec-link">
          <a href="#sec1" className="custom-scroll-link"><ArrowDropDown style={{transform: "scale(1.3)"}} /></a>
        </div>

        {/* <img src={process.env.NEXT_PUBLIC_COMPANY_BANNER_URL}  /> */}
      </Grid>
    </>
  )
};

export default SearchComponent;