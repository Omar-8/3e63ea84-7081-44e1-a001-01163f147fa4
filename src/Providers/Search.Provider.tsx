import { DateRange } from "@mui/x-date-pickers-pro";
import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useState,
} from "react";
import { Event } from "../store/Events/Types/event.model";
import { EventsContext } from "./Events.Provider";

type ProviderProps = {
  children: React.ReactNode;
};

type SearchContextType = {
  searchTerm?: string;
  searchResults?: Event[];
  dateResults?: Event[];
  dateRange: DateRange<Date>;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setDateRange?: React.Dispatch<React.SetStateAction<DateRange<Date>>>;
  allResults?: Event[];
};

export const SearchContext = createContext<SearchContextType>({
  dateRange: [null, null],
});

export const SearchProvider: FC<ProviderProps> = ({ children }) => {
  const { eventsState, eventsDispatch } = useContext(EventsContext);
  const [searchTerm, setSearchTerm] = useState<string>();
  const [searchResults, setSearchResults] = useState<Event[]>();
  const [dateResults, setDateResults] = useState<Event[]>();
  const [dateRange, setDateRange] = useState<DateRange<Date>>([null, null]);
  const [allResults, setAllResults] = useState<Event[]>();

  // Apply text search
  useEffect(() => {
    setSearchResults!(undefined);
    if (searchTerm) {
      const searchedEvents = eventsState.events?.filter((ev) =>
        ev.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (searchedEvents) setSearchResults!(searchedEvents);
    }
  }, [searchTerm, eventsState]);

  // Apply date search
  useEffect(() => {
    if (dateRange) {
      const dateRangeEvents = eventsState.events?.filter((ev) => {
        const eventDate = new Date(ev.date).getTime();
        const startDate = dateRange[0]?.getTime();
        const endDate = dateRange[1]?.getTime();
        if (eventDate && startDate && endDate) {
          if (eventDate >= startDate && eventDate <= endDate) {
            return eventDate;
          }
        }
      });
      if (dateRangeEvents) setDateResults!(dateRangeEvents);
    }
  }, [dateRange, eventsState]);

  useEffect(() => {
    setAllResults(undefined);
    // Only text search
    if (searchResults?.length && !dateResults?.length) {
      setAllResults(searchResults);
    }
    // Only date search
    else if (dateResults?.length && !searchResults?.length) {
      setAllResults(dateResults);
    }
    // Both text and date search
    else if (searchResults?.length && dateResults?.length) {
      setAllResults(
        searchResults?.filter((result) => dateResults?.includes(result))
      );
    }
  }, [dateResults, searchResults, eventsState]);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        dateRange,
        setDateRange,
        allResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
