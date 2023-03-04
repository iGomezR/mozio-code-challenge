import React, { useEffect, useMemo, useRef, useState } from "react";
import Cancel from "components/Icons/Cancel";
import styled from "styled-components";
import { palette } from "utils/palette";
import { OptionList } from "utils/types";
import { IconContainer } from "styles/sharedType";
import { getCities } from "services/api-cities";

type IInputList = {
  label?: string;
  list: OptionList[];
  isLoading: boolean;
  onSelected: Function;
  value?: string;
};

const InputList = ({ label = "", list, onSelected, value }: IInputList) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [filterVal, setFilterVal] = useState<string>(value || "");
  const [data, setData] = useState<OptionList[]>(list);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        //@ts-ignore 
        const result: OptionList[] = await getCities(filterVal);
        setData(result);
      } catch (error) {
        setHasError(true);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [filterVal]);

  const onSelectOption = ({ name, lat, lon }: OptionList) => {
    setFilterVal(name);
    setShowList(false);
    setHasError(false);
    onSelected && onSelected({ name, lat, lon });
  };

  const renderList = (optionsList: OptionList[]) => {
    return (
      <ListContainer>
        {optionsList?.map(({ name, lat, lon }, indx) => (
          <Row
            key={`${name}-${indx}`}
            onClick={() => onSelectOption({ name, lat, lon })}
          >
            {name}
          </Row>
        ))}
      </ListContainer>
    );
  };

  const renderLoadingState = () => {
    return (
      <ListContainer>
        {Array.from({ length: 3 }).map((v, indx) => (
          <Row key={`${indx}`} bgLoading />
        ))}
      </ListContainer>
    );
  };

  return (
    <Wrapp>
      <Container>
        <Title>{label}</Title>
        <Box hasError={hasError}>
          <Input
            onFocus={() => setShowList(true)}
            value={filterVal}
            onChange={(e) => {
              setFilterVal(e?.target.value);
            }}
            onBlur={() => {
              setHasError(true);
            }}
          />
          {showList && (
            <IconContainer onClick={() => setShowList(false)}>
              <Cancel />
            </IconContainer>
          )}
        </Box>
        {hasError && (
          <ErrorMessage>You must choose the city of origin</ErrorMessage>
        )}
      </Container>
      <div>
        {data.length > 0 && showList && !isLoading && (
          <Options>{renderList(data)}</Options>
        )}
        {showList && isLoading && renderLoadingState()}
      </div>
    </Wrapp>
  );
};

const Wrapp = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 324px;
  @media only screen and (max-width: 600px) {
    width: 216px;
  }
`;

const Box = styled.div<{ hasError: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${({ hasError }) => (hasError ? palette.Red : palette.Grey)};
  ${({ hasError }) => hasError && "color: red;"};
  border-radius: 6px;
  padding: 8px 10px;
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

const Input = styled.input`
  background: ${palette.White};
  border: none;
  width: 100%;
  outline: none;
`;
const Options = styled.div`
  position: relative;
  z-index: 1006;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${palette.White};
  border: 1px solid ${palette.PurpleLight};
  box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 6px;
  gap: 6px;
  margin-top: 7px;
  position: absolute;
  z-index: -1;
`;

const Row = styled.div<{ bgLoading?: boolean }>`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  max-width: 300px;
  height: 28px;
  padding: 6px;
  background-color: ${({ bgLoading }) =>
    bgLoading ? palette.Grey : palette.White};
  border-radius: 6px;
  :hover {
    background: ${palette.PurpleLight};
  }
  width: 300px;
  @media only screen and (max-width: 600px) {
    width: 190px;
  }
`;

export default InputList;
