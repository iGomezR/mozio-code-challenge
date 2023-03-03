import React, { Children, useState } from "react";
import styled from "styled-components";

const Layout = ({ children }: { children: JSX.Element }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  @media only screen and (max-width: 600px) {
    max-width: 360px;
    min-height: 384px;
    padding: 70px 0px;
  }
  max-width: 726px;
  min-height: 426px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70px;
`;

export default Layout;
