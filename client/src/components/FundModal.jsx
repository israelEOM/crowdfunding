import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import CustomButton from "./CustomButton";
import Loader from "./Loader";

const FundModal = ({ visible, state, onClose }) => {
  const navigate = useNavigate();

  const { donate } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [nickname, setNickname] = useState("");
  // const [currency, setCurrency] = useState("USD");

  // const currencies = [
  //   {name: 'Dollar', val: 'USD'},
  //   {name: 'Etherium', val: 'ETH'},
  // ]

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount);

    navigate("/");
    setIsLoading(false);
  };

  const handleOnClose = (e) => {
    if (e.target.id === 'container') onClose()
  }

  // const handleChangeCurrency = (e) => {
  //   setCurrency(e.target.value)
  // }

  if (!visible) return null;

  return (
    <div>
      {isLoading && <Loader />}

      <div
        id='container'
        onClick={handleOnClose} 
        className="w-full fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
      >
        <div className="flex flex-col p-4 bg-[#1c1c24] rounded-[10px] w-[350px] border-[#3a3a43] border-[1px]">
          <p className="font-epilogue font-medium text-[20px] leading-[30px] text-center text-[#808191]">
            Fund the campaign
          </p>
          <div className="mt-[30px]">
            {/* {currency === 'ETH' &&
              <p className="text-[#808191] text-[12px] text-center">You must be connected to your Metamask wallet</p>
            }
            <select
            onChange={handleChangeCurrency}
              className="w-full sm:px-[20px] p-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]" 
            >
              {currencies.map((currency) => (
                <option key={currency.val} value={currency.val} className='w-full'>{currency.name}</option>
              ))}
            </select> */}
            <input
              type="number"
              placeholder={`${state.currency ? 'USD 1' : 'ETH 0.1'}`}
              step={`${state.currency ? '1' : '0.01'}`}
              className="mt-[15px] w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <input
              type="text"
              placeholder="Nickname"
              className="mt-[15px] w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />

            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
              <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                Back it because you believe it.
              </h4>
              <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                Suppor ther project for no reward, just because it speaks to
                you.
              </p>
            </div>

            <CustomButton
              btnType="button"
              title="Fund Campaign"
              styles="w-full bg-[#8c6dfd]"
              handleClick={handleDonate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundModal;
