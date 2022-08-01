import { EventActionKind, EventsActionTypes } from "../Actions/get.action";
import { GetEventsState } from "../Types/get.type";

export const GetEventsInitialState: GetEventsState = {
  loading: false,
  events: []
};

export const getEventsReducer = (
  state: GetEventsState,
  action: EventsActionTypes
) => {
  switch (action.type) {
    case EventActionKind.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EventActionKind.SUCCESS:
      return {
        ...state,
        loading: false,
        events: action.payload,
      };
    case EventActionKind.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case EventActionKind.ADD:
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    case EventActionKind.REMOVE:
      const index = state.events?.indexOf(action.payload);
      if (index && index > -1) {
        state.events?.splice(index, 1);
      }
      return {
        ...state,
      };
    default:
      return state;
  }
};
