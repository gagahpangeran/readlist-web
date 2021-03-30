import { useMutation } from "@apollo/client";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import React from "react";
import { useForm } from "react-hook-form";
import { EDIT_READ_LIST } from "../../gql/mutation";
import { GET_ALL_READ_LISTS } from "../../gql/query";
import {
  EditReadList,
  EditReadListVariables,
  ReadList
} from "../../types/generated-types";
import { dateFormatter, getSubmitData, InputData } from "../../utils/helper";

interface Props {
  readList: ReadList;
  onCancelButtonClick: () => void;
  showComment: boolean;
}

export default function EditRow({
  readList,
  onCancelButtonClick,
  showComment
}: Props) {
  const { id, title, link, readAt, comment } = readList;

  const [editReadList] = useMutation<EditReadList, EditReadListVariables>(
    EDIT_READ_LIST,
    {
      refetchQueries: [
        {
          query: GET_ALL_READ_LISTS
        }
      ]
    }
  );

  const { register, handleSubmit } = useForm<InputData>();

  const onSubmit = async (inputData: InputData) => {
    onCancelButtonClick();
    const data = getSubmitData(inputData);
    await editReadList({ variables: { id, data } });
  };

  return (
    <TableRow tabIndex={-1}>
      <TableCell padding="checkbox">
        <Checkbox disabled={true} />
      </TableCell>

      <TableCell component="th" scope="row">
        <TextField
          inputRef={register}
          name="title"
          label="Title"
          autoFocus={true}
          defaultValue={title}
        />

        <TextField
          inputRef={register}
          name="link"
          label="Link"
          defaultValue={link}
        />
      </TableCell>

      <TableCell align="left">
        <FormControlLabel
          control={
            <Checkbox
              inputRef={register}
              name="isRead"
              color="primary"
              defaultChecked={readAt !== null}
            />
          }
          label="Already Read?"
        />
        <TextField
          inputRef={register}
          type="date"
          name="readAt"
          defaultValue={dateFormatter(readAt ?? new Date())}
        />
      </TableCell>

      {showComment && (
        <TableCell align="left">
          <TextField
            inputRef={register}
            name="comment"
            placeholder="Comment"
            multiline
            defaultValue={comment}
          />
        </TableCell>
      )}

      <TableCell>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit(onSubmit)}
        >
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
