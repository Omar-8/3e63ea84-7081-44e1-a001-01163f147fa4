import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { CartContext } from "../../Providers/Cart.Provider";
import { useContext } from "react";
import CartItem from "./CartItem";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "500px",
    padding: "20px",
  },
}));

const Cart = () => {
  const classes = useStyles();
  const { cartState, cartDispatch } = useContext(CartContext);

  return (
    <div className={classes.container}>
      <Typography
        variant="h5"
        style={{
          fontWeight: "bold",
        }}
        gutterBottom
        component="div"
      >
        Your Cart
      </Typography>
      {cartState.events.length === 0 ? (
        <Typography
          variant="body1"
          style={{
            fontWeight: "bold",
          }}
          gutterBottom
          component="div"
        >
          Your cart is empty
        </Typography>
      ) : null}
      {cartState.events.map((ev) => <CartItem event={ev} />)}
    </div>
  );
};

export default Cart;
