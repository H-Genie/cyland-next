import React from 'react';
import styled from 'styled-components';

const Name = () => {
    return (
        <>
            <NameSection>
                <h5>서형진</h5>
                <p>04.14</p>
            </NameSection>
            <BadgeSection>
                <Badge>🐯</Badge>
                <Badge>🆎</Badge>
                <Badge>👨‍💻</Badge>
                <Badge>🏃</Badge>
                <Badge>✈</Badge>
            </BadgeSection>
        </>
    )
}

export default Name;

const NameSection = styled.div`
    display : flex;
    align-items : flex-end;
    margin : 15px 0;

    h5 {margin-right : 10px}
`;

const BadgeSection = styled.ul`
    display : flex;
    align-items : center;
`;

const Badge = styled.li`
    width: 30px;
    height: 30px;
    border: 1px solid #85c8f2;
    border-radius: 5px;
    margin-right: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
`;