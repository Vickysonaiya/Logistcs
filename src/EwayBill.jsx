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
          <div className="w-1/2 p-2 border-r border-black">
            <div className="text-xs mb-1">1. From</div>
            {/* <input 
              type="text" 
              value={formData.from}
              onChange={(e) => handleInputChange('from', e.target.value)}
              className="w-full p-1 border border-gray-300 text-center"
            /> */}
            <span></span>
          </div>
          <div className="w-1/2 p-2 border-r border-black">
            <div className="text-xs mb-1">4. To</div>
            <span></span>
          <div className="flex-1">
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
        </div>

        {/* Shipper and Recipient Details */}
        <div className="grid grid-cols-2">
          {/* Shipper Details */}
          <div className="border-r border-black">
            <div className="p-2 border-b border-black bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">Shipper's Name:</span>
                <span className='text-xs'>Vichitpanth</span>
              </div>
            </div>
            
            <div className="p-2 border-b border-black">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold">Shipper's Phone:</span>
                <span className='text-xs'>9999999999</span>
              </div>
            </div>

            <div className="p-2 border-b border-black">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="font-semibold">City:</span>
                  <span className='text-xs'>Nashik</span>
                </div>
                <div>
                  <span className="font-semibold">State:</span>
                  <span className='text-xs'>Maharashtra</span>
                </div>
                <div>
                  <span className="font-semibold">Pincode:</span>
                  <span className='text-xs'>410562</span>
                </div>
              </div>
            </div>

            <div className="p-2 border-b border-black">
              <span className="text-xs font-semibold">Street Name:</span>
              <span className='text-xs'>Nashik Maharashtra</span>
            </div>

            <div className="p-2">
              <span className="text-xs font-semibold">GST NO:</span>
              <span className='text-xs'>0</span>
            </div>
          </div>

          {/* Recipient Details */}
          <div>
            <div className="p-2 border-b border-black bg-gray-50">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold">Recipient's Name:</span>
                <span className='text-xs'>Maul</span>
              </div>
            </div>
            
            <div className="p-2 border-b border-black">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold">Recipient's Phone:</span>
                <span className='text-xs'>8888888888</span>
              </div>
            </div>

            <div className="p-2 border-b border-black">
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="font-semibold">City:</span>
                  <span className='text-xs'>Goa</span>
                </div>
                <div>
                  <span className="font-semibold">State:</span>
                  <span className='text-xs'>Maharashtra</span>
                </div>
                <div>
                  <span className="font-semibold">Pincode:</span>
                  <span className='text-xs'>431122</span>
                </div>
              </div>
            </div>

              
            <div className="p-2 border-b border-black">
              <span className="text-xs font-semibold">Street Name:</span>
              <span className='text-xs'>Jadhav Nagar</span>
            </div>

            <div className="p-2">
              <span className="text-xs font-semibold">GST NO:</span>
              <span className='text-xs'>0</span>
            </div>
          </div>
        

        {/* Shipment Information */}
        <div className="border-r border-t border-black p-2">
          <span className="text-xs font-semibold">2. Shipment Information</span>
          </div>
          <div className="border-r border-t border-black p-2">
          <span className="text-xs font-semibold">Client/store/address information</span>
          </div>
        </div>

        {/* Reference and Special Handling */}
        <div className="grid grid-cols-2 border-t border-black">
          <div className="p-2 border-r border-black">
            <div className="text-xs font-semibold mb-2">SHIPPER'S REFERENCE NO (25 characters):</div>
            <div className="mt-2">
              <div className="text-xs">SMQTI:</div>
              <span className="text-xs">1234567890</span>
              <div className="text-xs">Air Full</div>
              <label className="flex items-center gap-1 text-xs mt-1">
                <input type="checkbox" />
                Ground
              </label>
            </div>
          </div>
          <div className="p-2 ">
            <div className="text-xs font-semibold mb-2">5. MOT:</div>
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-xs">
                <input 
                  type="checkbox" 
                  checked={formData.fragile}
                  onChange={() => handleCheckboxChange('air')}
                />
                AIR
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input 
                  type="checkbox" 
                  checked={formData.fragile}
                  onChange={() => handleCheckboxChange('ground')}
                />
                GROUND
              </label>
              <div className="text-xs font-semibold mb-2">6. Special Handling:</div>
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
                  onChange={() => handleCheckboxChange('dg')}
                />
                DG
              </label>
            </div>
            <div className="space-y-1">
              <label className="flex items-center gap-1 text-xs">
                <input 
                  type="checkbox" 
                  checked={formData.fragile}
                  onChange={() => handleCheckboxChange('valcargo')}
                />
                VAL CARGO
              </label>
            </div>
          </div>
        </div>

        {/* Invoice and Payment Details */}
        <div className="border-t border-black">
          <div className="grid grid-cols-4 text-xs">
            <div className="p-2 border-r border-black">
              <div className="font-semibold">Invoice No:</div>
              <span className='text-sm'>14</span>
            </div>
            <div className="p-2 border-r border-black">
              <div className="font-semibold">EWBN:</div>
              
            </div>
            <div className="p-2 border-r border-black">
              <div>Note: If the product value/invoice is damaged or lost, the amount will not exceed</div>
            </div>
            <div className="p-2">
              <div>2000</div>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="border border-black font-sans">
  {/* Header Section */}
  <div className="grid grid-cols-4">
    <div className="p-2 border-r border-black">
      <div className="text-xs">
        <span className="font-semibold">TOTAL INVOICE VALUE:</span>
        <div className="mt-1 font-bold text-base">2000</div>
      </div>
    </div>
    <div className="p-2 border-r border-black">
      <div className="space-y-2 text-xs">
        <div>
          <span className="font-semibold">LR Number:</span>
          <div>52284434</div>
        </div>
        <div>
          <span className="font-semibold">Deily Udaan</span>
        </div>
      </div>
    </div>
    <div className="p-2 border-r border-black">
      <div className="space-y-2 text-xs">
        <div>
          <span className="font-semibold">Payment Mode:</span>
          <div>Prepaid</div>
        </div>
        <div>
          <span className="font-semibold">COD Amount:</span>
          <div>₹0.00</div>
        </div>
        <div className="flex items-center gap-1">
          <input type="checkbox" className="border-black"/>
          <span>CHEQUE ON DELIVERY</span>
        </div>
        <div>
          <span className="font-semibold">CHEQUE BENEFICIARY'S NAME:</span>
          <div className="mt-1"></div>
        </div>
      </div>
    </div>

  {/* Charges Section */}
  <div className="p-2">
    <div className=" text-xs">
      <div className="space-y-1">
        <div><span className="font-semibold">Payment:</span></div>
        <div><span className="font-semibold">Freight Charge:</span> ₹ 371.94</div>
        <div><span className="font-semibold">Collective Amount / Code:</span></div>
      </div>
      <div className="space-y-1">
        <div><span className="font-semibold">Stationary Charges:</span></div>
        <div><span className="font-semibold">Hamali / Handling Charges:</span></div>
        <div><span className="font-semibold">WP/SMS/ACK Oth Charges:</span></div>
        <div><span className="font-semibold">Grand Total:</span> ₹ 371.94</div>
      </div>
    </div>
  </div>
  </div>

  {/* Box Dimensions and Description */}
  <div className="border border-black font-sans">
  {/* Header Row */}
  <div className="grid grid-cols-4 text-xs font-semibold border-b border-black">
    <div className="p-2 border-r border-black">
      <div>BOXES DIMENSION</div>
      <div>(L x W x H) cm</div>
    </div>
    <div className="p-2 border-r border-black">DESCRIPTION</div>
    <div className="p-2 border-r border-black">TOTAL WEIGHT</div>
    <div className="p-2">
      <div>REQUIRED SIGNATURE - DESTINATION:</div>
      <div>RECIPIENT'S SIGNATURE AND STAMP:</div>
    </div>
  </div>

  {/* Data Row */}
  <div className="grid grid-cols-4 text-xs h-16 border-b border-black">
    <div className="p-2 border-r border-black">
      <div>2, 15.00*20.00*15.00</div>
    </div>
    <div className="p-2 border-r border-black">
      <div>mob</div>
    </div>
    <div className="p-2 border-r border-black">
      <div>20.00 Kgs</div>
    </div>
    <div className="p-2"></div>
  </div>

  {/* Document Information */}
  <div className="p-2">
    <div className="text-xs">
      <div className="flex items-center gap-2">
        <span className="font-semibold">TOTAL NUMBER OF BOXES:</span>
        <span>2</span>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <span className="font-semibold">DOCUMENT RECEIVED: INVOICE ( )</span>
        <label className="flex items-center gap-1">
          <input type="checkbox" className="border-black" />
          <span>TAX FORMS ( )</span>
        </label>
        <label className="flex items-center gap-1">
          <input type="checkbox" className="border-black" />
          <span>OTHERS ( )</span>
        </label>
      </div>
    </div>
    <div className="mt-2 text-xs">
      <span className="font-semibold">No. Of DOCUMENTS:</span>
    </div>
  </div>
