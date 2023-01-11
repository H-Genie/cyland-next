import React from 'react';
import styled from 'styled-components';
import LeftExterior from './LeftExterior';

const CylandLeft = () => {
    return (
        <Left>
            <LeftExterior />
        </Left>
    )
}

export default CylandLeft;

const Left = styled.div`
    width : 30%;
    height : 100%;    
    background-color : #85c8f2;
    border-radius : 20px;
    display : flex;
    justify-content : flex-end;
    align-items : center;
`;