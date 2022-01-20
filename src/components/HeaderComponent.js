import React from "react";
import {
  AppBar,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Toolbar,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";

function Header(props) {
  return (
    <AppBar position="fixed" sx={{ padding: "10px" }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          align="left"
          sx={{ flexGrow: 1 }}
          component="div"
        >
          Spacetagram
        </Typography>

        <DatePicker
          label="Select Start Date"
          value={props.date}
          onChange={(newValue) => {
            props.setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />

        <FormControl>
          <InputLabel id="demo-simple-select-label">Number of Weeks</InputLabel>
          <Select
            sx={{ minWidth: "200px" }}
            labelId="number of weeks"
            id="demo-simple-select"
            value={props.range}
            label="Number of Weeks"
            onChange={(e) => props.setDateRange(e.target.value)}
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
