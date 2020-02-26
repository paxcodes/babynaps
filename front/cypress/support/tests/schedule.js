const __ = require("../utils-schedule");

export const cycleCount = expected => {
  const actual = Cypress.vue.$store.state.cycles.length;
  expect(actual).to.be.equal(expected);
};

export const scheduleVars = expected => {
  let actual = Cypress.vue.$store.state.variables.numNaps;
  expect(actual).to.be.equal(expected.numNaps);

  actual = Cypress.vue.$store.state.variables.daytimeSleep;
  expect(actual).to.be.equal(expected.daytimeSleep);
};

export const scheduleVarsReport = expected => {
  cy.get(__.numNaps).then(numNaps => {
    const actual = __.removeWhitespace(numNaps.text());
    expect(actual).to.contain(expected.numNaps);
  });

  cy.get(__.daytimeSleep).then(daytimeSleep => {
    const actual = __.removeWhitespace(daytimeSleep.text());
    expect(actual).to.contain(expected.daytimeSleep);
  });
};

export const firstAwakeLength = expected => {
  const actual = Cypress.vue.$store.state.cycles[0].length;
  expect(actual).to.equal(expected);
};

export const cycleInfo = (index, expected) => {
  const cycle = Cypress.vue.$store.state.cycles[index];
  const actual = {
    label: cycle.label,
    time: cycle.time,
    length: cycle.length,
  };

  expect(actual).to.eql(expected);
};

export const last3Cycles = expected => {
  const actual = Cypress.vue.$store.state.cycles.slice(
    Cypress.vue.$store.state.cycles.length - 3
  );
  expect(actual).to.be.equal(expected);
};
