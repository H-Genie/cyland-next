import React from 'react';
import styled from 'styled-components';

const PortfolioVisitor = ({ content }) => {
    return (
        <Div>
            <br />

            <h6>{content.classification}</h6>
            <br />

            <h4>{content.title}</h4>
            <br />

            <h6>{content.language}</h6>
            <br />
            <br />

            {
                content.description.split('\n').map((line, index) =>
                    <p key={index}>{line}<br /></p>
                )
            }

            <br />

            <p>{`<주요 학습 내용>`}</p>
            <p>: {content.study}</p>
            <br />

            <p>{`<작업 범위>`}</p>
            <p>: {content.range}</p>
            <br />

            {content.img && <Img src={content.img} alt={content.title} />}
            <br />

            <Row>
                <a href={Object.values(content.link)[0]} target="_blank" rel="noreferrer">
                    <p>
                        {`<${Object.keys(content.link)[0]} 보기>`}
                    </p>
                </a>
                {
                    Object.values(content.link)[1] ?
                        <>
                            <Space />
                            <a href={Object.values(content.link)[1]} target="_blank" rel="noreferrer">
                                <p>
                                    {`<${Object.keys(content.link)[1]} 보기>`}
                                </p>
                            </a>
                        </> : null
                }
                {
                    !Object.values(content.link)[2] ?
                        null :
                        typeof Object.values(content.link)[2] === "string" ?
                            <>
                                <Space />
                                <a href={Object.values(content.link)[2]} target="_blank" rel="noreferrer">
                                    <p>
                                        {`<${Object.keys(content.link)[2]} 보기>`}
                                    </p>
                                </a>
                            </> :
                            <>
                                <Space />
                                {Object.values(content.link)[2]}
                            </>
                }
            </Row>
        </Div>
    )
}

export default PortfolioVisitor;

const Div = styled.div`
    width : 100%;
    min-height : 170px;
    display : flex;
    justify-content : center;
    flex-direction : column;

    & > p {
        line-height : 20px;
    }
`;

const Img = styled.img`
    width : 320px;
    border : 1px solid rgba(0,0,0,0.3);
    box-shadow: 5px 5px 5px rgb(0,0,0,0.3);
`;

const Row = styled.div`
    display : flex;
`;

const Space = styled.span`
    width : 15px;
`;