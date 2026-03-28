import { memo, useCallback } from "react";
import { uniqueKey } from "../../utils/utils";
import { Button } from "../Form/Button";
import { Buttons } from "../Form/Buttons";
import { Input } from "../Form/Input";
import { Flex } from "./Flex";

type PaginatorProps = {
  currentPage: number;
  perPage: number;
  pagesList: number[];
  filteredData: any[];
  backendTotalRows?: number;
  setCurrentPage: (page: number) => unknown;
  setPerPage: (page: number) => unknown;
};

export function Paginator({
  currentPage,
  perPage,
  pagesList,
  filteredData,
  backendTotalRows,
  setCurrentPage,
  setPerPage,
}: PaginatorProps) {
  const getPaginatorKey = useCallback((page: number) => `paginator-${page}-${uniqueKey()}`, []);

  const isInTheMiddle = currentPage > 2 && currentPage < pagesList.length - 1;

  const isLessThan10 = pagesList.length < 10;

  const EllipsisButton = memo(() => <Button variant="secondary" small text="..." disabled onClick={() => {}} />);

  const isOverlapping = (page: number) => page < 3 || page > pagesList.length - 2;

  const totalRows = backendTotalRows ?? filteredData?.length ?? 0;
  const startIndex = totalRows === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endIndex = Math.min(currentPage * perPage, totalRows);

  return (
    <div className="jrc-Paginator jrc-hide-scrollbar">
      <Buttons className="jrc-Paginator__Buttons">
        {isLessThan10 ? (
          pagesList.map(page => (
            <Button
              small
              className="jrc-Paginator__Button"
              variant={currentPage === page ? "tertiary" : "secondary"}
              text={page}
              disabled={page === currentPage}
              onClick={() => setCurrentPage(page)}
              key={getPaginatorKey(page)}
            />
          ))
        ) : (
          <>
            {pagesList.slice(0, isInTheMiddle ? 2 : 3).map(page => (
              <Button
                className="jrc-Paginator__Button"
                small
                variant={currentPage === page ? "tertiary" : "secondary"}
                text={page}
                disabled={page === currentPage}
                onClick={() => setCurrentPage(page)}
                key={getPaginatorKey(page)}
              />
            ))}

            {isInTheMiddle ? (
              <>
                <EllipsisButton />
                {pagesList
                  .slice(currentPage - 3, currentPage + 2)
                  .map(page =>
                    isOverlapping(page) ? null : (
                      <Button
                        small
                        className="jrc-Paginator__Button jrc-Paginator__Button--in-the-middle-start"
                        variant={currentPage === page ? "tertiary" : "secondary"}
                        text={page}
                        disabled={page === currentPage}
                        onClick={() => setCurrentPage(page)}
                        key={getPaginatorKey(page)}
                      />
                    )
                  )}
                <EllipsisButton />
              </>
            ) : (
              <EllipsisButton />
            )}

            {pagesList.splice(isInTheMiddle ? -2 : -3).map(page => (
              <Button
                small
                className="jrc-Paginator__Button jrc-Paginator__Button--in-the-middle-end"
                variant={currentPage === page ? "tertiary" : "secondary"}
                text={page}
                disabled={page === currentPage}
                onClick={() => setCurrentPage(page)}
                key={getPaginatorKey(page)}
              />
            ))}
          </>
        )}
      </Buttons>

      <Flex className="jrc-Paginator__per-page-container" items="center">
        <small className="jrc-Paginator__per-page-side-comment">
          {totalRows > 0 ? `Showing ${startIndex}-${endIndex} of ${totalRows} entries` : "No entries found"}
        </small>
        <Input
          type="number"
          className="jrc-Paginator__per-page-number"
          id={`paginator-per-page-input-${uniqueKey()}`}
          value={perPage}
          min={1}
          onChange={setPerPage}
        />
        <small className="jrc-Paginator__per-page-text jrc-text-nowrap">per page</small>
      </Flex>
    </div>
  );
}
