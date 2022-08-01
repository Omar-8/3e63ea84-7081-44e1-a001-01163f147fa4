import { Box, Button, Stack, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDateFns } from "@mui/x-date-pickers-pro/AdapterDateFns";
import { useContext } from "react";
import ReactCountryFlag from "react-country-flag";
import { SearchContext } from "../../Providers/Search.Provider";

const useStyles = makeStyles((theme) => ({
  stack: {
    border: "1px solid #0288d1",
    borderRadius: 15,
    width: "75%",
  },
}));

const Filters = () => {
  const classes = useStyles();
  const { dateRange, setDateRange } = useContext(SearchContext);

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Button
        variant="outlined"
        style={{
          borderRadius: 20,
          border: "1px solid #0288d1",
        }}
        startIcon={
          <ReactCountryFlag
            countryCode="GB"
            svg
            style={{
              width: "1.2em",
              height: "1.2em",
              borderRadius: 30,
            }}
          />
        }
      >
        LONDON
      </Button>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          value={dateRange}
          onChange={(newValue) => {
            setDateRange!(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <Stack
              direction="row"
              spacing={0}
              alignItems="center"
              className={classes.stack}
            >
              <TextField
                {...startProps}
                label=""
                variant="standard"
                inputProps={{
                  ...startProps.inputProps,
                  style: { textAlign: "center" },
                }}
                InputProps={{ disableUnderline: true }}
              />
              <Box> - </Box>
              <TextField
                {...endProps}
                label=""
                variant="standard"
                inputProps={{
                  ...endProps.inputProps,
                  style: { textAlign: "center" },
                }}
                InputProps={{ disableUnderline: true }}
              />
            </Stack>
          )}
        />
      </LocalizationProvider>
    </Stack>
  );
};

export default Filters;
