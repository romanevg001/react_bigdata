import { useEffect, useState } from "react";

export interface IUsePaginationProps<T> {
  list: T;
  countPerPage: number;
}
export function usePagination<T>({ list,  countPerPage}: IUsePaginationProps<T>): [
  typeof inlist,
  typeof pagesList,
  typeof onSetActive,
  typeof activePage
] {
  const inlist = list['linkedList'] ? list.linkedList : list;
  const [pagesList, setPagesList] = useState([1]);
  const [activePage, setActivePage] = useState(0);
  const [listSlice, setListSlice] = useState<T>();

  const createListSlice = (aPage = activePage) => {
    setListSlice(inlist.slice(aPage * countPerPage, aPage * countPerPage + countPerPage));
  };

  const createPagesList = () => {
    const countPages = Math.ceil(inlist.length / countPerPage);
    const arr = Array.from(new Array(countPages), (_, i) => i + 1);
    setPagesList(arr);
  };

  useEffect(() => {
    createPagesList();
    createListSlice();
  }, [list]);

  const onSetActive = (id: number) => {
    setActivePage(id - 1);
    createListSlice(id - 1);
  };

  return [listSlice, pagesList, onSetActive, activePage + 1];
}
