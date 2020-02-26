export const numNaps = "[data-cy=numNaps]";
export const daytimeSleep = "[data-cy=daytimeSleep]";
export const babyAge = "[data-cy=babyAge]";
export const removeNapLink = "[data-class=removeNapLink]";
export const addNap = "[data-cy=addNap]";
export const sleepCycle = "[data-cycle-type=asleep]";
export const timeField = "input[type=time]";
export const lengthField = "input[type=number]";

export const removeWhitespace = text => {
  return text.replace(/\s+/g, " ").trim();
};
