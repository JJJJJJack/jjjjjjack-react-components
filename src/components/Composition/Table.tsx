import { mdiChevronDown, mdiChevronUp, mdiClose } from "@mdi/js";
import { isValidElement, useCallback, useEffect, useMemo, useState } from "react";
import { uniqueKey } from "../../utils/utils";
import { Card } from "./Card";
import { Flex } from "./Flex";
import { Icon } from "./Icon";
import { Paginator } from "./Paginator";
import { Shimmer } from "./Shimmer";

interface BaseTableProps {
  data: any[];
  defaultFilterText?: string;
  perPageCustom?: number;
  wMin?: true;
  maxWidthColumns?: Record<string, string>;
  loading?: boolean;
}

interface WithoutBackendSearchProps {
  backendCurrentPage?: undefined;
  backendTotalPages?: undefined;
  backendTotalRows?: undefined;
  backendSearch?: undefined;
  onBackendSearch?: undefined;
  onBackendChangePage?: undefined;
  onBackendChangePerPage?: undefined;
}

interface WithBackendSearchProps {
  backendCurrentPage: number;
  backendTotalPages: number;
  backendTotalRows: number;
  backendSearch: string;
  onBackendChangePage: (page: number) => void;
  onBackendChangePerPage: (perPage: number) => void;
  onBackendSearch: (query: string) => void;
}

type TableProps = (BaseTableProps & WithoutBackendSearchProps) | (BaseTableProps & WithBackendSearchProps);

type KeySort = { header: string; order: 1 | 2 };

const PAGE_FLOOR = 1;
const BUTTONS_KEY = "buttons";

