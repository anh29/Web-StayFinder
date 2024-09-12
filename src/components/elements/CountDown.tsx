import { Box, Text } from "@chakra-ui/react";
import moment from "moment-timezone";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 120,
  strokeWidth: 6,
};

const renderTime = (dimension: string, time: number) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Text as="span" fontSize="1rem">
        {time}
      </Text>
      <Text as="span" fontSize="1rem">
        {dimension}
      </Text>
    </Box>
  );
};

const getTimeSeconds = (time: number) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: number) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: number) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: number) => (time / daySeconds) | 0;

export default function CountDown() {
  const startTime = moment().unix(); // use UNIX timestamp in seconds
  const endTime = moment.tz("2024-07-30", "YYYY-MM-DD", "Asia/Ho_Chi_Minh").unix(); // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  console.log(daysDuration);

  return (
    <Box display="flex" flexDirection={{ base: "column", md: "row" }} alignItems="center" gap="2rem">
      <CountdownCircleTimer {...timerProps} colors="#4285F4" duration={daysDuration} initialRemainingTime={remainingTime}>
        {({ elapsedTime, color }) => <Box>{renderTime("days", getTimeDays(daysDuration - elapsedTime))}</Box>}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#DB4437"
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > hourSeconds,
        })}
      >
        {({ elapsedTime, color }) => <Box>{renderTime("hours", getTimeHours(daySeconds - elapsedTime))}</Box>}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#0F9D58"
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > minuteSeconds,
        })}
      >
        {({ elapsedTime, color }) => <Box>{renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))}</Box>}
      </CountdownCircleTimer>
      <CountdownCircleTimer
        {...timerProps}
        colors="#F4B400"
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => ({
          shouldRepeat: remainingTime - totalElapsedTime > 0,
        })}
      >
        {({ elapsedTime, color }) => <Box>{renderTime("seconds", getTimeSeconds(elapsedTime))}</Box>}
      </CountdownCircleTimer>
    </Box>
  );
}
