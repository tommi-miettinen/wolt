import { useEffect, useState } from "react";
import DateTime from "react-datetime";
import { calculateDeliveryFee } from "./services/feeCalculationService";
import woltlogo from "./assets/woltlogo.svg";
import NumberInput from "./components/NumberInput";

const App = () => {
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [cartValue, setCartValue] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [deliveryItemCount, setDeliveryItemCount] = useState(0);
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    const deliveryFee = calculateDeliveryFee(deliveryDistance, cartValue, deliveryItemCount);
    setDeliveryFee(deliveryFee);
  }, [cartValue, deliveryDistance, deliveryItemCount, date]);

  return (
    <div className="text-base w-screen h-screen bg-purple-50 flex flex-col items-center overflow-hidden">
      <div className="bg-white p-4 h-[80px] w-full flex items-center justify-center">
        <div className="w-[1200px]">
          <img src={woltlogo} className="h-[36px] w-[120px]" />
        </div>
      </div>
      <div className="w-full mt-8 sm:m-auto sm:w-[600px] p-1 flex flex-col gap-8">
        <h1 className="font-omnes-bold text-3xl sm:text-4xl">Calculate cost of delivery</h1>
        <div className="font-semibold w-full p-4 py-8 sm:p-8 flex flex-col gap-4 rounded-xl bg-white shadow-xl">
          <div className="flex flex-col gap-1">
            <label htmlFor="cart-value">Cart Value</label>
            <NumberInput
              id="cart-value"
              className="border-black border-2 p-2 rounded-lg"
              value={cartValue}
              onChange={(value) => setCartValue(value)}
            ></NumberInput>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="item-count">Item count</label>
            <NumberInput
              id="item-count"
              className="border-black/80  border-2 p-2 rounded-lg"
              value={deliveryItemCount}
              onChange={(value) => setDeliveryItemCount(value)}
            ></NumberInput>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="distance">Distance</label>
            <NumberInput
              id="distance"
              className="border-black  border-2 p-2 rounded-lg"
              value={deliveryDistance}
              onChange={(value) => setDeliveryDistance(value)}
            ></NumberInput>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="date">Date</label>
            <DateTime
              inputProps={{ id: "date", className: "border-black border-2 p-2 w-min rounded-lg" }}
              value={date}
              locale="fi"
              utc
              //@ts-ignore
              onChange={(e: moment.Moment) => setDate(e.format())}
            />
          </div>
          <h3 className="mt-4">
            Cost of delivery <span className="font-semibold ">{deliveryFee.toFixed(2)}€</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default App;
