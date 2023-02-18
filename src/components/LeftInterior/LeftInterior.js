import React from 'react';
import styled from 'styled-components';
import Today from './sections/Today';
import Message from './sections/Message';
import Name from './sections/Name';
import PortfolioSelect from './sections/PortfolioSelect';

const LeftInterior = () => {
    return (
        <Interior>
            <Ring />
            <Ring />
            <Ring />
            <Ring />

            <Today />
            <img src="/images/profile.jpg" alt="profile" style={{ width: '100%', marginTop: '10px' }} />
            <Message />
            <Name />
            <PortfolioSelect />
        </Interior>
    )
}

export default LeftInterior;

const Interior = styled.div`
    width : 90%;
    height : 90%;
    border: 2px solid #85c8f2;
    border-radius: 20px;
    margin-right: 10px;
    padding: 20px 30px;
    color : rgb(108, 108, 108);

    position: relative;
    flex-direction: column;    
`;

const Ring = styled.div`
    width: 50px;
    height: 25px;
    border-radius: 12.5px;
    background: linear-gradient(
        120deg, 
        rgba(230, 229, 230, 1) 0%, 
        rgba(252, 251, 253, 1) 20%,
        rgba(187, 181, 186, 1) 66%,
        rgba(138, 137, 138, 1) 100% 
    );
    border: 1px solid #9f9e9f;
    position: absolute;
    right: -37.5px;
    z-index: 1;

    &:nth-of-type(1) {top : 70px}
    &:nth-of-type(2) {top : 123px}
    &:nth-of-type(3) {bottom : 123px}
    &:nth-of-type(4) {bottom : 70px}
`;