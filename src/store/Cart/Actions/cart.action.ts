import { Event } from "../../Events/Types/event.model";

export enum CartActionKind {
  REMOVE = "REMOVE",
  ADD = "ADD",
  OPEN = "OPEN",
  CLOSE = "CLOSE",
}

export type AddCartActionType = {
  type: CartActionKind.ADD;
  payload: Event;
};

export type OpenCartActionType = {
  type: CartActionKind.OPEN;
};

export type CloseCartActionType = {
  type: CartActionKind.CLOSE;
};

export type RemoveCartActionType = {
  type: CartActionKind.REMOVE;
  payload: Event;
};

export type CartActionTypes =
  | AddCartActionType
  | RemoveCartActionType
  | OpenCartActionType
  | CloseCartActionType;
