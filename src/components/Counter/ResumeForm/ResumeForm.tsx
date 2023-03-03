import React, { useState } from "react";
import { getDistance, shortDateformatter } from "utils/shared";
import { ICity } from "utils/types";
import { palette } from "utils/palette";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "components/Button/Button";
import LastPoint from "components/Icons/LastPoint";
import Layout from "components/Layout/Layout";
import Point from "components/Icons/Point";
import styled from "styled-components";

const ResumeForm = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const destination: ICity[] = JSON.parse(searchParams.get("destination"));
  const passengers: number = searchParams.get("passengers");
  const startDate: string = searchParams.get("startDate");
  const distance: number[] = JSON.parse(searchParams.get("distance"));

  return (
    <Layout>
      <>
        <Row>
          <Column gap="18px">
            {distance?.map((dist) => (
              <Bubble>{`${dist.toFixed(2)} km`}</Bubble>
            ))}
          </Column>
          <Column gap="28px">
            {destination?.map((v, indx) => {
              const isTheLastItem = indx > 0 && indx === destination.length - 1;
              return (
                <CityName>
                  {isTheLastItem ? <LastPoint /> : <Point />}
                  <TextVal>{v?.name}</TextVal>
                </CityName>
              );
            })}
          </Column>
        </Row>
        <Row>
          <Column alignItem="center" gap="8px">
            <div>
              <ColorfulText>
                {`${distance
                  ?.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  )
                  .toFixed(2)} km`}{" "}
              </ColorfulText>{" "}
              <TextVal>is total distance</TextVal>
            </div>
            <div>
              <ColorfulText>{passengers}</ColorfulText>
              <TextVal> passengers</TextVal>
            </div>
            <ColorfulText>
              {shortDateformatter(new Date(startDate))}
            </ColorfulText>
          </Column>
        </Row>
        <Button
          label="Back"
          onClick={() => {
            navigate({
              pathname: "/",
              search: searchParams.toString(),
            });
          }}
        />
      </>
    </Layout>
  );
};
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

const Column = styled.div<{
  alignItem?: string;
  gap: string;
  paddingTop?: string;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${({ gap }) => gap && `gap: ${gap};`}
  ${({ alignItem }) => alignItem && "align-items: center;"}
`;

const Bubble = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid ${palette.PurpleDark};
  border-radius: 6px;
  color: ${palette.PurpleDark};
  width: 94.41px;
  height: 23.02px;
  font-style: normal;
`;

const TextVal = styled.text`
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`;

const ColorfulText = styled(TextVal)`
  color: ${palette.PurpleDark};
`;
const CityName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  border: none;
  gap: 17px;
`;

export default ResumeForm;
