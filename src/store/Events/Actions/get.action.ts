import { Event } from "../Types/event.model";

export enum EventActionKind {
  REQUEST = "REQUEST",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  ADD = "ADD",
  REMOVE = "REMOVE",
}

export type GetEventsRequestActionType = {
  type: EventActionKind.REQUEST;
};

export type GetEventsSuccessActionType = {
  type: EventActionKind.SUCCESS;
  payload: Event[];
};

export type RemoveEventActionType = {
  type: EventActionKind.REMOVE;
  payload: Event;
};

export type AddEventActionType = {
  type: EventActionKind.ADD;
  payload: Event;
};

export type GetEventsErrorActionType = {
  type: EventActionKind.ERROR;
  payload?: unknown;
};

export type EventsActionTypes =
  | AddEventActionType
  | RemoveEventActionType
  | GetEventsRequestActionType
  | GetEventsSuccessActionType
  | GetEventsErrorActionType;
