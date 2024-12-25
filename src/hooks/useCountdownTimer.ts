import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const useCountdownTimer = (isProcessing: boolean, initialTime: number, onExpire: () => void) => {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    if (!isProcessing || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (timer === 0) {
      onExpire();
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isProcessing, timer, onExpire]);

  return timer;
};

export default useCountdownTimer;
