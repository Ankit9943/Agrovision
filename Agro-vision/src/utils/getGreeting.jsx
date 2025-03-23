export const getGreeting = () => {
  const hour = new Date().getHours();
  let greeting = "Good morning 🌞";

  if (hour >= 12 && hour < 16) {
    greeting = "Good afternoon ☀️";
  } else if (hour >= 16 && hour < 20) {
    greeting = "Good evening 🌅";
  } else if (hour >= 20 || hour < 4) {
    greeting = "Good night 🌙";
  }

  return greeting;
};
