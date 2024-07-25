import * as React from "react";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import { styled } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DatePicker } from "@mui/x-date-pickers";
import updateLocale from "dayjs/plugin/updateLocale";

// Setting Start Day of a week to Monday
dayjs.extend(updateLocale);
dayjs.updateLocale("en", { weekStart: 1 });

dayjs.extend(isBetweenPlugin);

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== "isSelected" && prop !== "isHovered",
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: "#FFF",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: `${theme.palette.primary.main} !important`,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(day.day() === 1 && {
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%",
  }),
  ...(day.day() === 0 && {
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%",
  }),
}));

const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, "week");
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

export default function WeekPicker({ value, setValue }) {
  const [hoveredDay, setHoveredDay] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        className="text-xs"
        label='Select Date'
        onChange={(newValue) => setValue(newValue)}
        showDaysOutsideCurrentMonth
        displayWeekNumber
        slots={{ day: Day }}
        slotProps={{
          day: (ownerState) => ({
            selectedDay: value,
            hoveredDay,
            onPointerEnter: () => setHoveredDay(ownerState.day),
            onPointerLeave: () => setHoveredDay(null),
          }),
          textField: { inputProps: { className: "text-xs w-[180px] pl-1 pr-0 py-2 h-24 border-radius-0"}, 
          InputLabelProps:{className:"mt-[-7px]"} },
          
        }}
      />
    </LocalizationProvider>
  );
}
