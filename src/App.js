import React, { useState, useRef } from 'react';
import { ArrowLeft, Info, Truck, MapPin, Package, FileText, Upload, Shield } from 'lucide-react';

export default function ShippingOrderForm() {
  const [lrCreation, setLrCreation] = useState('manual');
  const [paymentMode, setPaymentMode] = useState('prepaid');
  const [insurance, setInsurance] = useState('');
  const [formData, setFormData] = useState({
    lrNumber: '',
    description: '',
    referenceId: '',
    numberOfBoxes: '',
    eWayBill: '',
    invoiceNumber: '',
    amount: '',
    totalWeight: '',
    addEWayBill: false
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const invoiceInputRef = useRef(null);
  const secondaryInputRef = useRef(null);

  const handleInvoiceBoxClick = () => {
    if (invoiceInputRef.current) invoiceInputRef.current.click();
  };

  const handleSecondaryBoxClick = () => {
    if (secondaryInputRef.current) secondaryInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <ArrowLeft className="w-6 h-6 text-gray-600 cursor-pointer" />
          <h1 className="text-xl font-semibold text-gray-800">Create New Order</h1>
          <div className="flex items-center gap-2 text-blue-600 cursor-pointer">
            <Info className="w-4 h-4" />
            <span className="text-sm">Learn More</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* LR Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-800">LR Details</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LR creation</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="lrCreation"
                        value="manual"
                        checked={lrCreation === 'manual'}
                        onChange={(e) => setLrCreation(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Manual</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="lrCreation"
                        value="automatic"
                        checked={lrCreation === 'automatic'}
                        onChange={(e) => setLrCreation(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Automatic</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <input
                    type="text"
                    placeholder="Enter LR number"
                    value={formData.lrNumber}
                    onChange={(e) => handleInputChange('lrNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-800">Order Details</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    placeholder="Enter order description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your reference ID / order ID</label>
                    <input
                      type="text"
                      placeholder="Enter your reference ID / order ID"
                      value={formData.referenceId}
                      onChange={(e) => handleInputChange('referenceId', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">No. of boxes</label>
                    <input
                      type="text"
                      placeholder="Enter no. of boxes"
                      value={formData.numberOfBoxes}
                      onChange={(e) => handleInputChange('numberOfBoxes', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-800">Invoice Details</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Mode</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMode"
                        value="prepaid"
                        checked={paymentMode === 'prepaid'}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Prepaid</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMode"
                        value="cod"
                        checked={paymentMode === 'cod'}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">Collect on delivery</span>
                    </label>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-Way Bill Number</label>
                    <input
                      type="text"
                      placeholder="Enter E-Way Bill number"
                      value={formData.eWayBill}
                      onChange={(e) => handleInputChange('eWayBill', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                    <input
                      type="text"
                      placeholder="Enter invoice number"
                      value={formData.invoiceNumber}
                      onChange={(e) => handleInputChange('invoiceNumber', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                      <input
                        type="text"
                        placeholder="Enter amount"
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="addEWayBill"
                    checked={formData.addEWayBill}
                    onChange={(e) => handleInputChange('addEWayBill', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded"
                  />
                  <label htmlFor="addEWayBill" className="ml-2 text-sm text-gray-700">
                    I will add E-Way Bill later/ E-Way Bill not required for this shipment
                  </label>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t">
                  <span className="font-medium text-gray-800">Total Amount</span>
                  <span className="font-semibold text-lg">₹0.00</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Delivery Transporter ID</span>
                  <span className="text-sm font-mono">06AAPCS9575E1ZR</span>
                </div>
              </div>
            </div>

            {/* Insurance */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-800">Insure your shipment</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Are you sure you want to ship the item at your own risk?</p>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="insurance"
                      value="own-risk"
                      checked={insurance === 'own-risk'}
                      onChange={(e) => setInsurance(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes, Ship with Owners Risk</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="insurance"
                      value="insured"
                      checked={insurance === 'insured'}
                      onChange={(e) => setInsurance(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Get Delivery's Insurance</span>
                    <span className="ml-1 text-sm text-gray-500">(Carrier's Risk)</span>
                  </label>
                </div>
                
                <p className="text-xs text-gray-500">
                  Getting insurance may include additional costs, please read the pricing file for insurance pricing details
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Delivery Details */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-800">Delivery Details</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Pickup Location</option>
                  </select>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-px h-8 bg-gray-300 ml-1.5"></div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded border-2 border-green-400"></div>
                  <select className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Select Drop Location</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Weights & Dimensions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-800">Weights & Dimensions</h2>
              </div>
              
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center gap-2 py-2 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400">
                  <Package className="w-4 h-4" />
                  <span className="text-sm">Add Box Size</span>
                </button>
                
                <p className="text-sm text-center text-gray-500">0 boxes left</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total shipment weight</span>
                    <span className="text-sm font-medium">Kgs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total no.of boxes</span>
                    <span className="text-sm font-medium">0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Documents */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-800">Upload Documents</h2>
                <span className="text-xs text-gray-500">Max size 20MB</span>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-gray-700">Invoice Document (Mandatory)</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400"
                    onClick={handleInvoiceBoxClick}
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-600 mb-1">Upload Document (PNG, JPG, JPEG, PDF, BMP)</p>
                    <p className="text-xs text-gray-500">or drag and drop here</p>
                    <input
                      type="file"
                      ref={invoiceInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      accept=".png,.jpg,.jpeg,.pdf,.bmp"
                    />
                  </div>
                </div>
                
                <div>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-700">Secondary Document (Optional)</span>
                  </div>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
                    <option>Select Document Type</option>
                  </select>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-400"
                    onClick={handleSecondaryBoxClick}
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-600 mb-1">Upload Document (PNG, JPG, JPEG, PDF, BMP)</p>
                    <p className="text-xs text-gray-500">or drag and drop here</p>
                    <input
                      type="file"
                      ref={secondaryInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      accept=".png,.jpg,.jpeg,.pdf,.bmp"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Mode */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center gap-2 mb-4">
                <Truck className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-800">Shipping Mode</h2>
              </div>
              <p className="text-sm font-medium text-gray-700">SURFACE</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 mt-8">
          <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
            Create New Order
          </button>
        </div>
      </div>
    </div>
  );
}