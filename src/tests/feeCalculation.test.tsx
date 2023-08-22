import { describe, it, expect } from "vitest";
import {
  calculateSmallOrderSurcharge,
  calculateDeliveryFeeByDistance,
  calculateDeliveryFee,
  calculateBulkFee,
} from "../services/feeCalculationService";

const MAX_DISTANCE = 10000;

describe("Small Order Surcharge", () => {
  it(">=10€ => 0€ surcharge", () => {
    expect(calculateSmallOrderSurcharge(10)).toBe(0);
  });

  it("<=10€ => (10 - cart value)€ surcharge", () => {
    expect(calculateSmallOrderSurcharge(8)).toBe(2);
    expect(calculateSmallOrderSurcharge(6)).toBe(4);
  });
});

describe("Fee by Distance", () => {
  it("<1000m => 2€ fee", () => {
    expect(calculateDeliveryFeeByDistance(1000)).toBe(2);
  });

  it("1499m => 3€ fee", () => {
    expect(calculateDeliveryFeeByDistance(1499)).toBe(3);
  });

  it("1500m => 3€ fee", () => {
    expect(calculateDeliveryFeeByDistance(1500)).toBe(3);
  });

  it("1501m => 4€ fee", () => {
    expect(calculateDeliveryFeeByDistance(1501)).toBe(4);
  });
});

describe("Fee by item count", () => {
  it("If the number of items is 4, no extra surcharge", () => {
    expect(calculateBulkFee(4)).toBe(0);
  });
  it("If the number of items is 5, 50 cents surcharge is added", () => {
    expect(calculateBulkFee(5)).toBe(0.5);
  });
  it("If the number of items is 10, 3€ surcharge (6 x 50 cents) is added", () => {
    expect(calculateBulkFee(10)).toBe(3);
  });
  it("If the number of items is 13, 5,70€ surcharge is added ((9 * 50 cents) + 1,20€)", () => {
    expect(calculateBulkFee(13)).toBe(5.7);
  });
});

describe("Delivery Fee", () => {
  it("Negative or invalid inputs should return 0", () => {
    expect(calculateDeliveryFee(0, 0, 0)).toBe(0);
    expect(calculateDeliveryFee(-1, -1, -1)).toBe(0);
  });

  it("1000m, no surcharge => 2€", () => {
    expect(calculateDeliveryFee(1000, 10, 1)).toBe(2);
  });

  it("Max fee always 15€", () => {
    expect(calculateDeliveryFee(MAX_DISTANCE, 10, 1)).toBe(15);
  });

  it(">=100€ cart => 0€ fee", () => {
    const distance = 1;
    expect(calculateDeliveryFee(distance, 100, 1)).toBe(0);
    expect(calculateDeliveryFee(distance, 101, 1)).toBe(0);
    expect(calculateDeliveryFee(distance, 99, 1)).not.toBe(0);
  });

  it("Rush hour 1.2x fee (max 15€)", () => {
    expect(calculateDeliveryFee(MAX_DISTANCE, 10, 1, true)).toBe(15);
    expect(calculateDeliveryFee(1000, 100, 1, true)).toBe(0);
    expect(calculateDeliveryFee(1000, 10, 1, true)).toBe(2.4);
  });
});
