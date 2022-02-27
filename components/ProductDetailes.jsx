import { Grid, Button, Typography } from "@mui/material";
import styles from "../styles/productDetailes.module.css";
import { WhatsApp } from "@material-ui/icons";

function ProductDetailes({ item }) {
  return (
    <div className={styles.ProductDetailes}>
      <Grid container className={styles.container}>
        <Grid item sx={12} sm={12} md={6}  className={styles.imgwrapper}>
       
            <img className={styles.img} src={item.imgURL} alt="" />
         
        </Grid>

        <Grid item sm={12} md={6}>
          <div className={styles.productName}>{item.name}</div>
          <div style={{ display: "inline-block" }}>
            {item?.mrp ? (
              <Typography
                variant="caption text"
                style={{ display: "block", textDecoration: "line-through" }}
              >
                {" "}
                MRP:{item.mrp}/-{" "}
              </Typography>
            ) : null}

            {item?.price ? (
              <Typography variant="span" style={{ fontWeight: "bold",fontSize:"22px" }}>
                RS:{item.price}
              </Typography>
            ) : null}
          </div>
          <div>

          <Button
            variant="contained"
            style={{
              backgroundColor: " #42D955",
              color: "#fff",
              zIndex: "15",
              padding: "5px 15px",
              margin: "10px 0px",
            }}
            onClick={(e) => {
              e.stopPropagation();
              window.open(
                `https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}&text='please send quote for ${item.name} at https://marebox.co.in/item/${item.id}'`,
                "_blank"
                );
              }}
              endIcon={<WhatsApp />}
              >
            Get a Quote
          </Button>
            </div>
          <div className={styles.productDiscription}>{item.description}</div>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductDetailes;
