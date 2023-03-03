import React, { FC, useState } from "react";
import styled from 'styled-components';
import { palette } from "utils/palette";

type LinkProps = {
    label: string;
    onClick?: () => void | undefined;
    children?: JSX.Element;
}
const Link: FC<LinkProps> = ({
    label,
    onClick,
    children,
}) => {
    return (
        <LinkBase
            onClick={onClick}
        >
            {label || children}
        </LinkBase>
    )
}

const LinkBase = styled.a`
  color: ${palette.PurpleDark};
  cursor: pointer;
  text-decoration: none;
`;

export default Link;