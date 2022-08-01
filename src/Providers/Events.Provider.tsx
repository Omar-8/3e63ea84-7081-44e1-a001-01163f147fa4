import React, { createContext, FC, useReducer } from "react";
import {
  GetEventsInitialState,
  getEventsReducer
} from "../store/Events/Reducers/get.reducer";
import { GetEventsState } from "../store/Events/Types/get.type";

type ProviderProps = {
  children: React.ReactNode
};


type EventsContextType = {
  eventsState: GetEventsState;
  eventsDispatch?: any;
}

export const EventsContext = createContext<EventsContextType>({
  eventsState: GetEventsInitialState,
  eventsDispatch: () => null,
});


export const EventsProvider : FC<ProviderProps> = ({ children }) => {
  const [eventsState, eventsDispatch] = useReducer(
    getEventsReducer,
    GetEventsInitialState
  );

  return (
    <EventsContext.Provider
      value={{eventsState, eventsDispatch}}
    >
      {children}
    </EventsContext.Provider>
  );
};
