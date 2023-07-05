const supertest = require("supertest");
const { app } = require("../../src/app");
const {
  generateAuthorizationHeaderForUser,
  eraseDatabase,
  createDatabaseFromSchema,
  disconnectDatabase,
} = require("../helpers");
const ordersRepo = require("../../src/repositories/orders");
const usersRepo = require("../../src/repositories/users");
const productsRepo = require("../../src/repositories/products");
const categoriesRepo = require("../../src/repositories/categories");
const orderItemsRepo = require("../../src/repositories/orderItems");
const discountCodesRepo = require("../../src/repositories/discountCodes");
const applicableCategoriesRepo = require("../../src/repositories/applicableCategories");
const {
  addOrderDiscountCodeToOrderByCode,
} = require("../../src/services/orders");

const request = supertest(app);

beforeEach(async () => {
  await eraseDatabase();
  await createDatabaseFromSchema();
});

afterAll(async () => {
  await eraseDatabase();
  await disconnectDatabase();
});

describe("GET /orders/:order_id/items", () => {
  it("should return status 401 if user token is missing", async () => {
    const response = await request.get("/orders/1/items");

    expect(response.status).toBe(401);
  });

  it("should return status 401 if user token is invalid", async () => {
    const authorization = "Bearer xxxxx";

    const response = await request
      .get("/orders/1/items")
      .set("authorization", authorization);

    expect(response.status).toBe(401);
  });

  it("should return status 400 if order_id is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .get("/orders/x/items")
      .set("authorization", authorization);

    expect(response.status).toBe(400);
  });

  it("should return status 404 if order does not exist", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .get("/orders/999/items")
      .set("authorization", authorization);

    expect(response.status).toBe(404);
  });

  it("should return status 403 if user is not owner of the order", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const user2 = await usersRepo.createUser(
      "user2",
      "user2@mail.com",
      "password2"
    );
    const order = await ordersRepo.createOrder(user1.id, false);

    const authorization = generateAuthorizationHeaderForUser(user2.id);

    const response = await request
      .get(`/orders/${order.id}/items`)
      .set("authorization", authorization);

    expect(response.status).toBe(403);
  });

  it("should return the order items and status 200 if user is the owner of the order", async () => {
    const user = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const category1 = await categoriesRepo.createCategory("category1");
    const category2 = await categoriesRepo.createCategory("category2");
    const product1 = await productsRepo.createProduct(
      "product1",
      10,
      category1.id
    );
    const product2 = await productsRepo.createProduct(
      "product2",
      20,
      category2.id
    );
    const order = await ordersRepo.createOrder(user.id, false);
    const orderItems = [
      await orderItemsRepo.createOrderItem(order.id, product1.id, 2),
      await orderItemsRepo.createOrderItem(order.id, product2.id, 4),
    ];

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
      .get(`/orders/${order.id}/items`)
      .set("authorization", authorization);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(orderItems);
  });
});

