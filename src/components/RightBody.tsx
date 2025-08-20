"use client";
import styled from "@emotion/styled";
import RightExterior from "./RightBody/RightExterior";

export default function RightBody({ children }: { children: React.ReactNode }) {
  return (
    <Body>
      <RightExterior>{children}</RightExterior>
    </Body>
  );
}

const Body = styled.div`
  width: 70%;
  height: 100%;
  background-color: #85c8f2;
  border-radius: 20px;
  display: flex;
  align-items: center;
`;
