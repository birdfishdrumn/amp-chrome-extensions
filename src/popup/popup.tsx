import "../styles/tailwind.css";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./popup.css";
import axios from "axios";
import { Spacer } from "../components/Spacer";

const Spinner: React.FC = () => {
  return (
    <div className='flex justify-center items-center'>
      <span className='animate-spin rounded-full h-3 w-3 border-t-4 border-blue-500'></span>
    </div>
  );
};

const App: React.FC<{}> = () => {
  const [tabURL, setTabURL] = useState("");
  const [cartAttributes, setCartAttributes] = useState<any>();
  const [shop, setShop] = useState(null);
  const [resetRes, setResetRes] = useState("");
  const [getAttributesLoading, setGetAttributesLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const url = tabs[0].url; // ←これ
    const newUrl = new URL(url);
    setTabURL(newUrl?.origin);
  });

  const sendRequest = async () => {
    try {
      setGetAttributesLoading(true);
      const res = await fetch(`${tabURL}/cart.js`);
      const data = await res.json();
      setCartAttributes(data);
      console.log({ data });
    } catch (e) {
      console.log(e);
    } finally {
      setGetAttributesLoading(false);
    }
  };

  const resetCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${tabURL}/cart.js`, {
        attributes: {
          配送日の指定: "なし",
          配送希望日: "",
          配送時間帯: "指定なし",
          置き配の利用: "",
          delivery_date: "",
          delivery_time: "",
          openlogi_delivery_date: "",
          openlogi_delivery_time_slot: "",
        },
      });
      const data = await res.data();
      console.log("cartReser", data);
      setCartAttributes(null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getShop = async () => {
    const res = await axios.get(`${tabURL}/apps/andd-delivery-datetime/shop`);
    const data = await JSON.parse(res.data.replace(/(&quot\;)/g, '"'));
    console.log("shop", data);
    setShop(data);
  };
  // "/apps/andd-delivery-datetime/shop";
  console.log({ cartAttributes });

  return (
    <div className='p-2'>
      <div className='flex items-center'>
        <span className='text-gray-700'>URL</span>：
        <input value={tabURL} readOnly className='p-1 bg-gray-200 w-[100%]' />
      </div>
      <button
        className='bg-sky-300 px-2 py-1 rounded-xl mt-4 w-32 hover:opacity-50'
        onClick={() => sendRequest()}
      >
        {getAttributesLoading ? <Spinner /> : "GET Cart Attributes"}
      </button>
      <Spacer horizontal size={10} />
      <button className='bg-sky-300 px-2 py-1 rounded-xl mt-2 hover:opacity-50' onClick={() => getShop()}>
        GET Shop Information
      </button>
      <Spacer size={20} />
      {/* //@ts-ignore */}
      {/* <p>shop {shop?.delivery_time_label}</p> */}
      <Spacer size={10} />
      <h3 className='font-bold text-lg'>Result</h3>
      <div className='flex items-center'>
        <p className='basis-44'>配送希望日 </p>
        <input
          className='p-1 bg-gray-200  w-[100%]'
          value={cartAttributes?.attributes["配送希望日"]}
          readOnly
        />
      </div>
      <Spacer size={10} />
      <div className='flex items-center'>
        <p className='basis-44'>配送日 </p>
        <input className='p-1 bg-gray-200  w-[100%]' value={cartAttributes?.attributes["配送日"]} readOnly />
      </div>

      <Spacer size={10} />
      <div className='flex items-center'>
        <p className='basis-44'>配送時間帯 </p>
        <input
          className='p-1 bg-gray-200  w-[100%]'
          value={cartAttributes?.attributes["配送時間帯"]}
          readOnly
        />
      </div>

      <Spacer size={20} />
      <button
        className='bg-red-300 px-2 py-1 rounded-xl mt-4 w-32 hover:opacity-50'
        onClick={() => resetCart()}
      >
        {isLoading ? "loading" : "reset Attributes"}
      </button>
      <Spacer size={20} />
    </div>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);

type ISPOSITIVE = (num: number) => boolean;