describe("PATCH /orders/:order_id/items/:product_id", () => {
  // A. Usuário não está autenticado: status 401 (unathorized)
  it("should return status 401 if user token is missing", async () => {
    const response = await request
      .patch("/orders/1/items/1")
      .send({ quantity: 1 });

    expect(response.status).toBe(401);
  });

  it("should return status 401 if user token is invalid", async () => {
    const authorization = "Anderson";
    const response = await request
      .patch("/orders/1/items/1")
      .set("authorization", authorization)
      .send({ quantity: 1 });

    expect(response.status).toBe(401);
  });

  // B. Erro de input: order_id não é um número inteiro positivo: status 400 (bad request)
  it("should return status 400 if order_id is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);
    const response = await request
      .patch("/orders/x/items/1")
      .set("authorization", authorization)
      .send({ quantity: 1 });

    expect(response.status).toBe(400);
  });

  // C. Erro de input: product_id não é um número inteiro positivo: status 400 (bad request)
  it("should return status 400 if order_id is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);
    const response = await request
      .patch("/orders/1/items/x")
      .set("authorization", authorization)
      .send({ quantity: 1 });

    expect(response.status).toBe(400);
  });

  // D. Erro de input: quantity não é um número inteiro positivo: status 400 (bad request)
  it("should return status 400 if order_id is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);
    const response = await request
      .patch("/orders/1/items/1")
      .set("authorization", authorization)
      .send({ quantity: "x" });

    expect(response.status).toBe(400);
  });

  // E. A Ordem não existe: status 404 (not found)
  // F. O produto não existe: status 404 (not found)
  it("should return status 404 if order does not exist", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);
    const response = await request
      .patch("/orders/999/items/999")
      .set("authorization", authorization)
      .send({ quantity: 1 });

    expect(response.status).toBe(404);
  });

  // G. O usuário não é o proprietário da ordem: status 403 (forbidden)
  it("should return status 403 if user is not owner of the order", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const user2 = await usersRepo.createUser(
      "user2",
      "user2@mail.com",
      "password2"
    );

    const order = await ordersRepo.createOrder(user1.id, false);

    const category = await categoriesRepo.createCategory("Utilidades");
    const product = await productsRepo.createProduct("Abajur", 10, category.id);

    const authorization = generateAuthorizationHeaderForUser(user2.id);
    const response = await request
      .patch(`/orders/${order.id}/items/${product.id}`)
      .set("authorization", authorization)
      .send({ quantity: 1 });

    expect(response.status).toBe(403);
  });

  // H. O produto não está incluso na ordem: 404 (not found)
  it("should return status 404 if user is not product of the order", async () => {
    const user = await usersRepo.createUser(
      "user",
      "user@mail.com",
      "password"
    );

    const order = await ordersRepo.createOrder(user.id, false);

    const category = await categoriesRepo.createCategory("Utilidades");
    const product = await productsRepo.createProduct("Abajur", 10, category.id);

    const authorization = generateAuthorizationHeaderForUser(user.id);
    const response = await request
      .patch(`/orders/${order.id}/items/${product.id}`)
      .set("authorization", authorization)
      .send({ quantity: 1 });

    expect(response.status).toBe(404);
  });

  // SUCESS
  it("should return the order items and status 200", async () => {
    const user = await usersRepo.createUser(
      "user",
      "user@mail.com",
      "password"
    );

    const category = await categoriesRepo.createCategory("category");
    const product = await productsRepo.createProduct(
      "product",
      10,
      category.id
    );

    const order = await ordersRepo.createOrder(user.id, false);

    await orderItemsRepo.createOrderItem(order.id, product.id, 2);

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const response = await request
      .patch(`/orders/${order.id}/items/${product.id}`)
      .set("authorization", authorization)
      .send({ quantity: 1 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      data: null,
      err: null,
    });
  });
});

