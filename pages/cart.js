import EachItem from '../components/EachItem';
import Status from '../components/Status';
import { useAuth } from '../hooks/useAuth';
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
}  from '@material-ui/core';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Row = (props) => {
  const auth = useAuth();
  const router = useRouter();

  const [cartItem, setCartItem] = useState(props.cartItem);
  const [item, setItem] = useState({});
  const cartAttributes = props.cartItem.cartAttributes;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    message: '',
    error: ''
  });

  const handleChange = async(e) => {
    e.preventDefault();
    setLoading(true);
    const { name, value } = e.target;
    const temp = {
      ...cartItem,
      cartAttributes:{...cartAttributes, [name]: value}
    };
    setCartItem({...temp});
    await auth.updateCartItems(temp);
    setLoading(false);
  };

  useEffect(() => {
    auth.userAuthData || router.push('/');
  },[ auth, router ]);

  return (
    <TableRow>
      <TableCell>
        <EachItem
          fullScreen={false}
          item={cartItem}
          key={cartItem.id}
          mediaHt={100}
          smSize={12}
          xsSize={12}
        />
      </TableCell>
      <TableCell>
        {cartItem.varAttributes && Object.keys(cartItem.varAttributes).map(v => (
          <div key={cartItem.id + v}>{v}<br/><Select
            name={v}
            onChange={handleChange}
            style={{ height: `20px` }}
            value={cartItem.cartAttributes[v]}
            variant="outlined"
          >
          {cartItem.varAttributes[v].map(i => (
            <MenuItem key={cartItem.id + i} value={i}>{i}</MenuItem>
          ))}
          </Select><br/></div>
        ))}
        Qty<br/>
        <Select
          name="qty"
          onChange={handleChange}
          style={{ height: `20px` }}
          value={cartItem.cartAttributes.qty}
          variant="outlined"
        >
          {[0, 1, 2, 3, 4, 5].map(i => (
            <MenuItem key={i} value={i}> {i} </MenuItem>
          ))}
      </Select>
      <Status loading={loading} status={status}/>
      </TableCell>
      <TableCell> { cartItem.price } </TableCell>
      <TableCell> { cartItem.cartAttributes.qty * cartItem.price } </TableCell>
    </TableRow>
  );
};

const Cart = () => {
  const auth = useAuth();
  const router = useRouter();
  const [ whatsAppText, setWhatsAppText ] = useState('');

  const handlePay = async(e) => {
    e.preventDefault();
    const res = await axios.post("/api/stripe", auth.cartItems);
    const { status, data } = res;
    if(status === 200){
      const sessionId = data.session.id;
      router.push(`/checkout?sessionId=${sessionId}`);
    }
  }

  const handleCod = () => {
    var orderSummary = `Placing order via ${process.env.NEXT_PUBLIC_MY_DOMAIN}\n%0A\n%0A`;
    orderSummary += 'Order summary as follows:\n%0A';
    orderSummary += '-'.repeat(25) + '\n%0A';
    var totalCost = 0;
    for (var i=0; i<auth.cartItems.length; i++) {
        const item = auth.cartItems[i];
        const name = item.name;
        const qty  = item.cartAttributes.qty;
        const price = item.price;
        orderSummary += `${i+1}. ${name}: ${qty} * ${price} = Rs.${qty * price} \n%0A`;
    }
    orderSummary += `%0ATotal price: ${auth.totalPrice} Indian Rupees`;
    setWhatsAppText(orderSummary);
  }

  useEffect(() => {
    handleCod();
  }, [ auth.cartItems ]);

  return (
    auth.totalPrice > 0 ?(
      <Box pt={3} style={{ backgroundColor: `${auth.themeBgColor}` }}>
        <TableContainer component={ Paper } style={{ padding: `auto`, margin: `auto`, marginTop: `0`, maxWidth: `600px`}}>
          <Typography style={{ padding: `10px` }} variant="h6">
            Please review your order.
            <br/>
            <small>
              Note: The item will be removed from the cart if the quantity is set to 0.
            </small>
          </Typography>
          <Container>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell> Item </TableCell>
                  <TableCell> Choice </TableCell>
                  <TableCell> PPU </TableCell>
                  <TableCell> Price </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { auth.cartItems && auth.cartItems.map(cartItem => (
                  cartItem && Object.keys(cartItem).length > 0 &&
                  <Row cartItem={cartItem} key={cartItem.hash} />
                ))}
              </TableBody>
            </Table>
          </Container>
        </TableContainer>
        <br/>
        <Container style={{ textAlign: `center` }}>
          { auth.totalPrice > 0 && (
          <>
            { process.env.NEXT_PUBLIC_PAYMENT_COD_ONLY !== "true"  ? (
              <Button color="primary" onClick={handlePay} variant="outlined">
              <Typography variant="subtitle1">
                Proceed to pay Rs. { auth.totalPrice }
              </Typography>
              </Button>
            ) : (
              <a href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text=${whatsAppText}`} target="_blank">
                <Button color="primary" variant="outlined">
                  <Typography variant="subtitle1">
                    Whatsapp us your COD order for Rs. { auth.totalPrice }
                  </Typography>
                </Button>
              </a>
            )}
            <br/><br/>
            <small> Note: PPU means Price Per Unit.<br/>All prices are in Indian Rupees. </small>
          </>
          )}
        </Container>
      </Box>
    ): <Typography style={{ backgroundColor: `${auth.themeBgColor}`, color: `${auth.themeColor}`, textAlign: `center`}} variant="h5"><br/>There are no items in your cart.</Typography>
  );
};

export default Cart;
