import React from "react";
import Barcode from "react-barcode";
import logo from "../src/assets/Delhivery-Logo.jpg"; // Adjust the path as necessary

export default function DeliveryReceipt() {
  return (
  <div className="w-[400px] mx-auto p-2 bg-white font-sans text-[12px] border border-black mt-5 font-bold">
      {/* Header */}
  <div className="flex justify-between items-center border-b border-black pb-1 font-bold">
        <div>
          <div className="font-bold text-[13px] leading-tight">
            YEDESHWARI LOGIC
          </div>
          <div className="font-bold text-[13px] leading-tight">
            PRIVATE LIMITED
          </div>
        </div>
        <div>
          <img src={logo} alt="Delhivery" className="h-6" />
        </div>
      </div>

      {/* Barcode */}
          <span>AGB/GGP</span>
          <span className="justify-end pincode">431007</span>
      <div className="flex justify-center items-center">
        <Barcode value="39173710003286" height={50} width={3} displayValue fontSize={22} />
      </div>
      <hr className="text-center font-bold border-black mt-2"/>

      {/* Ship To + Price box */}
  <div className="flex border-b border-black font-bold">
        {/* Left: Ship To */}
        <div className="flex-1 p-2 border-r border-black">
          <div className="font-bold">Ship To:</div>
          <div className="font-bold">CHAITANYA BHOSLE</div>
          <div className="font-bold">Mo. 9998887779</div>
          <div>Chaitanya Bhosle</div>
          <div>Maroti tempale jagadan post karmad Ta,</div>
          <div>Chatrapati sambhaji nagar</div>
          <div>Aurangabad_Cidco_D (Maharashtra)</div>
          <div className="font-bold">PIN: 431007</div>
        </div>
        {/* Right: Prepaid Box */}
        <div className="w-[120px] flex flex-col text-center">
          <div className="border-b border-black p-2 font-bold text-xs">
            Pre-paid <br /> Express
          </div>
          <div className="p-2 font-bold text-lg">INR 300</div>
        </div>
      </div>

      {/* Seller + Date */}
  <div className="flex border-b border-black text-[11px] font-bold">
        <div className="flex-1 p-2 border-r border-black">
          <div className="font-bold">
            Seller: YEDESHWARI LOGIC PRIVATE LIMITED
          </div>
          <div className="font-bold">
            Mo. 8888888888
          </div>
          <div>
            Address: Gurudatta moabile shop , behind bank of maharashtra
            Mahalunge Ingle jijai complex
          </div>
        </div>
        <div className="w-[120px] p-2 text-xs">
          <div>Date: 2025-8-15</div>
          <div>12: 9: 52</div>
        </div>
      </div>

      {/* Product Table */}
  <table className="w-full text-[11px] border-b border-black font-bold">
        <thead>
          <tr className="border-b border-black">
            <th className="text-left p-1 border-r border-black">Product(Qty)</th>
            <th className="text-right p-1 border-r border-black">Price</th>
            <th className="text-right p-1">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-black">
            <td className="p-1 border-r border-black">Police light</td>
            <td className="text-right p-1 border-r border-black">INR 150</td>
            <td className="text-right p-1">INR 150</td>
          </tr>
          <tr className="border-b border-black">
            <td className="p-1 border-r border-black">Police light</td>
            <td className="text-right p-1 border-r border-black">INR 150</td>
            <td className="text-right p-1">INR 150</td>
          </tr>
          <tr>
            <td className="p-1 border-r border-black font-bold"></td>
            <td className="text-right p-1 border-r border-black font-bold">
              Total
            </td>
            <td className="text-right p-1 font-bold">INR 300</td>
          </tr>
        </tbody>
      </table>

      {/* Bottom Barcode */}
  <div className="font-mono text-lg tracking-wider flex justify-center font-bold">
  <Barcode value="39173710003286" height={40} displayValue />
        {/* <div className="font-bold mt-1">SG2736-0020</div> */}
      </div>

      {/* Return Address */}
  <div className="p-2 text-[11px] font-bold">
        <span className="font-bold">Return Address: </span>
        Mahalunge Ingle jijai complex
      </div>
    </div>
  );
}
