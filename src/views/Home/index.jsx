import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import ReactPaginate from 'react-paginate';

import Navbar from '../../components/Navbar';
import Events from '../../components/Events';
import useEventsResults from '../../state/events-result';
import styles from './Home.module.css';

const Home = () => {
    const { data, isLoading, error, fetchEvents } = useEventsResults();
    const events = useMemo(() => data?._embedded?.events || [], [data?._embedded?.events]);
    const page = useMemo(() => data?.page || {}, [data?.page]);
    const pageCount = useMemo(() => {
        const total = page?.totalPages;
        return Number.isInteger(total) ? total : 0;
    }, [page?.totalPages]);

    const [isToggle, setIsToggle] = useState(false);

    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef();
    const fetchMyEventsRef = useRef();

    fetchMyEventsRef.current = fetchEvents;

    useEffect(() => {
        fetchMyEventsRef.current();
    }, []);

    const handleNavbarSearch = (term) => {
        setSearchTerm(term);
        fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = useCallback(({ selected }) => {
        fetchEvents(`&keyword=${searchTerm}&page=${selected}`);
    }, [searchTerm, fetchEvents]);

    const renderEvents = () => {
        if (isLoading) {
            return <div>Cargando resultados...</div>;
        }

        if (error) {
            return <div>Ha ocurrido un error</div>;
        }

        return (
            <div>
                <button onClick={() => setIsToggle(!isToggle)}>{isToggle ? 'ON' : 'OFF'}</button>
                <Events searchTerm={searchTerm} events={events} />
                <ReactPaginate
                    className={styles.pagination}
                    nextClassName={styles.next}
                    previousClassName={styles.previous}
                    pageClassName={styles.page}
                    activeClassName={styles.activePage}
                    disabledClassName={styles.disabledPage}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                />
            </div>
        );
    }

    return (
        <>
            <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
            {renderEvents()}
        </>
    )
};

export default Home;