</div>

  {/* Origin Signature */}
  <div className="border-t border-black">
    <div className="grid grid-cols-3 text-xs">
      <div className="p-2 border-r border-black">
        <div className="font-semibold">REQUIRED SIGNATURE - ORIGIN:</div>
        <div className="mt-2">EMP ID:.............................</div>
      </div>
      <div className="p-2 border-r border-black">
        <div className="font-semibold">SHIPPER'S SIGN:......................</div>
      </div>
      <div className="p-2">
        <div className="font-semibold">DATE:..............................</div>
        <div className="mt-4 font-semibold">TIME:..............................</div>
      </div>
    </div>
  </div>

  {/* Footer */}
  <div className="border-t border-black p-2 text-xs">
    <div>
      <div className="font-semibold">DEILY UDAAN, REGISTERED OFFICE:</div>
      <div>Ground Floor, Shop No.3, Patil Complex, Subhash Road, in Front Of Chhatrapati Sankli, Beed, Maharashtra, 431122</div>
    </div>
    <div className="mt-2">
      <div className="font-semibold">CONTACT NUMBER:</div>
      <div>+91 8010070198, GSTN: 27ZDZPM8098F License No. MH-05-0030814</div>
    </div>
    <div className="mt-2">
      <div className="font-semibold">FOR TERMS & CONDITIONS, VISIT</div>
      <div className="text-blue-600 underline">deilyudaan.yedeshwari.in</div>
    </div>
  </div>
  <div className="border-t border-black text-xs p-2 text-right">
    <div className="font-semibold">SHIPPER COPY</div>
  </div>
</div>
      </div>
    </div>
  );
}