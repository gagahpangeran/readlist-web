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

function createTernaryMap<T>(
  trueVal: T,
  falseVal: T,
  nullVal: T
): [Map<boolean | null, T>, Map<T, boolean | null>] {
  const boolToTernary = new Map<boolean | null, T>([
    [true, trueVal],
    [false, falseVal],
    [null, nullVal]
  ]);

  const ternaryToBool = new Map<T, boolean | null>(
    Array.from(boolToTernary.entries()).map(([k, v]) => [v, k])
  );

  return [boolToTernary, ternaryToBool];
}

const [
  boolToCommentStatus,
  commentStatusToBool
] = createTernaryMap<CommentStatus>("without", "with", "all");

const [boolToReadStatus, readStatusToBool] = createTernaryMap<ReadStatus>(
  "unread",
  "read",
  "all"
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
