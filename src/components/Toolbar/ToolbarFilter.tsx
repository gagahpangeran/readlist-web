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
import { ReadListFilter } from "../../types/generated-types";
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
  const { variables, changeVariables } = useReadListVariable();
  const { filter } = variables;

  const { register, control, handleSubmit, reset } = useForm<InputForm>();

  const searchByFields: SearchBy = filter.link?.contains ? "link" : "title";

  const boolToCommentStatus = new Map<boolean | null, CommentStatus>([
    [true, "without"],
    [false, "with"],
    [null, "all"]
  ]);

  const commentStatusToBool = new Map<CommentStatus, boolean | null>(
    Array.from(boolToCommentStatus.entries()).map(([k, v]) => [v, k])
  );

  const boolToReadStatus = new Map<boolean | null, ReadStatus>([
    [true, "unread"],
    [false, "read"],
    [null, "all"]
  ]);

  const readStatusToBool = new Map<ReadStatus, boolean | null>(
    Array.from(boolToReadStatus.entries()).map(([k, v]) => [v, k])
  );

  const defaultValues: InputForm = {
    searchBy: searchByFields,
    searchKeyword: filter?.[searchByFields]?.contains ?? "",
    commentStatus:
      boolToCommentStatus.get(filter.comment?.isNull ?? null) ?? "all",
    readStatus: boolToReadStatus.get(filter.readAt?.isNull ?? null) ?? "read",
    readFrom: filter.readAt?.from ? dateFormatter(filter.readAt.from) : "",
    readTo: filter.readAt?.to ? dateFormatter(filter.readAt.to) : ""
  };

  const onSubmit = ({
    searchBy,
    searchKeyword,
    commentStatus,
    readStatus,
    readFrom,
    readTo
  }: InputForm) => {
    const filterData: ReadListFilter = {
      comment: {
        isNull: commentStatusToBool.get(commentStatus)
      }
    };

    const readFromDate =
      readFrom.length > 0 && readStatus !== "unread"
        ? new Date(readFrom)
        : null;

    const readToDate =
      readTo.length > 0 && readStatus !== "unread" ? new Date(readTo) : null;

    filterData.readAt = {
      isNull: readStatusToBool.get(readStatus),
      from: readFromDate?.toISOString(),
      to: readToDate?.toISOString()
    };

    const keyword = searchKeyword.trim();
    if (keyword.length > 0) {
      filterData[searchBy] = {
        contains: keyword
      };
    }
  };

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
