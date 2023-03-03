import LastPoint from "components/Icons/LastPoint";
import Point from "components/Icons/Point";
import Union from "components/Icons/Union";
import InputList from "components/InputList/InputList";
import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { IconContainer } from "styles/sharedType";
import { CITIES } from "utils/constant";
import { palette } from "utils/palette";
import { ICity, OptionList } from "utils/types";

type DestinationFormProps = {
  children?: JSX.Element;
  totalDestination: number;
  setDestination: Function;
  unSetDestionation: Function;
  destinationList?: ICity[];
};
const DestinationForm: FC<DestinationFormProps> = ({
  totalDestination = 2,
  setDestination,
  unSetDestionation,
  destinationList,
}) => {
    
  return (
    <Container>
      {Array.from({ length: totalDestination }).map((val, indx) => {
        const isTheLastItem = indx > 0 && indx === totalDestination - 1;
        return (
          <Row key={indx}>
            <IconContainer>
              {isTheLastItem ? <LastPoint /> : <Point />}
            </IconContainer>
            <InputList
              list={CITIES}
              value={destinationList[indx]?.name}
              label={indx === 0 ? "City of origin" : "City of destination"}
              onSelected={(value: OptionList) =>
                setDestination({ order: indx, ...value })
              }
              isLoading={false}
            />
            {isTheLastItem && (
              <IconContainer onClick={() => unSetDestionation(indx)}>
                <Union />
              </IconContainer>
            )}
          </Row>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;  
`;
export default DestinationForm;
