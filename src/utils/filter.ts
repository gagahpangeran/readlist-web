import { ReadListFilter } from "../types/generated-types";
import { dateFormatter } from "./helper";

type SearchBy = "title" | "link";
type CommentStatus = "all" | "with" | "without";
type ReadStatus = "all" | "read" | "unread";

export interface FilterInputForm {
  searchBy: SearchBy;
  searchKeyword: string;
  commentStatus: CommentStatus;
  readStatus: ReadStatus;
  readFrom: string;
  readTo: string;
}

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

export function getFilterDefaultValues(
  filter: ReadListFilter
): FilterInputForm {
  const searchBy: SearchBy = filter.link?.contains ? "link" : "title";
  const searchKeyword = filter?.[searchBy]?.contains ?? "";
  const commentStatus =
    boolToCommentStatus.get(filter.comment?.isNull ?? null) ?? "all";
  const readStatus =
    boolToReadStatus.get(filter.readAt?.isNull ?? null) ?? "read";
  const readFrom = filter.readAt?.from ? dateFormatter(filter.readAt.from) : "";
  const readTo = filter.readAt?.to ? dateFormatter(filter.readAt.to) : "";

  return {
    searchBy,
    searchKeyword,
    commentStatus,
    readStatus,
    readFrom,
    readTo
  };
}

export function getFilterData({
  searchBy,
  searchKeyword,
  commentStatus,
  readStatus,
  readFrom,
  readTo
}: FilterInputForm): ReadListFilter {
  const filterData: ReadListFilter = {
    comment: {
      isNull: commentStatusToBool.get(commentStatus)
    }
  };

  const readFromDate =
    readFrom.length > 0 && readStatus !== "unread" ? new Date(readFrom) : null;

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

  return filterData;
}
