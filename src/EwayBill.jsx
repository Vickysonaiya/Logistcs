import React, { useState } from 'react';
import Barcode from "react-barcode";

export default function ShippingForm() {
  const [formData, setFormData] = useState({
    date: '2024-12-28',
    awbNumber: '52284414',
    dailyUdaan: 'Daily Udaan',
    from: '1',
    to: '4',
    dropOff: false,
    selfCollect: false,
    shipperName: 'Vichitpanth',
    shipperPhone: '2147483647',
    recipientName: 'Maul',
    recipientPhone: '2147483647',
    shipperCity: 'Goa',
    shipperState: 'Goa, Maharashtra',
    shipperPincode: '431122',
    recipientCity: 'Goa',
    recipientState: 'Goa, Maharashtra',
    recipientPincode: '431122',
    shipperStreet: 'Vishwanath Mobile Shop, Beed Road, Nathpur',
    recipientStreet: 'Jadhav Nagar',
    shipperGst: '',
    recipientGst: '',
    shipmentInfo: '',
    clientAddressCode: '',
    supplierRef: '',
    fragile: false,
    heavyOrBig: false,
    cod: false,
    specialHandling: false,
    invoiceNo: '',
    ewbn: '',
    lrNumber: '52284414',
    consignee: 'Daily Udaan',
    paymentMode: 'Prepaid',
    codAmount: '0',
    consigneeOnDelivery: false,
    chequeAmount: '4371.94',
    paymentCharges: '4371.94',
    collectiveAmount: '0',
    stationaryCharges: '',
    handlingCharges: '',
    whatsappCharges: '0',
    grandTotal: '4371.94',
    boxDimension: '16.00*20.00*15.00',
    description: 'mob',
    totalWeight: '20.00 Kgs',
    totalBoxes: '2',
    documentReceived: false,
    taxForms: false,
    others: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 bg-white">
      <div className="border border-black">
        {/* Header */}
        <div className="bg-orange-100 p-2 border-b border-black">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-orange-600 font-bold text-lg">DEILYUDAAN</div>
              <div className="text-orange-600">Ewaybill</div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-xs">Date: {formData.date}</div>
                </div>
                <div>
                  <div className="font-bold">{formData.awbNumber}</div>
                  <div className="text-xs">{formData.dailyUdaan}</div>
                </div>
                <div className="font-mono text-xs">
                  <Barcode value="39173710003286" height={40} displayValue />
                  <div>39173710003286</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* From/To Section */}
        <div className="flex border-b border-black">
          <div className="w-1/6 p-2 border-r border-black">
            <div className="text-xs mb-1">From</div>
            <input 
              type="text" 
              value={formData.from}
              onChange={(e) => handleInputChange('from', e.target.value)}
              className="w-full p-1 border border-gray-300 text-center"
            />
          </div>
          <div className="w-1/6 p-2 border-r border-black">
            <div className="text-xs mb-1">To</div>
            <input 
              type="text" 
              value={formData.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              className="w-full p-1 border border-gray-300 text-center"
            />
          </div>
          <div className="flex-1 p-2 border-r border-black">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-1 text-xs">
                <input 
                  type="checkbox" 
                  checked={formData.dropOff}
                  onChange={() => handleCheckboxChange('dropOff')}
                />
                Drop Off
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input 
                  type="checkbox" 
                  checked={formData.selfCollect}
                  onChange={() => handleCheckboxChange('selfCollect')}
                />
                Self Collect
              </label>
            </div>
          </div>
        </div>

        {/* Shipper and Recipient Details */}
        <div className="grid grid-cols-2">
          {/* Shipper Details */}
          <div className="border-r border-black">
            <div className="p-2 border-b border-black bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">Shipper's Name:</span>
                <input 
                  type="text" 
                  value={formData.shipperName}
                  onChange={(e) => handleInputChange('shipperName', e.target.value)}
                  className="flex-1 p-1 text-xs border border-gray-300"
                />
              </div>
            </div>
            
            <div className="p-2 border-b border-black">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold">Shipper's Phone:</span>
                <input 
                  type="text" 
                  value={formData.shipperPhone}
                  onChange={(e) => handleInputChange('shipperPhone', e.target.value)}
                  className="flex-1 p-1 text-xs border border-gray-300"
                />
              </div>
            </div>

            <div className="p-2 border-b border-black">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="font-semibold">City:</span>
                  <input 
                    type="text" 
                    value={formData.shipperCity}
                    onChange={(e) => handleInputChange('shipperCity', e.target.value)}
                    className="w-full p-1 border border-gray-300 mt-1"
                  />
                </div>
                <div>
                  <span className="font-semibold">State:</span>
                  <input 
                    type="text" 
                    value={formData.shipperState}
                    onChange={(e) => handleInputChange('shipperState', e.target.value)}
                    className="w-full p-1 border border-gray-300 mt-1"
                  />
                </div>
                <div>
                  <span className="font-semibold">Pincode:</span>
                  <input 
                    type="text" 
                    value={formData.shipperPincode}
                    onChange={(e) => handleInputChange('shipperPincode', e.target.value)}
                    className="w-full p-1 border border-gray-300 mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="p-2 border-b border-black">
              <span className="text-xs font-semibold">Street Name:</span>
              <input 
                type="text" 
                value={formData.shipperStreet}
                onChange={(e) => handleInputChange('shipperStreet', e.target.value)}
                className="w-full p-1 text-xs border border-gray-300 mt-1"
              />
            </div>

            <div className="p-2">
              <span className="text-xs font-semibold">GST NO:</span>
              <input 
                type="text" 
                value={formData.shipperGst}
                onChange={(e) => handleInputChange('shipperGst', e.target.value)}
                className="w-full p-1 text-xs border border-gray-300 mt-1"
              />
            </div>
          </div>

          {/* Recipient Details */}
          <div>
            <div className="p-2 border-b border-black bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">Recipient's Name:</span>
                <input 
                  type="text" 
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange('recipientName', e.target.value)}
                  className="flex-1 p-1 text-xs border border-gray-300"
                />
              </div>
            </div>
            
            <div className="p-2 border-b border-black">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold">Recipient's Phone:</span>
                <input 
                  type="text" 
                  value={formData.recipientPhone}
                  onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                  className="flex-1 p-1 text-xs border border-gray-300"
                />
              </div>
            </div>

            <div className="p-2 border-b border-black">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="font-semibold">City:</span>
                  <input 
                    type="text" 
                    value={formData.recipientCity}
                    onChange={(e) => handleInputChange('recipientCity', e.target.value)}
                    className="w-full p-1 border border-gray-300 mt-1"
                  />
                </div>
                <div>
                  <span className="font-semibold">State:</span>
                  <input 
                    type="text" 
                    value={formData.recipientState}
                    onChange={(e) => handleInputChange('recipientState', e.target.value)}
                    className="w-full p-1 border border-gray-300 mt-1"
                  />
                </div>
                <div>
                  <span className="font-semibold">Pincode:</span>
                  <input 
                    type="text" 
                    value={formData.recipientPincode}
                    onChange={(e) => handleInputChange('recipientPincode', e.target.value)}
                    className="w-full p-1 border border-gray-300 mt-1"
                  />
                </div>
              </div>
            </div>

            <div className="p-2 border-b border-black">
              <span className="text-xs font-semibold">Street Name:</span>
              <input 
                type="text" 
                value={formData.recipientStreet}
                onChange={(e) => handleInputChange('recipientStreet', e.target.value)}
                className="w-full p-1 text-xs border border-gray-300 mt-1"
              />
            </div>

            <div className="p-2">
              <span className="text-xs font-semibold">GST NO:</span>
              <input 
                type="text" 
                value={formData.recipientGst}
                onChange={(e) => handleInputChange('recipientGst', e.target.value)}
                className="w-full p-1 text-xs border border-gray-300 mt-1"
              />
            </div>
          </div>
        </div>

        {/* Shipment Information */}
        <div className="border-t border-black p-2">
          <span className="text-xs font-semibold">Shipment Information</span>
          <textarea 
            value={formData.shipmentInfo}
            onChange={(e) => handleInputChange('shipmentInfo', e.target.value)}
            className="w-full p-1 text-xs border border-gray-300 mt-1 h-8"
          />
        </div>

        {/* Reference and Special Handling */}
        <div className="grid grid-cols-2 border-t border-black">
          <div className="p-2 border-r border-black">
            <div className="text-xs font-semibold mb-2">SHIPPER'S REFERENCE NO (25 characters):</div>
            <input 
              type="text" 
              value={formData.supplierRef}
              onChange={(e) => handleInputChange('supplierRef', e.target.value)}
              className="w-full p-1 text-xs border border-gray-300"
            />
            <div className="mt-2">
              <div className="text-xs">SMQTI:</div>
              <div className="text-xs">Air Full</div>
              <label className="flex items-center gap-1 text-xs mt-1">
                <input type="checkbox" />
                Ground
              </label>
            </div>
          </div>
          <div className="p-2">
            <div className="text-xs font-semibold mb-2">SPECIAL HANDLING:</div>
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-xs">
                <input 
                  type="checkbox" 
                  checked={formData.fragile}
                  onChange={() => handleCheckboxChange('fragile')}
                />
                FRAGILE
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input 
                  type="checkbox" 
                  checked={formData.heavyOrBig}
                  onChange={() => handleCheckboxChange('heavyOrBig')}
                />
                HEAVY OR BIG
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input 
                  type="checkbox" 
                  checked={formData.cod}
                  onChange={() => handleCheckboxChange('cod')}
                />
                COD
              </label>
            </div>
          </div>
        </div>

        {/* Invoice and Payment Details */}
        <div className="border-t border-black">
          <div className="grid grid-cols-4 text-xs">
            <div className="p-2 border-r border-black">
              <div className="font-semibold">Invoice No:</div>
              <input 
                type="text" 
                value={formData.invoiceNo}
                onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
                className="w-full p-1 border border-gray-300 mt-1"
              />
            </div>
            <div className="p-2 border-r border-black">
              <div className="font-semibold">EWBN:</div>
              <input 
                type="text" 
                value={formData.ewbn}
                onChange={(e) => handleInputChange('ewbn', e.target.value)}
                className="w-full p-1 border border-gray-300 mt-1"
              />
            </div>
            <div className="p-2 border-r border-black">
              <div>Note: If the product value/invoice is damaged or lost, the amount will not exceed</div>
            </div>
            <div className="p-2">
              <div>4</div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="border-t border-black">
          <div className="grid grid-cols-2">
            <div className="p-2 border-r border-black">
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold">TOTAL INVOICE VALUE:</span>
                  <div className="mt-1">0</div>
                </div>
                <div>
                  <span className="font-semibold">LR Number:</span>
                  <div>{formData.lrNumber}</div>
                </div>
                <div>
                  <span className="font-semibold">Consignee:</span>
                  <div>{formData.consignee}</div>
                </div>
              </div>
            </div>
            <div className="p-2">
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold">Payment Mode:</span>
                  <div>{formData.paymentMode}</div>
                </div>
                <div>
                  <span className="font-semibold">COD Amount:</span>
                  <div>{formData.codAmount}</div>
                </div>
                <div className="flex items-center gap-1">
                  <input 
                    type="checkbox" 
                    checked={formData.consigneeOnDelivery}
                    onChange={() => handleCheckboxChange('consigneeOnDelivery')}
                  />
                  <span>CONSIGNEE ON DELIVERY</span>
                </div>
                <div>
                  <span className="font-semibold">CHEQUE BENEFICIARY'S NAME:</span>
                  <div className="mt-1">0</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charges */}
        <div className="border-t border-black p-2">
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <div>Payment: {formData.paymentCharges}</div>
              <div>Fuel Surcharge: {formData.paymentCharges}</div>
              <div>Collective Amount / Code: {formData.collectiveAmount}</div>
              <div>0</div>
              <div>Stationary Charges: {formData.stationaryCharges}</div>
            </div>
            <div className="space-y-1">
              <div>Handling Charges:</div>
              <div>0</div>
              <div>WHATSAPP/QR Charges:</div>
              <div>{formData.whatsappCharges}</div>
              <div className="font-semibold">Grand Total: ₹ {formData.grandTotal}</div>
            </div>
          </div>
        </div>

        {/* Box Dimensions */}
        <div className="border-t border-black">
          <div className="grid grid-cols-4 text-xs">
            <div className="p-2 border-r border-black">
              <div className="font-semibold">BOXES DIMENSION</div>
              <div>(L*W*H) cm</div>
            </div>
            <div className="p-2 border-r border-black">
              <div className="font-semibold">DESCRIPTION</div>
            </div>
            <div className="p-2 border-r border-black">
              <div className="font-semibold">TOTAL WEIGHT</div>
            </div>
            <div className="p-2">
              <div className="font-semibold">REQUIRED SIGNATURE - DESTINATION:</div>
              <div>DELIVERY, SIGNATURE AND CONSIGNEE</div>
            </div>
          </div>
          <div className="grid grid-cols-4 text-xs border-t border-black">
            <div className="p-2 border-r border-black">
              <input 
                type="text" 
                value={formData.boxDimension}
                onChange={(e) => handleInputChange('boxDimension', e.target.value)}
                className="w-full p-1 border border-gray-300"
              />
            </div>
            <div className="p-2 border-r border-black">
              <input 
                type="text" 
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full p-1 border border-gray-300"
              />
            </div>
            <div className="p-2 border-r border-black">
              <input 
                type="text" 
                value={formData.totalWeight}
                onChange={(e) => handleInputChange('totalWeight', e.target.value)}
                className="w-full p-1 border border-gray-300"
              />
            </div>
            <div className="p-2"></div>
          </div>
        </div>

        {/* Document Information */}
        <div className="border-t border-black p-2">
          <div className="text-xs">
            <span className="font-semibold">TOTAL NUMBER OF BOXES: {formData.totalBoxes}</span>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-semibold">DOCUMENT RECEIVED: INVOICE ( )</span>
              <label className="flex items-center gap-1">
                <input 
                  type="checkbox" 
                  checked={formData.taxForms}
                  onChange={() => handleCheckboxChange('taxForms')}
                />
                TAX FORMS ( )
              </label>
              <label className="flex items-center gap-1">
                <input 
                  type="checkbox" 
                  checked={formData.others}
                  onChange={() => handleCheckboxChange('others')}
                />
                OTHERS ( )
              </label>
            </div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="border-t border-black">
          <div className="grid grid-cols-3 text-xs">
            <div className="p-2 border-r border-black">
              <div className="font-semibold">REQUIRED SIGNATURE - ORIGIN:</div>
              <div>Shp ID</div>
            </div>
            <div className="p-2 border-r border-black">
              <div className="font-semibold">SHIPPER'S SIGN:</div>
            </div>
            <div className="p-2">
              <div className="font-semibold">DATE:</div>
              <div className="mt-4">TIME:</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-black p-2 text-xs">
          <div>
            <div className="font-semibold">DAILY UDAAN: REGISTERED OFFICE</div>
            <div>Ground Floor, Shop No 13 Gurunanak vihar, Nathpur Road, in Front</div>
          </div>
          <div className="mt-2">
            <div className="font-semibold">CONTACT NUMBER:</div>
            <div>+91 8007656798, GSTIN: 27AZQPM5609F1ZM License No. MH-05-000834</div>
          </div>
          <div className="mt-2">
            <div className="font-semibold">TERMS & CONDITIONS:</div>
            <div>Visit dailyudaan.com</div>
          </div>
          <div className="text-right mt-4">
            <div className="font-semibold">SHIPPER COPY</div>
          </div>
        </div>
      </div>
    </div>
  );
}