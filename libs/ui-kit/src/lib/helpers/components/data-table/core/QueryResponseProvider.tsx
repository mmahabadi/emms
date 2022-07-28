import {FC, memo, PropsWithChildren, useContext, useEffect, useMemo, useState} from 'react'
import {useQuery} from 'react-query'
import {useQueryRequest} from './QueryRequestProvider'
import {createResponseContext, stringifyRequestQuery} from '../../../crud-helper/helpers';
import {initialQueryResponse, initialQueryState} from '../../../crud-helper/models';
import {PaginationLink, PaginationState} from "@emms/models";
import {useIntl} from "react-intl";
import {useDataTableConfig} from "./TableConfigProvider";
import {useAppState} from "@emms/ui-kit";

const QueryResponseContext = createResponseContext(initialQueryResponse);

const QueryResponseProvider: FC<PropsWithChildren<any>> = memo(({children}) => {
  const {hasServerSidePaging, queryId, getData, cacheTime, keepPreviousData, refetchOnWindowFocus} = useDataTableConfig();
  const {state} = useQueryRequest();
  const {appState: {refetchGridData}, updateAppState} = useAppState();
  const [query, setQuery] = useState<string>(stringifyRequestQuery(state, !!hasServerSidePaging));
  const updatedQuery = useMemo(() => stringifyRequestQuery(state, !!hasServerSidePaging), [state]);

  useEffect(() => {
    if (query !== updatedQuery) {
      setQuery(updatedQuery);
    }
  }, [updatedQuery]);

  const {
    isFetching,
    refetch,
    data: response
  } = useQuery(
    `${queryId}${query ? '&' + query : ''}`,
    () => {
      updateAppState({refetchGridData: refetch});
      return getData(query);
    },
    {cacheTime: Number(cacheTime) * 60 * 1000, staleTime: 2 * 60 * 1000, keepPreviousData, refetchOnWindowFocus}
  );

  return (
    <QueryResponseContext.Provider value={{isLoading: isFetching, refetch, response, query, hasServerSidePaging}}>
      {children}
    </QueryResponseContext.Provider>
  )
})

const useQueryResponse = () => useContext(QueryResponseContext)

const useQueryResponseData = () => {
  const {response, hasServerSidePaging} = useQueryResponse();
  const {state} = useQueryRequest();

  if (!response || !response?.data) {
    return [];
  }

  if (!hasServerSidePaging) {
    const {page, pageSize} = state;
    const start = (page - 1) * +pageSize;
    const end = +start + +pageSize;
    return response.data?.slice(start, end);
  }

  return response.data;
}

const useQueryResponsePagination = () => {
  const {response} = useQueryResponse();
  const {state} = useQueryRequest();

  const defaultPaginationState: PaginationState = {
    ...initialQueryState,
    page: state.page,
    total: response?.data?.length || 0
  }

  if (!response || !response.payload || !response.payload.pagination) {
    return defaultPaginationState;
  }

  return response.payload.pagination;
}

const useQueryResponseLoading = (): boolean => {
  const {isLoading} = useQueryResponse()
  return isLoading
}

const usePaginationLinks = () => {
  const DOTS = '&#8230;';
  const {total = 0, pageSize, siblingCount = 1, page} = useQueryResponsePagination();
  const intl = useIntl();

  const createLink = (page: number | null): PaginationLink => {
    return {url: `/?page=${page}`, label: `${page === null ? DOTS : page}`, active: true,  page: page};
  }

  const range = (start: number, end: number): Array<number>=> {
    const length = end - start + 1;
    /*
    	Create an array of certain length and set the elements within it from
      start value to end value.
    */
    return Array.from({ length }, (_, idx) => idx + start);
  };

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(total / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;
    let links: any[] = [];

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      links = range(1, totalPageCount);
    }

    /*
      Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(page - siblingCount, 1);
    const rightSiblingIndex = Math.min(page + siblingCount, totalPageCount);

    /*
      We do not show dots just when there is just one page number to be inserted between
      the extremes of sibling and the page limits i.e 1 and totalPageCount.
      Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
      Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      links = [...leftRange, DOTS, totalPageCount];
    }

    /*
      Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {

      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      links = [firstPageIndex, DOTS, ...rightRange];
    }

    /*
      Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      links = [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    if (links.length == 0){
      return links;
    }
    /*
      Add previous and next buttons
    */
    const previousPage = page - 1;
    const nextPage = page + 1;
    const previousLink = {...createLink(previousPage < firstPageIndex ? null : previousPage), label: intl.formatMessage({id: 'DATATABLE.PREVIOUS'}) } as PaginationLink;
    const nextLink = {...createLink(nextPage > lastPageIndex ? null : nextPage), label: intl.formatMessage({id: 'DATATABLE.NEXT'})} as PaginationLink;
    const pages = links.map((item: number | string) => createLink(typeof item == 'string' ? null : item));
    return [previousLink, ...pages, nextLink];
  }, [total, page, siblingCount, pageSize]);

  return paginationRange;
};

export {
  QueryResponseProvider,
  useQueryResponse,
  useQueryResponseData,
  useQueryResponsePagination,
  usePaginationLinks,
  useQueryResponseLoading,
}
