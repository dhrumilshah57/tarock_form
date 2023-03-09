import { useEffect, useState } from 'react';

function useTable(page: number, rowsPerPage: number, data: any[]) {
    console.log(rowsPerPage);

    const [tableRange, setTableRange] = useState<number[]>([]);
    const [slice, setSlice] = useState<any[]>([]);
    const calculateRange = (rowsPerPage: number, data: any[]) => {
        const range = [];
        const num = Math.ceil(data.length / rowsPerPage);
        for (let i = 1; i <= num; i++) {
            range.push(i);
        }
        console.log(range)
        return range;
    };

    const sliceData = (page: number, rowsPerPage: number, data: any[]) => {
        return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    };

    useEffect(() => {
        const range = calculateRange(rowsPerPage, data);
        setTableRange([...range]);

        const slice = sliceData(page, rowsPerPage, data);
        setSlice([...slice]);
    }, [data, setTableRange, page, setSlice, rowsPerPage]);
    return { slice, range: tableRange };
}

export default useTable