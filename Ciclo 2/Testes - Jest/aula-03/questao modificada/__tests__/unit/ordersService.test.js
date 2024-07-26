jest.mock("../../src/repositories/orders");
jest.mock("../../src/repositories/discountCodes");
jest.mock("../../src/repositories/orderItems");
jest.mock("../../src/repositories/applicableCategories");
jest.mock("../../src/repositories/orderDiscounts");

const applicableCategoriesRepo = require("../../src/repositories/applicableCategories");
const discountCodesRepo = require("../../src/repositories/discountCodes");
const orderDiscountsRepo = require("../../src/repositories/orderDiscounts");
const orderItemsRepo = require("../../src/repositories/orderItems");
const ordersRepo = require("../../src/repositories/orders");

const ordersService = require("../../src/services/orders");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Testing service function addOrderDiscountCodeToOrderByCode", () => {
  it("Throws an error if there is no order with the given id", async () => {
    const order_id = 999;
    const code = "50OFF";
    const user_id = 1;

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(null);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        order_id,
        code,
        user_id
      );
    }).rejects.toMatchObject({
      name: "NotFoundError",
      message: `Order ${order_id} was not found`,
    });
  });

  it("Throws an error if the user changing is not the owner of the cart (order)", async () => {
    const order_id = 999;
    const code = "50OFF";
    const user_id = 1;

    const order = {
      id: 999,
      user_id: 2,
      confirmed: false,
      created_at: "2022-05-18",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(order);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        order_id,
        code,
        user_id
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `User ${user_id} does not have access to order ${order_id}`,
    });
  });

  it("Throws an error if the cart order has already been confirmed", async () => {
    const order_id = 999;
    const code = "50OFF";
    const user_id = 1;

    const order = {
      id: 999,
      user_id: 1,
      confirmed: true,
      created_at: "2022-05-18",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(order);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        order_id,
        code,
        user_id
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `Order ${order_id} is confirmed`,
    });
  });

  it("Throws an error if the specified coupon is not found", async () => {
    const order_id = 999;
    const code = "50OFF";
    const user_id = 1;

    const order = {
      id: 999,
      user_id: 1,
      confirmed: false,
      created_at: "2022-05-18",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(order);
    jest
      .mocked(discountCodesRepo.getDiscountCodeByCode)
      .mockResolvedValue(null);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        order_id,
        code,
        user_id
      );
    }).rejects.toMatchObject({
      name: "NotFoundError",
      message: `Code ${code} was not found`,
    });
  });

  it("Throws an error if the discount code has expired", async () => {
    const order_id = 999;
    const code = "50OFF";
    const user_id = 1;

    const order = {
      id: 999,
      user_id: 1,
      confirmed: false,
      created_at: "2025-01-01",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(order);

    jest.mocked(discountCodesRepo.getDiscountCodeByCode).mockResolvedValue({
      id: 1,
      code: "50OFF",
      value: 50,
      type: "percentage",
      expiration_date: "2024-01-01",
      minimum_order_value: 100,
    });

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        order_id,
        code,
        user_id
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `Discount code ${code} is expired`,
    });
  });

  it("Throws an error if the cart value is less than the discount code", async () => {
    const order_id = 999;
    const code = "50OFF";
    const user_id = 1;

    const order = {
      id: 999,
      user_id: 1,
      confirmed: false,
      created_at: "2022-01-01",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(order);

    jest.mocked(discountCodesRepo.getDiscountCodeByCode).mockResolvedValue({
      id: 1,
      code: "50OFF",
      value: 50,
      type: "percentage",
      expiration_date: "2024-01-01",
      minimum_order_value: 100,
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockResolvedValue([
        {
          order_id: 999,
          product_id: 1,
          quantity: 2,
          product_name: "Abajur",
          product_price: 10,
          product_category_id: 99,
        },
      ]);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        order_id,
        code,
        user_id
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `The total amount of the order (disregarding any discounts) is less than the minimum amount where ${code} can be used`,
    });
  });

  it("Throws an error if the coupon is not valid for that category", async () => {
    const order_id = 999;
    const code = "50OFF";
    const user_id = 1;

    const order = {
      id: 999,
      user_id: 1,
      confirmed: false,
      created_at: "2022-01-01",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(order);

    jest.mocked(discountCodesRepo.getDiscountCodeByCode).mockResolvedValue({
      id: 1,
      code: "50OFF",
      value: 50,
      type: "percentage",
      expiration_date: "2024-01-01",
      minimum_order_value: 100,
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockResolvedValue([
        {
          order_id: 999,
          product_id: 1,
          quantity: 2,
          product_name: "Abajur",
          product_price: 100,
          product_category_id: 99,
        },
      ]);

    jest
      .mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId)
      .mockResolvedValue([{ id: 98, name: "Objetos" }]);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        order_id,
        code,
        user_id
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `The discount code ${code} cannot be used as it is specific to some product categories, but no products in the order belong to any of these categories`,
    });
  });

  it("Throws an error if the user has already used the discount code", async () => {
    const order_id = 999;
    const code = "50OFF";
    const user_id = 1;

    const order = {
      id: 999,
      user_id: 1,
      confirmed: false,
      created_at: "2022-01-01",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(order);

    jest.mocked(discountCodesRepo.getDiscountCodeByCode).mockResolvedValue({
      id: 1,
      code: "50OFF",
      value: 50,
      type: "percentage",
      expiration_date: "2024-01-01",
      minimum_order_value: 100,
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockResolvedValue([
        {
          order_id: 999,
          product_id: 1,
          quantity: 2,
          product_name: "Abajur",
          product_price: 100,
          product_category_id: 99,
        },
      ]);

    jest
      .mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId)
      .mockResolvedValue([{ id: 99, name: "Objetos" }]);

    jest
      .mocked(orderDiscountsRepo.getOrderDiscountCodesByUserId)
      .mockResolvedValue([
        {
          id: 1,
          code: "50OFF",
          value: 50,
          type: "percentage",
          expiration_date: "2024-01-01",
          minimum_order_value: 100,
        },
      ]);

    await expect(() => {
      return ordersService.addOrderDiscountCodeToOrderByCode(
        order_id,
        code,
        user_id
      );
    }).rejects.toMatchObject({
      name: "ForbiddenError",
      message: `Discount code ${code} has been used by the user`,
    });
  });
});

describe("Success", () => {
  it("Perfect system operation", async () => {
    const order_id = 999;
    const code = "50OFF";
    const user_id = 1;
    const discountCodeId = 1;

    const order = {
      id: 999,
      user_id: 1,
      confirmed: false,
      created_at: "2022-01-01",
    };

    jest.mocked(ordersRepo.getOrderById).mockResolvedValue(order);

    jest.mocked(discountCodesRepo.getDiscountCodeByCode).mockResolvedValue({
      id: discountCodeId,
      code: "50OFF",
      value: 50,
      type: "percentage",
      expiration_date: "2024-01-01",
      minimum_order_value: 100,
    });

    jest
      .mocked(orderItemsRepo.getOrderItemsWithProductInformationByOrderId)
      .mockResolvedValue([
        {
          order_id: 999,
          product_id: 1,
          quantity: 2,
          product_name: "Abajur",
          product_price: 100,
          product_category_id: 99,
        },
      ]);

    jest
      .mocked(applicableCategoriesRepo.getApplicableCategoriesByDiscountCodeId)
      .mockResolvedValue([{ id: 99, name: "Objetos" }]);

    jest
      .mocked(orderDiscountsRepo.getOrderDiscountCodesByUserId)
      .mockResolvedValue([]);

    jest.mocked(orderDiscountsRepo.addDiscountCodeToOrder);

    await ordersService.addOrderDiscountCodeToOrderByCode(
      order_id,
      code,
      user_id
    );

    expect(
      jest.mocked(orderDiscountsRepo.addDiscountCodeToOrder)
    ).toBeCalledTimes(1);

    expect(
      jest.mocked(orderDiscountsRepo.addDiscountCodeToOrder)
    ).toBeCalledWith(order_id, discountCodeId);
  });
});
