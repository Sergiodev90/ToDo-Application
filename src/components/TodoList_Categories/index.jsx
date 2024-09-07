import { useEffect, useRef } from 'react';
import './TodoList_categories.css';

function TODO_LIST_CATEGORIES({ children }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;

        if (!container) return;

        function handleWheel(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        }

        container.addEventListener('wheel', handleWheel);

        // Cleanup event listener when component unmounts
        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <div className='TODO-LIST-CATEGORIES--container' ref={containerRef}>
            {children}
        </div>
    );
}

export { TODO_LIST_CATEGORIES };

