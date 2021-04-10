import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonWrapper: {
      "& > *": {
        margin: theme.spacing(1)
      },
      textAlign: "center"
    }
  })
);

export default function ToolbarFilter() {
  const classes = useStyles();

  return (
    <Toolbar>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Search by</InputLabel>
            <Select fullWidth>
              <MenuItem>Title</MenuItem>
              <MenuItem>Link</MenuItem>
              <MenuItem>Comment</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField name="keyword" label="Search Keyword" fullWidth />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Comment Status</InputLabel>
            <Select fullWidth>
              <MenuItem>All Posts</MenuItem>
              <MenuItem>Only With Comment</MenuItem>
              <MenuItem>Only Without Comment</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <FormControl fullWidth>
            <InputLabel>Read Status</InputLabel>
            <Select fullWidth>
              <MenuItem>All</MenuItem>
              <MenuItem>Read</MenuItem>
              <MenuItem>Unread</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="From"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={5}>
          <TextField
            label="To"
            type="date"
            InputLabelProps={{
              shrink: true
            }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} className={classes.buttonWrapper}>
          <Button>Cancel</Button>
          <Button variant="outlined" color="secondary">
            Reset
          </Button>
          <Button variant="contained" color="primary">
            Apply
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
