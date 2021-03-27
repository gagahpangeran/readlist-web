import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { ReadList } from "../../types/generated-types";
import { dateFormatter } from "../../utils/helper";

interface Props {
  readList: ReadList;
  onCancelButtonClick: () => void;
}

export default function EditRow({ readList, onCancelButtonClick }: Props) {
  const { title, link, readAt, comment } = readList;

  return (
    <TableRow tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox disabled={true} />
      </TableCell>

      <TableCell component="th" scope="row">
        <TextField
          name="title"
          label="Title"
          autoFocus={true}
          defaultValue={title}
        />

        <TextField name="link" label="Link" defaultValue={link} />
      </TableCell>

      <TableCell align="left">
        <FormControlLabel
          control={
            <Checkbox name="isRead" color="primary" checked={readAt !== null} />
          }
          label="Already Read?"
        />
        <TextField
          type="date"
          name="readAt"
          defaultValue={dateFormatter(readAt)}
        />
      </TableCell>

      <TableCell align="left">
        <TextField
          name="comment"
          placeholder="Comment"
          multiline
          defaultValue={comment}
        />
      </TableCell>
      <TableCell>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onCancelButtonClick}
        >
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
}
