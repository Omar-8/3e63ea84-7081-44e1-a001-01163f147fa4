import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../Providers/Cart.Provider";
import { CartActionKind } from "../../store/Cart/Actions/cart.action";
import SearchBar from "./SearchBar";


const NavBar = () => {
  const { cartState, cartDispatch } = useContext(CartContext)

  return (
    <AppBar position="sticky" sx={{ flexGrow: 1, marginBottom: 2 }}>
      <Toolbar>
        <SearchBar />
        <IconButton size="large" edge="start" color="inherit" sx={{ ml: 2 }}>
          <FilterAltOutlinedIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
          onClick={() => {
            cartDispatch({ type: CartActionKind.OPEN });
          }}
        >
          <Badge badgeContent={cartState.events?.length} color="error">
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar
