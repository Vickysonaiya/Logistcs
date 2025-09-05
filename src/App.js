// import React, { useState } from 'react';
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormLabel,
//   FormControl,
//   Button,
//   Box,
//   Divider,
//   Select,
//   MenuItem,
//   InputLabel,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import { AddBox, CloudUpload, InfoOutlined } from '@mui/icons-material';

// const App = () => {
//   const [lrCreationMode, setLrCreationMode] = useState('manual');
//   const [paymentMode, setPaymentMode] = useState('prepaid');
//   const [insuranceOption, setInsuranceOption] = useState('owner');

//   const handleLrChange = (event) => {
//     setLrCreationMode(event.target.value);
//   };

//   const handlePaymentChange = (event) => {
//     setPaymentMode(event.target.value);
//   };

//   const handleInsuranceChange = (event) => {
//     setInsuranceOption(event.target.value);
//   };

//   const SectionCard = ({ title, children }) => (
//     <Card sx={{ marginBottom: 3, borderRadius: 2 }}>
//       <CardContent>
//         <Typography variant="h6" gutterBottom>{title}</Typography>
//         <Divider sx={{ my: 2 }} />
//         {children}
//       </CardContent>
//     </Card>
//   );

//   const SidePanelCard = ({ title, children }) => (
//     <Card sx={{ marginBottom: 3, borderRadius: 2 }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>{title}</Typography>
//         </Box>
//         <Divider sx={{ my: 2 }} />
//         {children}
//       </CardContent>
//     </Card>
//   );

//   return (
//     <Container maxWidth="lg" sx={{ my: 4 }}>
//       {/* Header */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//         <Typography variant="h4">Create New Order</Typography>
//         <Box>
//           <Button variant="text" sx={{ mr: 2 }}>Cancel</Button>
//           <Button variant="contained" color="primary">Create New Order</Button>
//         </Box>
//       </Box>

//       <Grid container spacing={4}>
//         {/* Left Column */}
//         <Grid item xs={12} md={8}>
//           <SectionCard title="LR Details">
//             <FormControl component="fieldset">
//               <FormLabel component="legend">LR creation</FormLabel>
//               <RadioGroup
//                 row
//                 value={lrCreationMode}
//                 onChange={handleLrChange}
//               >
//                 <FormControlLabel value="manual" control={<Radio />} label="Manual" />
//                 <FormControlLabel value="automatic" control={<Radio />} label="Automatic" />
//               </RadioGroup>
//             </FormControl>
//             <TextField
//               fullWidth
//               label="Enter LR number"
//               variant="outlined"
//               margin="normal"
//               sx={{ mt: 2 }}
//             />
//           </SectionCard>

//           <SectionCard title="Order Details">
//             <TextField
//               fullWidth
//               label="Description"
//               variant="outlined"
//               placeholder="Enter order description"
//               margin="normal"
//             />
//             <Grid container spacing={2} sx={{ mt: 1 }}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Your reference ID / order ID"
//                   variant="outlined"
//                   placeholder="Enter your reference ID / order ID"
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="No. of boxes"
//                   variant="outlined"
//                   placeholder="Enter no. of boxes"
//                 />
//               </Grid>
//             </Grid>
//           </SectionCard>

//           <SectionCard title="Invoice Details">
//             <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//               <Typography variant="subtitle1" sx={{ mr: 1 }}>Payment Mode</Typography>
//               <RadioGroup row value={paymentMode} onChange={handlePaymentChange}>
//                 <FormControlLabel value="prepaid" control={<Radio />} label="Prepaid" />
//                 <FormControlLabel value="collect" control={<Radio />} label="Collect on delivery" />
//               </RadioGroup>
//             </Box>
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={4}>
//                 <TextField fullWidth label="E-Way Bill Number" variant="outlined" />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField fullWidth label="Invoice Number" variant="outlined" />
//               </Grid>
//               <Grid item xs={12} sm={4}>
//                 <TextField
//                   fullWidth
//                   label="Amount"
//                   variant="outlined"
//                   InputProps={{
//                     startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
//                   }}
//                 />
//               </Grid>
//             </Grid>
//           </SectionCard>

//           <SectionCard title="Insure your shipment">
//             <Typography variant="body2" sx={{ mb: 2 }}>
//               Are you sure you want to ship the item at your own risk?
//             </Typography>
//             <RadioGroup row value={insuranceOption} onChange={handleInsuranceChange}>
//               <FormControlLabel
//                 value="owner"
//                 control={<Radio />}
//                 label="Yes, Ship with Owners Risk"
//               />
//               <FormControlLabel
//                 value="carrier"
//                 control={<Radio />}
//                 label="Get Delhivery's Insurance (Carrier's Risk)"
//               />
//             </RadioGroup>
//             <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
//               Getting insurance may include additional costs, please read the pricing file for insurance pricing details
//             </Typography>
//           </SectionCard>
//         </Grid>

//         {/* Right Column (Side Panel) */}
//         <Grid item xs={12} md={4}>
//           <SidePanelCard title="Delivery Details">
//             <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
//               <InputLabel id="pickup-label">Select Pickup Location</InputLabel>
//               <Select labelId="pickup-label" label="Select Pickup Location">
//                 <MenuItem value=""><em>None</em></MenuItem>
//               </Select>
//             </FormControl>
//             <FormControl fullWidth variant="outlined">
//               <InputLabel id="drop-label">Select Drop Location</InputLabel>
//               <Select labelId="drop-label" label="Select Drop Location">
//                 <MenuItem value=""><em>None</em></MenuItem>
//               </Select>
//             </FormControl>
//           </SidePanelCard>

//           <SidePanelCard title="Weights & Dimensions">
//             <Button
//               startIcon={<AddBox />}
//               variant="outlined"
//               fullWidth
//               sx={{ mb: 2 }}
//             >
//               Add Box Size
//             </Button>
//             <Typography variant="body2" color="text.secondary">0 boxes left</Typography>
//             <TextField
//               fullWidth
//               label="Total shipment weight"
//               variant="outlined"
//               sx={{ my: 2 }}
//               InputProps={{
//                 endAdornment: <Typography>Kgs</Typography>,
//               }}
//             />
//             <TextField
//               fullWidth
//               label="Total no.of boxes"
//               variant="outlined"
//             />
//           </SidePanelCard>

//           <SidePanelCard title="Upload Documents">
//             <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
//               Invoice Document (Mandatory)
//               <Tooltip title="This document is required">
//                 <IconButton size="small" sx={{ ml: 0.5 }}><InfoOutlined fontSize="small" /></IconButton>
//               </Tooltip>
//             </Typography>
//             <Box
//               sx={{
//                 border: '2px dashed #ccc',
//                 borderRadius: 2,
//                 p: 3,
//                 textAlign: 'center',
//                 cursor: 'pointer',
//                 '&:hover': { borderColor: 'primary.main' }
//               }}
//             >
//               <CloudUpload color="disabled" sx={{ fontSize: 40 }} />
//               <Typography variant="body2" color="text.secondary">
//                 Upload Document (PNG, JPG, JPEG, PDF, BMP) or drag and drop here
//               </Typography>
//             </Box>

//             <FormControl fullWidth sx={{ mt: 3 }}>
//               <InputLabel id="secondary-doc-label">Secondary Document (Optional)</InputLabel>
//               <Select labelId="secondary-doc-label" label="Secondary Document (Optional)">
//                 <MenuItem value=""><em>None</em></MenuItem>
//               </Select>
//             </FormControl>
//             <Box
//               sx={{
//                 border: '2px dashed #ccc',
//                 borderRadius: 2,
//                 p: 3,
//                 textAlign: 'center',
//                 cursor: 'pointer',
//                 mt: 2,
//                 '&:hover': { borderColor: 'primary.main' }
//               }}
//             >
//               <CloudUpload color="disabled" sx={{ fontSize: 40 }} />
//               <Typography variant="body2" color="text.secondary">
//                 Upload Document (PNG, JPG, JPEG, PDF, BMP) or drag and drop here
//               </Typography>
//             </Box>
//           </SidePanelCard>

//           <SidePanelCard title="Shipping Mode">
//             <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, textAlign: 'center' }}>
//               <Typography variant="body1" color="text.secondary">SURFACE</Typography>
//             </Box>
//           </SidePanelCard>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default App;




// import React, { useState } from "react";
// import "./App.css";

// export default function App() {
//   const [lrMode, setLrMode] = useState("manual");
//   const [paymentMode, setPaymentMode] = useState("prepaid");
//   const [insurance, setInsurance] = useState("owner");

//   return (
//     <div className="page-container">
//       <div className="order-container">
//         {/* Header */}
//         <div className="header">
//           <h1>Create New Order</h1>
//           <button className="learn-btn">Learn More</button>
//         </div>

//         <div className="grid-layout">
//           {/* Left Column */}
//           <div className="left-col">
//             {/* LR Details */}
//             <section className="card">
//               <h2>LR Details</h2>
//               <div className="radio-group">
//                 <label>
//                   <input
//                     type="radio"
//                     name="lrMode"
//                     checked={lrMode === "manual"}
//                     onChange={() => setLrMode("manual")}
//                   />
//                   Manual
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="lrMode"
//                     checked={lrMode === "automatic"}
//                     onChange={() => setLrMode("automatic")}
//                   />
//                   Automatic
//                 </label>
//               </div>
//               <input
//                 type="text"
//                 placeholder="Enter LR number"
//                 className="input"
//               />
//             </section>

//             {/* Order Details */}
//             <section className="card">
//               <h2>Order Details</h2>
//               <input
//                 type="text"
//                 placeholder="Enter order description"
//                 className="input"
//               />
//               <div className="row">
//                 <input
//                   type="text"
//                   placeholder="Your reference ID / order ID"
//                   className="input"
//                 />
//                 <input
//                   type="number"
//                   placeholder="Enter no. of boxes"
//                   className="input"
//                 />
//               </div>
//             </section>

//             {/* Invoice Details */}
//             <section className="card">
//               <h2>Invoice Details</h2>
//               <div className="radio-group">
//                 <label>
//                   <input
//                     type="radio"
//                     name="paymentMode"
//                     checked={paymentMode === "prepaid"}
//                     onChange={() => setPaymentMode("prepaid")}
//                   />
//                   Prepaid
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="paymentMode"
//                     checked={paymentMode === "cod"}
//                     onChange={() => setPaymentMode("cod")}
//                   />
//                   Collect on delivery
//                 </label>
//               </div>

//               <div className="row">
//                 <input type="text" placeholder="Enter E-Way Bill number" className="input" />
//                 <input type="text" placeholder="Enter invoice number" className="input" />
//                 <input type="number" placeholder="Enter amount" className="input" />
//               </div>

//               <label className="checkbox">
//                 <input type="checkbox" /> I will add E-Way Bill later / not required
//               </label>

//               <div className="note">
//                 <p>Total Amount: ₹0.00</p>
//                 <p>Delhivery Transporter ID: 06AAPC5975E1ZR</p>
//               </div>
//             </section>

//             {/* Insurance */}
//             <section className="card">
//               <h2>Insure your shipment</h2>
//               <p className="small">Are you sure you want to ship the item at your own risk?</p>
//               <div className="radio-group">
//                 <label>
//                   <input
//                     type="radio"
//                     name="insurance"
//                     checked={insurance === "owner"}
//                     onChange={() => setInsurance("owner")}
//                   />
//                   Yes, Ship with Owners Risk
//                 </label>
//                 <label>
//                   <input
//                     type="radio"
//                     name="insurance"
//                     checked={insurance === "carrier"}
//                     onChange={() => setInsurance("carrier")}
//                   />
//                   Get Delhivery’s Insurance
//                 </label>
//               </div>
//               <p className="small muted">
//                 Getting insurance may include additional costs. Please read the pricing file.
//               </p>
//             </section>
//           </div>

//           {/* Right Column */}
//           <div className="right-col">
//             <section className="card">
//               <h2>Delivery Details</h2>
//               <select className="input">
//                 <option>Select Pickup Location</option>
//               </select>
//               <select className="input">
//                 <option>Select Drop Location</option>
//               </select>
//             </section>

//             <section className="card">
//               <h2>Weights & Dimensions</h2>
//               <button className="btn-outline">Add Box Size</button>
//               <p className="small">0 boxes left</p>
//               <input type="number" placeholder="Total shipment weight (kgs)" className="input" />
//               <p className="small">Total no. of boxes: 0</p>
//             </section>

//             <section className="card">
//               <h2>Upload Documents</h2>
//               <p className="small">Max size 20MB</p>
//               <label className="upload-box">
//                 Upload Document (PNG, JPG, PDF, BMP)
//                 <input type="file" hidden />
//               </label>

//               <select className="input">
//                 <option>Select Document Type (Optional)</option>
//               </select>

//               <label className="upload-box">
//                 Upload Secondary Document
//                 <input type="file" hidden />
//               </label>
//             </section>

//             <section className="card">
//               <h2>Shipping Mode</h2>
//               <p>SURFACE</p>
//             </section>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="footer">
//           <button className="btn-outline">Cancel</button>
//           <button className="btn-primary">Create New Order</button>
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState } from 'react';
import { ArrowLeft, Info, Truck, MapPin, Package, FileText, Upload, Shield } from 'lucide-react';

export default function ShippingOrderForm() {
  const [lrCreation, setLrCreation] = useState('manual');
  const [paymentMode, setPaymentMode] = useState('prepaid');
  const [insurance, setInsurance] = useState('own-risk');
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-600 mb-1">Upload Document (PNG, JPG, JPEG, PDF, BMP)</p>
                    <p className="text-xs text-gray-500">or drag and drop here</p>
                  </div>
                </div>
                
                <div>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-gray-700">Secondary Document (Optional)</span>
                  </div>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
                    <option>Select Document Type</option>
                  </select>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-blue-600 mb-1">Upload Document (PNG, JPG, JPEG, PDF, BMP)</p>
                    <p className="text-xs text-gray-500">or drag and drop here</p>
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