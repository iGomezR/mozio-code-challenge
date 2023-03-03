import LeftArrow from "components/Icons/LeftArrow";
import RightArrow from "components/Icons/RightArrow";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./CustomStyle.css";

import styled from "styled-components";
import { IconContainer } from "styles/sharedType";
import { palette } from "utils/palette";

type ICustomDatePicker = {
  startDate: Date | string;
  setStartDate: Function;
  label?: string;
};
type ICalendar = {
    date: Date;
    changeYear: Function;
    changeMonth: Function;
    decreaseMonth: Function;
    increaseMonth: Function;
    prevMonthButtonDisabled: boolean;
    nextMonthButtonDisabled: boolean;
}
const CustomDatePicker = ({ label, startDate, setStartDate }: ICustomDatePicker) => {
  const YEARS = Array.from({ length: 10 }).map(
    (val, indx) => new Date().getFullYear() + indx
  );
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const getCustomHeader = ({
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
  }: ICalendar) => {
    return (
      <HeaderContainer>
        <IconContainer
          onClick={() => decreaseMonth()}
        >
          <LeftArrow />
        </IconContainer>
        <div>
          <SelectStyle
            value={MONTHS[new Date(date).getMonth()]}
            onChange={({ target: { value } }) =>
              changeMonth(MONTHS.indexOf(value))
            }
          >
            {MONTHS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectStyle>
          <SelectStyle
            value={new Date(date).getFullYear()}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {YEARS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </SelectStyle>
        </div>
        <IconContainer
          onClick={() => increaseMonth()}
        >
          <RightArrow />
        </IconContainer>
      </HeaderContainer>
    );
  };

  return (
    <Container>
     <Title>{label}</Title>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        minDate={new Date()}
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }: ICalendar) =>
          getCustomHeader({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          })
        }
        selected={new Date(startDate) || new Date()}
        onChange={(date) => setStartDate(date)}
      />
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.label`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0em;
`;

const HeaderContainer = styled.div`
  margin: 10;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const SelectStyle = styled.select`
  background: ${palette.PurpleLight};
  border: 1px solid ${palette.PurpleLight};
  border-radius: 4px;
  height: 22px;
`;
export default CustomDatePicker;
