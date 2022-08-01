import { Event } from "./event.model";

export interface SortedEvents {
  [date: string]: Event[];
}

export interface GetEventsState {
  loading: boolean;
  error?: unknown;
  events: Event[];
}
