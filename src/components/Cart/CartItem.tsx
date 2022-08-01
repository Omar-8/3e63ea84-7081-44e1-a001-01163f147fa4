import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { CartContext } from "../../Providers/Cart.Provider";
import { FC, useContext } from "react";
import { Event } from "../../store/Events/Types/event.model";
import { Card, Box, CardContent, IconButton, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { CartActionKind } from "../../store/Cart/Actions/cart.action";
import { EventsContext } from "../../Providers/Events.Provider";
import { EventActionKind } from "../../store/Events/Actions/get.action";

interface CartProps {
  event: Event;
}

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "20px",
    height: 220,
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  content: {
    flex: "1 0 auto",
  },
  cardMedia: {
    minWidth: 150,
    maxWidth: 150,
  },
}));

const CartItem: FC<CartProps> = ({ event }) => {
  const classes = useStyles();
  const { eventsState, eventsDispatch } = useContext(EventsContext);
  const { cartState, cartDispatch } = useContext(CartContext);

  return (
    <Card className={classes.card}>
      <Box className={classes.box}>
        <CardContent className={classes.content}>
          <Typography component="div" variant="h6">
            {event.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {event.venue.name}
          </Typography>
        </CardContent>
        <IconButton
          onClick={() => {
            eventsDispatch({ type: EventActionKind.ADD, payload: event });
            cartDispatch({ type: CartActionKind.REMOVE, payload: event });
          }}
        >
          <DeleteIcon style={{ height: 30, width: 30 }} />
        </IconButton>
      </Box>
      <CardMedia
        component="img"
        className={classes.cardMedia}
        image={event.flyerFront}
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default CartItem;
