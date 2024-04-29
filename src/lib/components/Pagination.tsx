import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Header from '../modelisations/Header';
import { styled } from 'styled-components';

const Td = styled.td`
    ${(props) => props.theme.colors.colorTh !== '#fff' ? 'border: 1px solid' + props.theme.colors.colorTh : 'border: ' + props.theme.colors.border };
    text-align: left;
    padding: 8px;
`;

interface PaginationProps { }

const Pagination: React.FC<PaginationProps> = () => {

    const { header, displayItem, loading, error, body } = useSelector((state: RootState) => state.table);

    return (
        <>
            {loading ? <tr><Td colSpan={header.length} key={Math.random().toString(16).slice(2)} style={{ textAlign: "center" }}>Loading...</Td></tr> :
                error || body.error !== undefined ? <tr><Td colSpan={header.length} key={Math.random().toString(16).slice(2)} style={{ textAlign: "center" }}>Error API</Td></tr> :
                    displayItem.length > 0 ? displayItem.map((item: any, index: number) => (
                        <tr key={index}>
                            {header.length > 0 ? header.map((column: Header) => {
                                return <Td key={item[column.id] + Math.random().toString(16).slice(2)}>{column.type.toLowerCase() === 'date' ? new Date(item[column.id]).toLocaleDateString() : item[column.id].toString()}</Td>;
                            }) : null}
                        </tr>
                    )) : <tr><Td colSpan={header.length} key={Math.random().toString(16).slice(2)}>no data found</Td></tr>
            }
        </>
    );
};

export default Pagination;
