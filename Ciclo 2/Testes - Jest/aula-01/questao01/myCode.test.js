const { sum } = require("./myCode");

test("sum 20+10", () => {
  expect(sum(20, 10)).toBe(30);
});

test("sum -10+10", () => {
  expect(sum(-10, 10)).toBe(0);
});
test("sum 2+2", () => {
  expect(sum(2, 2)).toBe(4);
});
