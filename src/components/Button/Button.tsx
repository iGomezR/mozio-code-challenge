import React, { useState } from "react";
import styled from 'styled-components';
import { palette } from "utils/palette";

type IBtn = {
    label: string;
    onClick: Function;
    isDisabled?: boolean;
}

const Button = ({ label, onClick, isDisabled = false }: IBtn) => {

    return (
        <StyledBtn disabled={isDisabled} isDisabled={isDisabled} onClick={() => onClick()}>
            {label}
        </StyledBtn>
    )
}
const StyledBtn = styled.button<{ isDisabled: boolean }>`
    width: 72px;
    height: 38px;
    background: ${({ isDisabled }) => isDisabled ? palette.Grey : '#374151'};
    border: 1px solid #E5E7EB;
    border-radius: 4px;
    cursor: pointer;
    color: ${palette.White};
    @media only screen and (max-width: 600px) {
        width: 100%;
    }
`;

export default Button;