describe("POST /orders/:order_id/discount-codes", () => {
  it("should return status 401 if user token is missing", async () => {
    const response = await request
      .post("/orders/1/discount-codes")
      .send({ code: "DESCONTO" });

    expect(response.status).toBe(401);
  });

  it("should return status 401 if user token is invalid", async () => {
    const authorization = "Anderson";

    const response = await request
      .post("/orders/1/discount-codes")
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    expect(response.status).toBe(401);
  });

  it("should return status 400 if order_id is invalid", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .post("/orders/x/discount-codes")
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    expect(response.status).toBe(400);
  });

  it("should return status 400 if code is not a string", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .post("/orders/1/discount-codes")
      .set("authorization", authorization)
      .send({ code: 1 });

    expect(response.status).toBe(400);
  });

  it("should return status 404 if order does not exist", async () => {
    const authorization = generateAuthorizationHeaderForUser(1);

    const response = await request
      .post("/orders/999/discount-codes")
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    expect(response.status).toBe(404);
  });

  it("should return status 403 if user is not owner of the order", async () => {
    const user1 = await usersRepo.createUser(
      "user1",
      "user1@mail.com",
      "password1"
    );
    const user2 = await usersRepo.createUser(
      "user2",
      "user2@mail.com",
      "password2"
    );

    const authorization = generateAuthorizationHeaderForUser(user2.id);

    const order = await ordersRepo.createOrder(user1.id, false);

    const category = await categoriesRepo.createCategory("categoryA");

    const product = await productsRepo.createProduct(
      "productA",
      10,
      category.id
    );

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    expect(response.status).toBe(403);
  });

  it("should return status 403 if order is closed (confirmed is true)", async () => {
    const user = await usersRepo.createUser(
      "user",
      "user@mail.com",
      "password"
    );

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const order = await ordersRepo.createOrder(user.id, true);

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    expect(response.status).toBe(403);
  });

  it("should return status 404 if no discount code exists with the given code", async () => {
    const user = await usersRepo.createUser(
      "user",
      "user@mail.com",
      "password"
    );

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const order = await ordersRepo.createOrder(user.id, false);

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    expect(response.status).toBe(404);
  });

  it("should return status 403 if the discount code is expired", async () => {
    const user = await usersRepo.createUser(
      "user",
      "user@mail.com",
      "password"
    );

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const order = await ordersRepo.createOrder(user.id, false);

    const ExpiredInsertedCode = await discountCodesRepo.createDiscountCode(
      "DESCONTO",
      "percentage",
      10,
      "2021-01-01",
      null
    );

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    expect(response.status).toBe(403);
  });

  it("should return status 403 if the total amount of the order without discounts is less than minimum where this code can be used", async () => {
    const user = await usersRepo.createUser(
      "user",
      "user@mail.com",
      "password"
    );

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const order = await ordersRepo.createOrder(user.id, false);

    const categoryA = await categoriesRepo.createCategory("categoryA");

    const productA = await productsRepo.createProduct(
      "productA",
      10,
      categoryA.id
    );

    await orderItemsRepo.createOrderItem(order.id, productA.id, 2);

    await discountCodesRepo.createDiscountCode(
      "DESCONTO",
      "percentage",
      50,
      "2050-01-01",
      100
    );

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    expect(response.status).toBe(403);
  });

  it("should return status 403 if there is no product with the corresponding category that can be used with the discount code", async () => {
    const user = await usersRepo.createUser(
      "user",
      "user@mail.com",
      "password"
    );

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const order = await ordersRepo.createOrder(user.id, false);

    const categoryA = await categoriesRepo.createCategory("categoryA");
    const categoryB = await categoriesRepo.createCategory("categoryB");

    const productA = await productsRepo.createProduct(
      "productA",
      10,
      categoryA.id
    );

    await orderItemsRepo.createOrderItem(order.id, productA.id, 2);

    const insertedDiscountCode = await discountCodesRepo.createDiscountCode(
      "DESCONTO",
      "percentage",
      50,
      "2050-01-01",
      null
    );

    await applicableCategoriesRepo.addApplicableCategory(
      insertedDiscountCode.id,
      categoryB.id
    );

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });
    expect(response.status).toBe(403);
  });

  it("should return status 403 if discount code has already been used on the same or another user order", async () => {
    const user = await usersRepo.createUser(
      "user",
      "user@mail.com",
      "password"
    );

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const order = await ordersRepo.createOrder(user.id, false);

    const categoryA = await categoriesRepo.createCategory("categoryA");
    const categoryB = await categoriesRepo.createCategory("categoryB");

    const productA = await productsRepo.createProduct(
      "productA",
      10,
      categoryA.id
    );

    await orderItemsRepo.createOrderItem(order.id, productA.id, 2);

    const insertedDiscountCode = await discountCodesRepo.createDiscountCode(
      "DESCONTO",
      "percentage",
      50,
      "2050-01-01",
      null
    );

    const response1 = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    const response2 = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    expect(response2.status).toBe(403);
  });

  it("should return status 200 and {data:null, err:null} if it was add discount code successfully in order", async () => {
    const user = await usersRepo.createUser(
      "user",
      "user@mail.com",
      "password"
    );

    const authorization = generateAuthorizationHeaderForUser(user.id);

    const order = await ordersRepo.createOrder(user.id, false);

    const categoryA = await categoriesRepo.createCategory("categoryA");

    const productA = await productsRepo.createProduct(
      "productA",
      10,
      categoryA.id
    );

    await orderItemsRepo.createOrderItem(order.id, productA.id, 2);

    await discountCodesRepo.createDiscountCode(
      "DESCONTO",
      "percentage",
      50,
      "2050-01-01",
      null
    );

    const response = await request
      .post(`/orders/${order.id}/discount-codes`)
      .set("authorization", authorization)
      .send({ code: "DESCONTO" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ data: null, err: null });
  });
});
