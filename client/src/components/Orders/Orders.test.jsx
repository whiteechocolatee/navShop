import { render } from "@testing-library/react";
import * as reduxHooks from "react-redux";
import { Orders } from "./Orders";

jest.mock("react-redux");

const orders = [
  {
    commentary: "",
    createdAt: "2022-08-30T13:41:49.198Z",
    customerData: {
      name: "Andrey Chorniy",
      email: "a.creatuse@gmail.com",
      surname: "Чорний",
      phone: 666616861,
    },
    deliveredAt: "2022-08-30T13:41:57.387Z",
    isDelivered: true,
    orderItems: [
      {
        count: 1,
        discount: 3,
        image:
          "https://i.pngimg.me/thumb/f/720/cf080317b43245b4ada7.jpg",
        name: "Apple iPhone 13 pro 256Gb ",
        price: 59999,
        product: "630e131d6787c4c56e4f15de",
        totalPrice: 58200,
        _id: "630e139d6787c4c56e4f161f",
      },
    ],
    paymentMethod: "cardPayment",
    shippingAddress: {
      shippingMethod: "localPickup",
      region: "Харківська",
      city: "Харків",
      department:
        "ТРК 'Клас' (Проспект Тракторобудівників, 128в) , другий поверх.",
      index: "61000",
    },
    totalPrice: 58200,
    updatedAt: "2022-08-30T13:41:57.389Z",
    user: "63035cb98578cea6c381c5de",
    __v: 0,
    _id: "630e139d6787c4c56e4f161e",
  },
  {
    commentary: "",
    createdAt: "2022-08-30T13:41:49.198Z",
    customerData: {
      name: "Andrey Chorniy",
      email: "a.creatuse@gmail.com",
      surname: "Чорний",
      phone: 666616861,
    },
    deliveredAt: "2022-08-30T13:41:57.387Z",
    isDelivered: false,
    orderItems: [
      {
        count: 1,
        discount: 3,
        image:
          "https://i.pngimg.me/thumb/f/720/cf080317b43245b4ada7.jpg",
        name: "Apple iPhone 13 pro 256Gb ",
        price: 59999,
        product: "630e131d6787c4c56e4f15de",
        totalPrice: 58200,
        _id: "630e139d6787c4c56e4f161f",
      },
    ],
    paymentMethod: "cardPayment",
    shippingAddress: {
      shippingMethod: "localPickup",
      region: "Харківська",
      city: "Харків",
      department:
        "ТРК 'Клас' (Проспект Тракторобудівників, 128в) , другий поверх.",
      index: "61000",
    },
    totalPrice: 58200,
    updatedAt: "2022-08-30T13:41:57.389Z",
    user: "63035cb98578cea6c381c5de",
    __v: 0,
    _id: "630e139d6787c4c56e4f161e",
  },
];

const mockedUseSelector = jest.spyOn(
  reduxHooks,
  "useSelector",
);

describe("Orders component", () => {
  it("should create Orders with empty orders", () => {
    mockedUseSelector.mockReturnValue([]);

    const view = render(<Orders />);

    expect(view).toMatchSnapshot();
  });

  it("should create Orders with orders data", () => {
    mockedUseSelector.mockReturnValue(orders);

    const view = render(<Orders />);

    expect(view).toMatchSnapshot();
  });
});
