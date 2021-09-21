import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useReadListVariable } from "../../hooks/readlist";
import {
  FilterInputForm,
  getFilterData,
  getFilterDefaultValues
} from "../../utils/filter";

const PREFIX = "ToolbarFilter";

const classes = {
  buttonWrapper: `${PREFIX}-button-wrapper`
};

const StyledGrid = styled(Grid)(({ theme }) => ({
  [`& .${classes.buttonWrapper}`]: {
    "& > *": {
      margin: theme.spacing(1)
    },
    textAlign: "center"
  }
}));

interface Props {
  close: () => void;
}

export default function ToolbarFilter({ close }: Props) {
  const { variables, changeVariables } = useReadListVariable();

  const { register, control, handleSubmit, reset } = useForm<FilterInputForm>();

  const defaultValues = getFilterDefaultValues(variables.filter);

  const onSubmit = (inputData: FilterInputForm) => {
    const filterData = getFilterData(inputData);
    changeVariables({
      ...variables,
      filter: filterData
    });
  };

  return (
    <Toolbar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Search By</InputLabel>
              <Controller
                control={control}
                name="searchBy"
                defaultValue={defaultValues.searchBy}
                as={
                  <Select required fullWidth label="Search By">
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="link">Link</MenuItem>
                  </Select>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="searchKeyword"
              inputRef={register}
              label="Search Keyword"
              defaultValue={defaultValues.searchKeyword}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Comment Status</InputLabel>
              <Controller
                control={control}
                name="commentStatus"
                defaultValue={defaultValues.commentStatus}
                as={
                  <Select required fullWidth label="Comment Status">
                    <MenuItem value="all">All Posts</MenuItem>
                    <MenuItem value="with">Only With Comment</MenuItem>
                    <MenuItem value="without">Only Without Comment</MenuItem>
                  </Select>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Read Status</InputLabel>
              <Controller
                control={control}
                name="readStatus"
                defaultValue={defaultValues.readStatus}
                as={
                  <Select required fullWidth label="Read Status">
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="read">Read</MenuItem>
                    <MenuItem value="unread">Unread</MenuItem>
                  </Select>
                }
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              name="readFrom"
              inputRef={register}
              label="From"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              defaultValue={defaultValues.readFrom}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <TextField
              name="readTo"
              inputRef={register}
              label="To"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              defaultValue={defaultValues.readTo}
              fullWidth
            />
          </Grid>

          <StyledGrid item xs={12} className={classes.buttonWrapper}>
            <Button onClick={close} color="inherit">
              Close
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => reset()}
            >
              Reset
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Apply
            </Button>
          </StyledGrid>
        </Grid>
      </form>
    </Toolbar>
  );
}
