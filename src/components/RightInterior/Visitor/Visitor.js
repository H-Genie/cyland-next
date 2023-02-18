import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PortfolioVisitor from './PortfolioVisitor';

const Visitor = ({ no, content, notice, type }) => {
    const [now, setNow] = useState(null)

    useEffect(() => {
        setNow(new Date().toLocaleString())
    }, [])

    return (
        <>
            <Cyworld notice={notice}>
                <div className="top">
                    <p>
                        <span>NO. {no}</span>
                        서형진
                        <span>( {now} )</span>
                    </p>
                </div>
                <div className="bottom">
                    <img src={'/images/minimi.jpg'} alt="profile" className="profile" />
                    <div className="content">
                        {type ? <PortfolioVisitor content={content} /> : content}
                    </div>
                </div>
            </Cyworld>
            <br />
            <br />
        </>
    )
}

export default Visitor;

const Cyworld = styled.div`
    width : 100%;

    .top {
        width : 100%;
        height : 30px;
        border-top : 1px solid #ccc;
        display : flex;
        align-items : center;
        background-color : ${props => props.notice === true ? "rgb(255,238,210)" : "#f1f1f1"};
        
        p {
            font-size : 16px;
            color : rgb(85,26,139);
            display : flex;
            align-items : center;
        }

        span {
            font-size : 12px;
            color : rgb(108,108,108);

            &:nth-of-type(1) {margin : 0 30px;}
            &:nth-of-type(2) {margin-left : 50px;}
        }
    }

    .bottom {
        display : flex;
        margin-top : 10px;
    }

    .profile {
        width : 170px;
        height : 170px;
    }

    .content {
        width : 100%;
        min-height : 170px;
        display : flex;
        justify-content : center;
        flex-direction : column;
        margin-left : 17px;
    }

    .portfolio {
        width : 280px;
    }
`;