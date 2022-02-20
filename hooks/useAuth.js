import axios from 'axios';
import {
    useEffect,
    useState,
    useContext,
    createContext,
    React
} from 'react';
import dbDelete from '../utils/dbDelete';
import dbFetch from '../utils/dbFetch';
import { auth, storage } from '../utils/firebase';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';

const hdbCredential = {
    password: process.env.NEXT_PUBLIC_HDB_PASSWORD,
    schema: process.env.NEXT_PUBLIC_HDB_SCHEMA,
    url: process.env.NEXT_PUBLIC_HDB_URL,
    username: process.env.NEXT_PUBLIC_HDB_USERNAME
}

const { password, schema, url, username } = hdbCredential;

const authContext = createContext({ userAuthData: {} });
const { Provider } = authContext;
export const AuthProvider = ({children}) => {
    const auth = useAuthProvider();
    return <Provider value={auth}>{children}</Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

const useAuthProvider = () => {

    const [ userAuthData, setUserAuthData] = useState({})
    const [ attributes, setAttributes ] = useState([])
    const [ categories, setCategories ] = useState([])
    const [ items, setItems ] = useState([])
    const [ listings, setListings ] = useState([])
    const [ services, setServices ] = useState([])
    const [ articles, setArticles ] = useState([])
    const [ varAttributes, setVarAttributes ] = useState([])
    const [ cartItems, setCartItems ] = useState([])
    const [ totalPrice, setTotalPrice ] = useState(0)
    const [ favs, setFavs ] = useState([]);
    const [ isThemeLight, setIsThemeLight ] = useState(true);
    const [ themeColor, setThemeColor ] = useState(process.env.NEXT_PUBLIC_THEME_LIGHT_COLOR);
    const [ themeBgColor, setThemeBgColor ] = useState(process.env.NEXT_PUBLIC_THEME_LIGHT_BG_COLOR);

    const updateCartItems = async(record) => {
         if(cartItems.some(i => i.hash === record.hash)){
             var temp = [...cartItems];
             for(var j=0; j<temp.length; j++) {
                 if(temp[j].hash === record.hash) {
                     if(record.cartAttributes.qty === 0) {
                         temp.splice(j, 1);
                         const dataObject = {
                           operation: 'delete',
                           hash_values: [ record.hash ],
                           table: 'cart_items'
                         };
                         await axios.post('/api/cart', dataObject);

                     } else{
                         temp[j] = record;
                         const dataObject = {
                           operation: 'update',
                           records: [ record ],
                           table: 'cart_items'
                         };
                         await axios.post('/api/cart', dataObject);

                     }
                     setCartItems([...temp]);
                     break;
                 }
             }
         } else if(record.cartAttributes.qty !== 0) {
             const dataObject = { operation: 'insert', records: [ record ], table: 'cart_items' };
             await axios.post('/api/cart', dataObject);
             setCartItems([...cartItems, record]);
         }
    };

    const updateFavs = async(id, fav) => {
        if(id && fav) {
            // add item id to favorites
            if(!favs.includes(id)) {
                const temp = [...favs, id];
                setFavs(temp);
                const record = { id: userAuthData.uid, favorites: temp };
                await axios.post('/api/db', { operation: 'upsert', record, table: 'favorites' });
            };
          // remove item id from favorites
        } else if(id && !fav) {
          if(favs.includes(id)) {
              var temp = [...favs];
              const idx = temp.indexOf(id);
              if(idx !== -1) {
                  temp.splice(idx, 1);
                  setFavs(temp);
                  const record = { id: userAuthData.uid, favorites: temp };
                  await axios.post('/api/db', {
                      operation: 'upsert',
                      record,
                      table: 'favorites'
                  });
              }
          }
        }
    }

    const toggleTheme = () => {
        if(isThemeLight){
          setThemeBgColor(process.env.NEXT_PUBLIC_THEME_DARK_BG_COLOR);
          setThemeColor(process.env.NEXT_PUBLIC_THEME_LIGHT_BG_COLOR);
        } else {
          setThemeBgColor(process.env.NEXT_PUBLIC_THEME_LIGHT_BG_COLOR);
          setThemeColor(process.env.NEXT_PUBLIC_THEME_DARK_BG_COLOR);
        }
        setIsThemeLight(!isThemeLight);
    }

    useEffect(() => {

        var temp = 0;
        cartItems.map(item => {
            const qty = item.cartAttributes.qty;
            const price = item.price;
            if(qty && price) {
                temp += qty * item.price
            }
        });
        setTotalPrice(temp);

    },[ cartItems ]);
    
    const sendPasswordResetEmail = async(email) => {
        return await auth.sendPasswordResetEmail(email)
            .then((response) => {
                return 'Password reset link sent to email'
            })
            .catch((error) => {
                return { error };
            });
    };
    
    const sendEmailVerification = async() => {
        return await auth.currentUser.sendEmailVerification()
            .then((response) => {
                return 'Email verification link sent';
            })
            .catch((error) => {
                return { error };
            });
    };
    
    const signUp = async(email, password) => {
        return await auth
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                auth.currentUser.sendEmailVerification();
                const error = { 'message': 'Signup initiated, please check your email and login after getting verified' };
                return { error };
            })
            .catch((error) => {
                return { error };
            });
    };

    const signIn = async({ email, password }) => {
        return await auth
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response.user);
                if(response.user.emailVerified){
                  setUserAuthData({...userAuthData, ...response.user});
                  return response.user;
                } else {
                  const error = { 'message': 'Signin not successful, please check your email and login after getting verified' };
                  return { error };
                }
            })
            .catch((error) => {
                return { error };
            });
    };

    const signOut = async() => {
        return auth.signOut().then(() => setUserAuthData({}));
    };

    const insertItem = async(record) => {
        setItems([...items, record]);
    };

    const insertListing = async(record) => {
        setListings([...listings, record]);
    };

    const updateItem = async(record) => {
        var temp = [...items];
        temp.forEach((i, idx) => {
            if(i.id === record.id) {
                temp[idx] = record;
            }
        });
        setItems([...temp]);
    };

    const updateListing = async(record) => {
        var temp = [...listings];
        temp.forEach((i, idx) => {
            if(i.id === record.id) {
                temp[idx] = record;
            }
        });
        setListings([...temp]);
    };

    const addCategory = async(record) => {
        setCategories([...categories, record]);
    };

    const deleteCategory = async(id) => {
        var temp = [];
        categories.forEach(i => {
            if(i.id !== id) {
                temp.push(i);
            }
        });
        setCategories(temp);
    }

    const deleteItem = async(id) => {
        var temp = [];
        items.forEach(i => {
            if(i.id !== id) {
                temp.push(i);
            }
        });
        setItems(temp);
    }

    const deleteListing = async(id) => {
        var temp = [];
        listings.forEach(i => {
            if(i.id !== id) {
                temp.push(i);
            }
        });
        setListings(temp);
    }

    const handleAuthStateChanged = (user) => {
        setUserAuthData(user);
    };

    const fetchAttributes = async() => {
        await dbFetch('attributes')
            .then(result => {
                if(!result.error) {
                    setAttributes(result);
                }
            }).catch( error => console.log(error) );
    }

    const fetchCartItems = async() => {
        const dataObject = {
          get_attributes: [ '*' ],
          operation: 'search_by_value',
          search_attribute: 'email',
          search_value: userAuthData.email,
          table: 'cart_items'
        }

        await axios.post('/api/cart', dataObject).then(result => {
            if(!result.error) {
                setCartItems(result.data.cartItems);
            }
        }).catch( error => console.log('error', error) );
    }

    const fetchFavorites = async() => {
        await axios.post('/api/favorites', {
            get_attributes: [ 'favorites' ],
            operation: 'search_by_hash',
            record: { id: userAuthData.uid },
            table: 'favorites'
        }).then(result => {
            if(!result.error) {
                setFavs(result.data.favorites);
            }
        }).catch( error => console.log('error', error) );
    }

    const fetchVarAttributes = async() => {
        await dbFetch('variable_attributes')
            .then(result => {
                if(!result.error) {
                    setVarAttributes(result);
                }
            })
            .catch( error => console.log(error) );
    }

    const fetchCategories = async() => {
        return await dbFetch('categories')
            .then(result => {
                if(!result.error) {
                    setCategories(result);
                }
            })
            .catch( error => console.log(error) );
    }

    const fetchItems = async() => {
        return await dbFetch('items')
            .then(result => {
                if(!result.error) {
                    setItems(result);
                }
            })
            .catch( error => console.log(error) );
    }

    const fetchListings = async() => {
        return await dbFetch('listings')
            .then(result => {
                if(!result.error) {
                    var temp = [];
                    result.forEach(i => {
                      if(i.verifiedByAdmin || (userAuthData && (userAuthData.email === process.env.NEXT_PUBLIC_ADMIN) )){
                          temp.push(i)
                      }
                    })
                    setListings(temp);
                }
            })
            .catch( error => console.log('error', error) );
    }

    const fetchServices = async() => {
        return await dbFetch('services')
            .then(result => {
                if(!result.error) {
                    setServices(result);
                }
            })
            .catch( error => console.log('error', error) );
    }

    const fetchArticles = async() => {
        return await dbFetch('articles')
            .then(result => {
                console.log(result);
                if(!result.error) {
                    setArticles(result);
                }
            })
            .catch( error => console.log('error', error) );
    }

    const useStyles = makeStyles(theme => ({
      body: {
        color: `${themeColor}`,
      },
      card: {
        backgroundColor: `transparent`,
        color: `${themeColor}`,
        border: `0.1px solid ${themeColor}`,
        borderRadius: `5px`,
        boxShadow: `0.5px 0.5px`,
      },
      heading: {
        color: process.env.NEXT_PUBLIC_THEME_COLOR,
      },
      input: {
        color: process.env.NEXT_PUBLIC_THEME_COLOR
      },
      label: {
        color: process.env.NEXT_PUBLIC_THEME_COLOR
      },
      paper: {
        background: themeBgColor,
        color: themeColor
      }
    }));

    // global data fetched by read_only_user via client
    useEffect(() => {
        
        fetchAttributes();
        fetchCategories();
        fetchItems();
        fetchVarAttributes();
        
        if(process.env.NEXT_PUBLIC_NEED_DIR=='true'){
          fetchListings();
          fetchServices();
          fetchArticles();
        }
    },[]);
    
    // private data fetched by super_user via server
    useEffect(() => {
        if(userAuthData && userAuthData.uid) {
            fetchCartItems();
            fetchFavorites();
        }
    }, [ userAuthData ]);

    useEffect(() => {
        const unsub = auth.onAuthStateChanged(handleAuthStateChanged);
        return () => unsub();
    }, []);

    return {
        addCategory,
        articles,
        attributes,
        cartItems,
        categories,
        deleteCategory,
        deleteItem,
        deleteListing,
        favs,
        isThemeLight,
        insertItem,
        insertListing,
        items,
        listings,
        sendEmailVerification,
        sendPasswordResetEmail,
        services,
        signIn,
        signOut,
        signUp,
        themeBgColor,
        themeColor,
        toggleTheme,
        totalPrice,
        updateCartItems,
        updateFavs,
        updateItem,
        updateListing,
        userAuthData,
        useStyles,
        varAttributes
    };
};
