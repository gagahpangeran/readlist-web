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
import { Controller, useForm } from "react-hook-form";
import { useReadListVariable } from "../../hooks/readlist";
import { dateFormatter } from "../../utils/helper";

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

type SearchBy = "title" | "link";
type CommentStatus = "all" | "with" | "without";
type ReadStatus = "all" | "read" | "unread";
interface InputForm {
  searchBy: SearchBy;
  searchKeyword: string;
  commentStatus: CommentStatus;
  readStatus: ReadStatus;
  readFrom: string;
  readTo: string;
}

export default function ToolbarFilter() {
  const classes = useStyles();
  const { variables } = useReadListVariable();
  const { filter } = variables;

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset
  } = useForm<InputForm>();

  const searchByFields: SearchBy = filter.link?.contains ? "link" : "title";
  const mapCommentStatus = new Map<boolean | null, CommentStatus>([
    [true, "without"],
    [false, "with"],
    [null, "all"]
  ]);
  const mapReadStatus = new Map<boolean | null, ReadStatus>([
    [true, "unread"],
    [false, "read"],
    [null, "all"]
  ]);

  const defaultValues: InputForm = {
    searchBy: searchByFields,
    searchKeyword: filter?.[searchByFields]?.contains ?? "",
    commentStatus:
      mapCommentStatus.get(filter.comment?.isNull ?? null) ?? "all",
    readStatus: mapReadStatus.get(filter.readAt?.isNull ?? null) ?? "read",
    readFrom: filter.readAt?.from ? dateFormatter(filter.readAt.from) : "",
    readTo: filter.readAt?.to ? dateFormatter(filter.readAt.to) : ""
  };

  const onSubmit = (inputData: InputForm) => {
    console.log(inputData);
  };

  const disableDate =
    (watch("readStatus") ?? defaultValues.readStatus) === "unread";

  return (
    <Toolbar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={3}>
            <FormControl fullWidth>
              <InputLabel>Search by</InputLabel>
              <Controller
                control={control}
                name="searchBy"
                defaultValue={defaultValues.searchBy}
                as={
                  <Select required fullWidth>
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
                  <Select required fullWidth>
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
                  <Select required fullWidth>
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
              disabled={disableDate}
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
              disabled={disableDate}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} className={classes.buttonWrapper}>
            <Button>Cancel</Button>
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
          </Grid>
        </Grid>
      </form>
    </Toolbar>
  );
}
