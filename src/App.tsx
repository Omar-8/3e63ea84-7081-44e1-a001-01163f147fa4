import React from "react";
import { CartProvider } from "./Providers/Cart.Provider";
import { EventsProvider } from "./Providers/Events.Provider";
import { SearchProvider } from "./Providers/Search.Provider";
import Home from "./screens/Home";

function App() {
  return (
    <div>
      <EventsProvider>
        <SearchProvider>
          <CartProvider>
            <Home />
          </CartProvider>
        </SearchProvider>
      </EventsProvider>
    </div>
  );
}

export default App;
