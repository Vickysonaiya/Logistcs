import React from 'react';

export default function Invoice() {
  const invoiceData = {
    invoiceNo: '12345',
    invoiceDate: '12/02/2025',
    shippingPartner: 'Delivery surface',
    paymentMethod: 'COD',
    destination: {
      fullName: '',
      address: '(city state pin code)',
      mobile: '',
      gst: ''
    },
    seller: {
      fullName: '',
      address: '(city state pin code)',
      mobile: '',
      gst: ''
    },
    items: [
      { sNo: 1, productName: 'Mobile', qty: 1, price: 1500, cgst: '09.0%', sgst: '09.0%', total: 1770 },
      { sNo: 2, productName: 'Sim card', qty: 2, price: 100, cgst: '09.0%', sgst: '09.0%', total: 236 },
      { sNo: 3, productName: 'Headphone', qty: 3, price: 300, cgst: '09.0%', sgst: '09.0%', total: 1062 },
      { sNo: 4, productName: 'charger', qty: 5, price: 90, cgst: '09.0%', sgst: '09.0%', total: 549.05 }
    ],
    grandTotal: 3558.05,
    awbNo: 'TD105470185'
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="border-2 border-black p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-16 h-10 bg-red-600 text-white flex items-center justify-center rounded font-bold text-lg mr-2">
              D
            </div>
            <div className="text-xl font-bold">D@LIYUKAM</div>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-widest">INVOICE</h1>
          </div>
          
          <div className="border border-black p-3 text-xs w-64">
            <div className="mb-1"><strong>Invoice No:</strong> {invoiceData.invoiceNo}</div>
            <div className="mb-1"><strong>Invoice Date:</strong> {invoiceData.invoiceDate}</div>
            <div className="mb-1"><strong>Shipping partner name:</strong> {invoiceData.shippingPartner}</div>
            <div><strong>PAYMENT METHOD:</strong> {invoiceData.paymentMethod}</div>
          </div>
        </div>

        <hr className="border-2 border-black mb-4" />

        {/* Destination and Seller Details */}
        <div className="grid grid-cols-2 gap-8 mb-4">
          <div>
            <h3 className="font-bold text-lg mb-2">Destination details TO :</h3>
            <div className="text-sm space-y-1">
              <div>Full Name: {invoiceData.destination.fullName}</div>
              <div>Address: {invoiceData.destination.address}</div>
              <div>Mobile No.: {invoiceData.destination.mobile}</div>
              <div>GST NO. {invoiceData.destination.gst}</div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2">Seller details TO:</h3>
            <div className="text-sm space-y-1">
              <div>Full Name: {invoiceData.seller.fullName}</div>
              <div>Address: {invoiceData.seller.address}</div>
              <div>Mobile No.: {invoiceData.seller.mobile}</div>
              <div>GST NO. {invoiceData.seller.gst}</div>
            </div>
          </div>
        </div>

        <hr className="border border-black mb-4" />

        {/* Items Table */}
        <div className="mb-4">
          <table className="w-full border-2 border-black border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-black p-2 text-left font-bold">S.No</th>
                <th className="border border-black p-2 text-left font-bold">Product name</th>
                <th className="border border-black p-2 text-left font-bold">QTY. (PCS)</th>
                <th className="border border-black p-2 text-left font-bold">Price</th>
                <th className="border border-black p-2 text-left font-bold">Cgst</th>
                <th className="border border-black p-2 text-left font-bold">Sgst</th>
                <th className="border border-black p-2 text-left font-bold">total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item) => (
                <tr key={item.sNo}>
                  <td className="border border-black p-2">{item.sNo}</td>
                  <td className="border border-black p-2">{item.productName}</td>
                  <td className="border border-black p-2">{item.qty}</td>
                  <td className="border border-black p-2">{item.price}</td>
                  <td className="border border-black p-2">{item.cgst}</td>
                  <td className="border border-black p-2">{item.sgst}</td>
                  <td className="border border-black p-2">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Section */}
        <div className="flex mb-2">
          <div className="bg-red-600 text-white p-2 font-bold text-center w-48">
            Grand total
          </div>
          <div className="bg-green-500 text-white p-2 font-bold text-center w-48">
            {invoiceData.grandTotal}
          </div>
        </div>

        <div className="flex mb-4">
          <div className="bg-yellow-400 text-black p-2 font-bold text-center w-48">
            COD
          </div>
          <div className="bg-green-500 text-white p-2 font-bold text-center w-48">
            {invoiceData.grandTotal}
          </div>
        </div>

        <div className="text-center mb-4">
          <strong>AWB No:</strong> {invoiceData.awbNo}
        </div>

        {/* Payment Details */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Payment detail</h3>
            
            <div className="border border-gray-300 p-4 w-48">
              <div className="text-center font-bold mb-2">SCAN & PAY</div>
              <div className="w-32 h-32 bg-gray-100 border border-gray-300 flex items-center justify-center text-xs mx-auto">
                <div className="text-center">
                  QR Code<br />
                  Pattern<br />
                  (Image placeholder)
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="border border-gray-300 p-4">
              <div className="font-bold text-center mb-3 border border-gray-300 p-2">
                Invoice Pending Amount
              </div>
              
              <div className="text-xs">
                <div className="font-bold mb-2">Note:-</div>
                <div className="mb-2 leading-tight">
                  1. This invoice is self-generated by the seller for transportation purposes only. The company holds no responsibility or connection with it.
                </div>
                <div className="leading-tight">
                  2. Whether tax is payable under reverse charge: No
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}