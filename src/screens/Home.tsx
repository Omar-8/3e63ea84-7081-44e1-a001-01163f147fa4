import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Drawer, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useCallback, useContext, useEffect } from "react";
import Cart from "../components/Cart/Cart";
import DateHeader from "../components/Headers/DateHeader";
import EventsGrid from "../components/EventsGrid";
import Filters from "../components/Headers/Filters";
import Header from "../components/Headers/Header";
import NavBar from "../components/NavBar/NavBar";
import { CartContext } from "../Providers/Cart.Provider";
import { EventsContext } from "../Providers/Events.Provider";
import { SearchContext } from "../Providers/Search.Provider";
import { CartActionKind } from "../store/Cart/Actions/cart.action";
import { EVENTS_API_ENDPOINT } from "../store/Endpoints";
import { EventActionKind } from "../store/Events/Actions/get.action";
import { Event } from "../store/Events/Types/event.model";
import { filterEventsData, groupByCommonDate } from "../store/utils";

const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: "flex",
    justifyContent: "center",
  },
  stack: {
    display: "flex",
    width: "55%",
  },
}));

const Home = () => {
  const classes = useStyles();
  const { eventsState, eventsDispatch } = useContext(EventsContext);
  const { allResults } = useContext(SearchContext);
  const { cartState, cartDispatch } = useContext(CartContext);

  // Fetch events
  const fetchEvents = useCallback(async () => {
    eventsDispatch({ type: EventActionKind.REQUEST });
    try {
      const response = await axios.get(EVENTS_API_ENDPOINT);
      const filteredEvents: Event[] = filterEventsData(response);

      eventsDispatch({
        type: EventActionKind.SUCCESS,
        payload: filteredEvents,
      });
    } catch (error) {
      eventsDispatch({ type: EventActionKind.ERROR, payload: error });
    }
  }, []);

  const renderEvents = useCallback(() => {
    // Display search results if exist
    let dataSet = allResults || eventsState.events;
    // Order and group by date
    let sortedDataSet = dataSet && groupByCommonDate(dataSet);
    return (
      sortedDataSet &&
      Object.entries(sortedDataSet).map(([key, value]) => (
        <>
          <DateHeader date={key} />
          <EventsGrid events={value} />
        </>
      ))
    );
  }, [allResults, eventsState.events]);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="home">
      <NavBar />
      <Drawer
        anchor="right"
        open={cartState.cartOpen}
        onClose={() => cartDispatch({ type: CartActionKind.CLOSE })}
      >
        <Cart />
      </Drawer>
      <div className={classes.headerContainer}>
        <Stack
          direction="column"
          spacing={3}
          alignItems="flex-start"
          className={classes.stack}
        >
          <Filters />
          <Header />

          {renderEvents()}
        </Stack>
      </div>
    </div>
  );
};

export default Home;
