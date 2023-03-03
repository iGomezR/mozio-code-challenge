import React, { useState } from "react";
import styled from 'styled-components';
import { palette } from "utils/palette";

type ICounter = {
    label: string;
    counter: number
    onIncrease: Function;
    onDecrease: Function;
    width?: string;
}

const Counter = ({ label, counter, onDecrease, onIncrease, ...rest }: ICounter) => {
    const hasError = counter === 0;
    return (
        <Container {...rest}>
            <Title>{label}</Title>
            <Box hasError={hasError}>
                <Button disabled={counter < 1} onClick={(e) => onDecrease && onDecrease()}> - </Button>
                <Count>{counter}</Count>
                <Button onClick={() => onIncrease && onIncrease()}> + </Button>
            </Box>
            {hasError && <ErrorMessage>Select passengers</ErrorMessage>}
        </Container>
    )
}
const Container = styled.div<{width?: string}>`
    display: flex;
    flex-direction: column;
    width: ${({ width }) => width || '92px'};
`;

const Box = styled.div<{ hasError: boolean }>`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    padding: 5px 9px;
    gap: 8px;
    border: 1px solid ${({ hasError }) => hasError ? palette.Red : palette.Grey};
    border-radius: 6px;
`;
const Title = styled.label`
    font-size: 12px;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0em;
`;
const ErrorMessage = styled(Title)`
    color: ${palette.Red};
`;
const Count = styled(Title)``;

const Button = styled.button`
    background-color: ${palette.PurpleLight};
    border-radius: 4px;
    border: none;
    color: ${palette.White};
    width: 21.36px;
    height: 21.36px;
    :hover {
        cursor: pointer;
        background-color: ${palette.PurpleDark}
    }

`;
export default Counter;