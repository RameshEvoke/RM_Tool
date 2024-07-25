import { useState, useEffect, useRef } from 'react';

const UserIdleTimer = (timeout, onIdle) => {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleUserActivity = () => {
      setIsIdle(false);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIsIdle(true);
        onIdle();
      }, timeout);
    };

    const events = ['mousemove', 'keydown', 'scroll', 'click'];

    events.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });

    // Start the timer initially
    handleUserActivity();

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
      clearTimeout(timerRef.current);
    };
  }, [timeout, onIdle]);

  return isIdle;
};

export default UserIdleTimer;
