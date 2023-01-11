import React from 'react';
import styled from 'styled-components';

export const selectOptions = [
    { value: '', label: '포트폴리오 파도타기' },
    { value: 'https://genie-pagination.onrender.com', label: 'Pagination' },
    { value: 'https://genie-pokemon.onrender.com', label: 'Pokemon' },
    { value: 'https://genie-movieapp.onrender.com', label: 'Movie App' },
    { value: 'https://h-genie.github.io/todo', label: 'To Do List App' },
    { value: 'https://h-genie.github.io/genesis', label: 'Genesis' },
    { value: 'https://h-genie.github.io/flag-game', label: '청기백기 게임' },
    { value: 'https://h-genie.github.io/hugeinc', label: 'Huge Inc.' },
    { value: 'https://h-genie.github.io/netflix', label: 'Netflix' },
    { value: 'https://h-genie.github.io/naver', label: 'Naver Corp.' },
    { value: 'https://vomacademy.com', label: '봄아카데미' },
]

const PortfolioSelect = () => {
    const onChange = e => {
        e.preventDefault();
        const url = e.target.value;

        if (url === "") return;
        window.open(url);
    }

    return (
        <Select onChange={onChange}>
            {selectOptions.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)}
        </Select>
    )
}

export default PortfolioSelect;

const Select = styled.select`
    width : 100%;
    height : 30px;
    border : 1px solid #85c8f2;
    border-radius : 5px;
    color : rgb(108, 108, 108);
    font-family: SCDream4;
    font-size: 14px;
    letter-spacing: -0.5px;
    letter-spacing: 0;
    line-height: 18px;

    cursor : pointer;
    padding : 0 6px;
    outline : none;
    background: none;
    appearance: none;
    margin-top : 10px;
`;