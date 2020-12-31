export default (minRange: number, maxRange: number) => {
  const min: number = Math.ceil(minRange);
  const max: number = Math.floor(maxRange);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
