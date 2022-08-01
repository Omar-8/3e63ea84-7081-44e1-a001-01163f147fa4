import { AxiosResponse } from "axios";
import groupBy from "lodash/groupBy";
import { Event } from "./Events/Types/event.model";
import { SortedEvents } from "./Events/Types/get.type";

export const filterEventsData = ({ data }: AxiosResponse<any, any>) => {
  return data.map((ev: any) => {
    return {
      title: ev.title,
      _id: ev._id,
      flyerFront: ev.flyerFront,
      startTime: ev.startTime,
      endTime: ev.endTime,
      date: ev.date,
      venue: ev.venue,
    };
  });
};

export const groupByCommonDate = (events: Event[]): SortedEvents => {
  const groupedEvents = groupBy(events, (ev) => ev.date);
  const orderedEvents: any = {};

  Object.keys(groupedEvents)
    .sort(
      (date1, date2) => new Date(date1).getTime() - new Date(date2).getTime()
    )
    .map((date) => {
      orderedEvents[date] = groupedEvents[date];
    });
  return orderedEvents;
};

export const formatTimes = (event: Event) => {
  let startDate = new Date(event.startTime)
    .toLocaleDateString("en-uk")
    .replaceAll("/", ".");
  let startTime = new Date(event.startTime).toLocaleTimeString("en-uk", {
    hour12: false,
  });
  let endDate = new Date(event.endTime)
    .toLocaleDateString("en-uk")
    .replaceAll("/", ".");
  let endTime = new Date(event.endTime).toLocaleTimeString("en-uk", {
    hour12: false,
  });

  return {
    startTime: `| Starts: ${startDate}, ${startTime}`,
    endTime: `| Ends: ${endDate}, ${endTime}`,
  };
};

export const CustomDateOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  month: "short",
  day: "2-digit",
  year: "numeric",
};