export function Table({
  data,
  perPageCustom = 5,
  wMin,
  maxWidthColumns = {},
  loading,
  backendCurrentPage,
  backendTotalPages,
  backendTotalRows,
  backendSearch,
  onBackendSearch,
  onBackendChangePage,
  onBackendChangePerPage,
}: TableProps) {
  const [perPage, setPerPage] = useState(perPageCustom);
  const [currentPage, setCurrentPage] = useState(1);
  const [keySort, setKeySort] = useState<KeySort>();
  const [filterText, setFilterText] = useState("");
  const [filteredData, setFilteredData] = useState(data ?? []);

  const getTableElementKey = useCallback((element: string) => `table-${element}-${uniqueKey()}`, []);

  useEffect(() => {
    setFilteredData(
      (data ?? []).filter(obj => {
        return Object.entries(obj)
          .filter(([key]) => key !== BUTTONS_KEY)
          .some(([_, value]) => {
            if (isValidElement(value)) {
              value = (value as any).props.children;
            }
            return value?.toString().toLowerCase().includes(filterText.toLowerCase());
          });
      })
    );
  }, [filterText, data]);

  const sortAscend = (a: any, b: any) => {
    a = a[(keySort as KeySort).header];
    b = b[(keySort as KeySort).header];
    /** in case the array contains jsx */
    if (isValidElement(a)) {
      a = (a as any).props.children; // TODO: need to get to htmlText recursively
      b = (b as any).props.children;
    }
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  };
  const sortDescend = (a: any, b: any) => {
    a = a[(keySort as KeySort).header];
    b = b[(keySort as KeySort).header];
    if (isValidElement(a)) {
      a = (a as any).props.children;
      b = (b as any).props.children;
    }
    if (a < b) return 1;
    if (a > b) return -1;
    return 0;
  };

  const itemPaginated = (arr: any[]) => {
    // if (backendTotalPages) {
    // // this would disable table sort clientside
    // // for when backend implements sorting
    //   return arr;
    // }

    let result = [...arr]; // always copy

    switch (keySort?.order) {
      case 1:
        result.sort(sortAscend);
        break;
      case 2:
        result.sort(sortDescend);
        break;
    }

    if (backendTotalPages) {
      return result;
    }
    return result.slice(perPage * (currentPage - PAGE_FLOOR), perPage * currentPage);
  };

  const numPages = useMemo(() => {
    if (backendTotalPages) {
      return backendTotalPages;
    }

    let num = Math.ceil(filteredData.length / perPage);
    if (isNaN(num)) {
      return 0;
    }
    return num;
  }, [filteredData.length, perPage, backendTotalRows, backendTotalPages]);

  const pagesList = [];
  for (let i = PAGE_FLOOR; i <= numPages; i++) {
    pagesList.push(i);
  }

  const onHeaderClick = (header: any) => () => {
    setKeySort(prev => {
      if (prev === undefined || prev.header !== header) {
        return { header, order: 1 };
      }
      if (prev.header === header && prev.order === 1) {
        return { header, order: 2 };
      }
      return undefined;
    });
  };

  return (
    <Card className={`jrc-Table__Card ${wMin ? "jrc-Table__Card--w-min" : ""}`}>
      <Flex className="jrc-Table__Flex" items="center">
        <input
          className="jrc-Table__Flex__search-bar"
          placeholder="Search"
          id={getTableElementKey("search")}
          type="text"
          value={backendSearch ?? filterText}
          onChange={e => {
            setCurrentPage(PAGE_FLOOR);
            onBackendChangePage?.(PAGE_FLOOR);

            if (onBackendSearch) {
              onBackendSearch(e.target.value);
              return;
            }

            setFilterText(e.target.value);
          }}
        />
        <span
          onClick={() => {
            if (onBackendSearch) {
              onBackendSearch("");
              return;
            }

            setFilterText("");
          }}
          style={(backendSearch ?? filterText) === "" ? { display: "none" } : undefined}
        >
          <Icon className="jrc-Table__Flex__Icon" path={mdiClose} size={18} />
        </span>
      </Flex>
      <div className="jrc-Table__grid-container">
        <div className="jrc-Table__overflow-container jrc-show-scrollbar">
          <table className="jrc-Table">
            {filteredData.length > 0 && (
              <thead>
                <tr>
                  {Object.keys(filteredData[0]).map(key =>
                    key === BUTTONS_KEY ? (
                      <th
                        style={{
                          width: "1%",
                          whiteSpace: "nowrap",
                        }}
                        key={getTableElementKey(`header-${key}`)}
                      />
                    ) : (
                      <th
                        className="jrc-Table__non-buttons-header"
                        onClick={onHeaderClick(key)}
                        key={getTableElementKey(`header-${key}`)}
                      >
                        {key}
                        <Icon
                          className={
                            keySort === undefined ? "jrc-opacity-0" : keySort.header !== key ? "jrc-opacity-0" : ""
                          }
                          path={keySort?.order === 1 ? mdiChevronDown : mdiChevronUp}
                          viewBox={"0 0 18 18"}
                        />
                      </th>
                    )
                  )}
                </tr>
              </thead>
            )}
            <tbody>
              {loading ? (
                Array(perPage)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={getTableElementKey(`shimmer${i}`)}>
                      <td>
                        <Shimmer />
                      </td>
                      <td>
                        <Shimmer />
                      </td>
                      <td>
                        <Shimmer />
                      </td>
                    </tr>
                  ))
              ) : filteredData.length === 0 ? (
                <tr>
                  <td className="jrc-Table__empty-data" colSpan={Object.keys(filteredData[0] ?? {}).length}>
                    No results available
                  </td>
                </tr>
              ) : (
                itemPaginated(filteredData).map((obj, i) => (
                  <tr key={getTableElementKey(`row-${i}`)}>
                    {Object.entries<any>(obj).map(([key, value]) => {
                      // If this column should have max-width and ellipsis
                      if (maxWidthColumns[key]) {
                        return (
                          <td className="jrc-text-nowrap" key={getTableElementKey(`${key}-value-${i}`)}>
                            <div
                              style={{
                                maxWidth: maxWidthColumns[key],
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                              title={typeof value === "string" ? value : undefined}
                            >
                              {value}
                            </div>
                          </td>
                        );
                      }

                      // Default rendering
                      if (key === BUTTONS_KEY) {
                        return (
                          <td data-buttons-cell key={getTableElementKey(`${key}-cell-${i}`)}>
                            {value}
                          </td>
                        );
                      }

                      return (
                        <td className="jrc-text-nowrap" key={getTableElementKey(`${key}-value-${i}`)}>
                          {value}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div>
          <Paginator
            {...{
              currentPage: backendCurrentPage ?? currentPage,
              filteredData,
              pagesList,
              perPage,
              backendTotalRows,
              setCurrentPage: selectedPage => {
                setCurrentPage(selectedPage);
                onBackendChangePage?.(selectedPage);
              },
              setPerPage: selectedPerPage => {
                setCurrentPage(PAGE_FLOOR);
                onBackendChangePage?.(PAGE_FLOOR);
                setPerPage(selectedPerPage);
                onBackendChangePerPage?.(selectedPerPage);
              },
            }}
          />
        </div>
        <div /> {/* Empty element just to even the last element gap */}
      </div>
    </Card>
  );
}
