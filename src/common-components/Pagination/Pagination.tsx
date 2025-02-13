import { memo, useEffect, useState } from 'react';
import './Pagination.module.scss';
import styles from './Pagination.module.scss';


export interface IPaginationProps {
    list: unknown[];
    setListSlice: ()=>void;
    countPerPage?: number;
}

export const Pagination = memo(({list, setListSlice, countPerPage=50}: IPaginationProps) => {
    const [pagesList, setPagesList] = useState([1]);
    const [activePage, setActivePage] = useState(1);

    const createListSlice = (aPage = activePage) => {
        aPage--;
        setListSlice(list.slice(aPage * countPerPage, aPage * countPerPage + countPerPage));
    };

    const createPagesList = () => {
        const countPages = Math.ceil(list.length / countPerPage);
        const arr = Array.from(new Array(countPages), (_, i) => i + 1);
        setPagesList(arr);
    };

    useEffect(() => {
        createPagesList();
        createListSlice();
        console.log('list',list)
        console.log('activePage',activePage);

    }, [list]);

    const onSetActive = (id: number) => {
        console.log('onSetActive',id);

        setActivePage(id);
        createListSlice(id);
    };
    
    const start = activePage < 5 ? 0 : activePage-5;
    const end = pagesList.length < activePage+5 ? pagesList.length : activePage+5
    const centralPart = pagesList.slice(start, end);
    const leftPartK = Math.round(pagesList.slice(0, start).length / 3);
    const leftPart = leftPartK > 1 && pagesList[start] !== pagesList[0]? [1, leftPartK, leftPartK*2] : [];
    const rightPartK = Math.round(pagesList.slice(end, pagesList.length).length / 3);
    const rightPart = rightPartK > 1 && pagesList[end] !== pagesList[pagesList.length - 1] ? [ pagesList.length - rightPartK*2, pagesList.length - rightPartK, pagesList.length] :[];

    return (
        <ul className='flex justify-center m-[15px]'>
            {leftPart.map(el=>(<li key={'p'+el} onClick={()=>onSetActive(el)} className={activePage == el? styles.active:''}>{el}</li>))}
            { !!leftPart.length && <li>...</li>}
            {centralPart.map(el=>(<li key={'p'+el} onClick={()=>onSetActive(el)} className={activePage == el? styles.active:''}>{el}</li>))}
            { !!rightPart.length && (<li>...</li>)}
            {rightPart.map(el=>(<li key={'p'+el} onClick={()=>onSetActive(el)} className={activePage == el? styles.active:''}>{el}</li>))}
        </ul>
    )
});

