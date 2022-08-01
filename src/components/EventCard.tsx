import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@mui/styles";
import CardHeader from "@mui/material/CardHeader";
import AddIcon from "@mui/icons-material/AddCircle";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Event } from "../store/Events/Types/event.model";
import { FC, useContext } from "react";
import { formatTimes } from "../store/utils";
import { CartContext } from "../Providers/Cart.Provider";
import { CartActionKind } from "../store/Cart/Actions/cart.action";
import { EventsContext } from "../Providers/Events.Provider";
import { EventActionKind } from "../store/Events/Actions/get.action";

interface EventProps {
  event: Event;
}

const useStyles = makeStyles((theme) => ({
  cardContent: {
    alignItems: "flex-start",
    display: "flex",
    flexDirection: "column",
  },
  locationContent: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  },
  cardActions: {
    justifyContent: "flex-end",
    display: "flex",
    flexDirection: "row",
  },
}));

const EventCard: FC<EventProps> = ({ event }) => {
  const classes = useStyles();
  const { eventsState, eventsDispatch } = useContext(EventsContext);
  const { cartState, cartDispatch } = useContext(CartContext);

  const visitLocationGoogle = () => {
    window.open(event.venue.direction, "_blank", "noopener noreferrer");
  };

  return (
    <Card sx={{ maxWidth: 350, boxShadow: 1 }}>
      <CardHeader
        avatar={
          <Avatar src="https://images.pexels.com/photos/4016173/pexels-photo-4016173.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
        }
        titleTypographyProps={{
          align: "left",
          fontWeight: "bold",
          height: 50,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
        title={event.title}
      />
      <CardMedia
        component="img"
        height={450}
        image={event.flyerFront}
        alt={event.title}
      />
      <CardContent className={classes.cardContent}>
        <div className={classes.locationContent}>
          <IconButton size="small" onClick={visitLocationGoogle}>
            <LocationOnIcon fontSize="small" color="primary" />
          </IconButton>
          <Typography
            style={{
              fontWeight: "bold",
            }}
            variant="subtitle1"
            component="div"
          >
            {event.venue.name}
          </Typography>
        </div>
        <Typography variant="caption" component="div">
          {formatTimes(event).startTime}
        </Typography>
        <Typography variant="caption" component="div">
          {formatTimes(event).endTime}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          onClick={() => {
            eventsDispatch({ type: EventActionKind.REMOVE, payload: event });
            cartDispatch({ type: CartActionKind.ADD, payload: event });
          }}
        >
          <AddIcon fontSize="large" color="primary" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default EventCard;
