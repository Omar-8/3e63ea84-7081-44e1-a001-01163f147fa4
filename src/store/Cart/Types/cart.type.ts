import { Event } from "../../Events/Types/event.model";


export interface CartState {
  cartOpen: boolean
  events: Event[];
}
