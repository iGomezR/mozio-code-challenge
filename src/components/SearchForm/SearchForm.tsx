import React, { useState } from "react";
import { ICity } from "utils/types";
import DestinationForm from "components/DestinationForm/DestinationForm";
import Link from "components/Link/Link";
import styled from "styled-components";
import Plus from "components/Icons/Plus";
import Counter from "components/Counter/Counter";
import Button from "components/Button/Button";
import CustomDatePicker from "components/CustomDatePicker/CustomDatePicker";
import Layout from "components/Layout/Layout";
import {
  useSearchParams,
  createSearchParams,
  useNavigate,
} from "react-router-dom";
import { getDistance } from "utils/shared";

const SearchForm = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const destinationUrl: ICity[] = JSON.parse(searchParams.get("destination"));
  const passengersUrl: number = searchParams.get("passengers");
  const startDateUrl: string = searchParams.get("startDate");

  const [startDate, setStartDate] = useState(
    startDateUrl ? new Date(startDateUrl) : new Date()
  );
  const [passengers, setPassengers] = useState<number>(
    parseInt(passengersUrl) || 1
  );
  const [destination, setDestination] = useState<number>(
    destinationUrl?.length || 2
  );
  const [destinationList, setDestinationList] = useState<ICity[]>(
    destinationUrl || []
  );

  const AddNewDestination = (newDest: ICity) => {
    setDestinationList((prev) => {
      const existIndex = prev.findIndex(
        ({ order }) => order === newDest?.order
      );
      if (existIndex !== -1) {
        let newArray = structuredClone(prev);
        newArray[existIndex] = newDest;
        return newArray;
      }
      return [...prev, newDest];
    });
  };

  const RemoveDestination = (indx: number) => {
    setDestinationList((prev) => {
      prev.splice(indx, 1);
      let newArray = structuredClone(prev);
      return [...newArray.map((v, i) => ({ ...v, order: i }))];
    });
    setDestination((prev) => prev - 1);
  };

  const goToResume = () => {
    const distance = getDistance(destinationList);
    const url = createSearchParams({
      destination: JSON.stringify(destinationList),
      passengers: passengers,
      startDate: startDate,
      distance: JSON.stringify(distance),
    });
    navigate({
      pathname: "/resume",
      search: url.toString(),
    });
  }
  const isNotCompleted = destinationList?.length < 2 || passengers < 1;

  return (
    <Layout>
      <>
        <FormContainer>
          <div>
            <DestinationForm
              totalDestination={destination}
              destinationList={destinationList}
              setDestination={(val: ICity) => AddNewDestination(val)}
              unSetDestionation={(indexToRemove: number) =>
                RemoveDestination(indexToRemove)
              }
            />
            <Row>
              <Plus />
              <Link
                label="Add destination"
                onClick={() => setDestination((prev) => prev + 1)}
              />
            </Row>
          </div>
          <Column>
            <Counter
              label="Passengers"
              counter={passengers}
              onIncrease={() => setPassengers((prev) => prev + 1)}
              onDecrease={() => setPassengers((prev) => prev - 1)}
            />
            <CustomDatePicker
              label="Date"
              startDate={startDate}
              setStartDate={(date) => setStartDate(date)}
            />
          </Column>
        </FormContainer>
        <Button
          label="Submit"
          onClick={() => goToResume()}
          isDisabled={isNotCompleted}
        />
      </>
    </Layout>
  );
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 70px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 20px;
  gap: 20px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  gap: 20px;
  @media only screen and (max-width: 600px) {
    flex-direction: row;
    justify-content: center;
  }
`;
export default SearchForm;
