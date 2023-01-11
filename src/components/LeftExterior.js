import React from 'react';
import styled from 'styled-components';
import LeftInterior from './LeftInterior/LeftInterior';

const LeftExterior = () => {
    return (
        <Exterior>
            <LeftInterior />
        </Exterior>
    )
}

export default LeftExterior;

const Exterior = styled.div`
    width : 90%;
    height : 90%;
    background-color : white;
    border-radius : 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;