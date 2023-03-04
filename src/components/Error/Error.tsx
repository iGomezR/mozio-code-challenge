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

const Error = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  //@ts-ignore 
  const destination: ICity[] = JSON.parse(searchParams.get("destination"));
  //@ts-ignore 
  const passengers: number = searchParams.get("passengers");
  //@ts-ignore 
  const startDate: string = searchParams.get("startDate");
  //@ts-ignore 
  const distance: number[] = JSON.parse(searchParams.get("distance"));

  return (
    <Layout>
      <>
        <Row>
          Oops! Something went wrong!
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
  align-items: center;
  gap: 10px;
`;

export default Error;
