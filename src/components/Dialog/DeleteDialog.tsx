import { LinearProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import { useSelectData } from "../../hooks/data";
import { useDialog } from "../../hooks/dialog";
import { useDeleteReadList } from "../../hooks/readlist";

export default function DeleteDialog() {
  const { openedDialog, closeDialog } = useDialog();
  const { selected, setSelected } = useSelectData();

  const { deleteReadLists, loading } = useDeleteReadList();

  const handleSubmit = async () => {
    const result = await deleteReadLists({ variables: { ids: selected } });

    if (result !== undefined) {
      setSelected([]);
      closeDialog();
    }
  };

  return (
    <Dialog open={openedDialog === "delete"} onClose={closeDialog}>
      <DialogTitle>Delete List</DialogTitle>
      <DialogContent>
        {`Are you sure you want to delete ${selected.length} list(s)`}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button
          variant="contained"
          type="submit"
          color="secondary"
          onClick={handleSubmit}
        >
          Delete
        </Button>
      </DialogActions>
      {loading && <LinearProgress />}
    </Dialog>
  );
}
