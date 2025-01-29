import './Pagination.module.scss';
import styles from './Pagination.module.scss';

export interface IPaginationProps {
    pagesList: number[];
    onSetActive: (activePage: number)=>void;
    activePage: number;
}

export function Pagination({pagesList, onSetActive, activePage}:IPaginationProps){

    return (<ul>{pagesList.map(el=>(<li onClick={()=>onSetActive(el)} className={activePage == el? styles.active:''}>{el}</li>))}</ul>)
}
