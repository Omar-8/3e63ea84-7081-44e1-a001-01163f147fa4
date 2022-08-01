import Grid from "@mui/material/Grid";
import { FC } from "react";
import { Event } from "../store/Events/Types/event.model";
import EventCard from "./EventCard";

interface EventsProps {
  events: Event[];
}

const EventsGrid: FC<EventsProps> = ({ events }) => {
  return (
    <Grid container direction="row" spacing={2}>
      {events && events.length > 0 && events.map((event) => (
        <Grid item xs={5} md={4}>
          <EventCard event={event} />
        </Grid>
      ))}
    </Grid>
  );
};

export default EventsGrid;
