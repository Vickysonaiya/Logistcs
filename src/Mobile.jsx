import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  TextField,
  MenuItem,
  Modal,
  IconButton,
} from "@mui/material";
import Barcode from "react-barcode";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";

// --- Mock Data for Dropdowns ---
const COMPANY_OPTIONS = ["Samsung", "Apple", "Xiaomi", "OnePlus", "Oppo", "Vivo"];
const MODEL_OPTIONS = {
  Samsung: ["Galaxy S23", "Galaxy A54", "Galaxy M34"],
  Apple: ["iPhone 14", "iPhone 13", "iPhone SE"],
  Xiaomi: ["Redmi Note 12", "Xiaomi 13 Pro"],
  OnePlus: ["OnePlus 11", "OnePlus Nord 3"],
  Oppo: ["Oppo Reno 10", "Oppo F23"],
  Vivo: ["Vivo V27", "Vivo T2"],
};
const RAM_OPTIONS = ["2GB", "4GB", "6GB", "8GB", "12GB"];

// --- Helper Function for Price Encoding (ANKUSHME G) ---
const PRICE_MAP = {
  1: "A",
  2: "N",
  3: "K",
  4: "U",
  5: "S",
  6: "H",
  7: "M",
  8: "E",
  9: "D",
  0: "G",
};

const encodePrice = (price) => {
  if (!price) return "";
  const priceString = String(price);
  return priceString
    .split("")
    .map((digit) => PRICE_MAP[digit] || digit)
    .join("");
};

// --- Barcode Modal Component ---
const BarcodeModal = ({ open, handleClose, item }) => {
  if (!item) return null;

  const encodedPrice = encodePrice(item.sellingPrice);
  const barcodeValue = item.imei || encodedPrice;
  const barcodeText = item.imei ? item.imei : encodedPrice;

  const handlePrint = () => {
    // Basic window print - in a real app you'd likely use a dedicated library
    const printContent = document.getElementById("barcode-print-content");
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Barcode</title>");
    printWindow.document.write('<style>@media print { body { margin: 0; padding: 0; } }</style>');
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
          textAlign: "center",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box id="barcode-print-content">
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {item.company} - {item.model}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {item.storage} | {item.ram}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Price: ₹{item.sellingPrice}
          </Typography>
          <Typography variant="caption" display="block">
            {item.imei ? 'IMEI/Code' : 'Price Code'} : {barcodeText}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Barcode
              value={barcodeValue}
              width={2}
              height={80}
              fontSize={16}
              displayValue={true} // Display text under the barcode
            />
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ mt: 2, bgcolor: "black", color: "white" }}
        >
          Print Label
        </Button>
      </Box>
    </Modal>
  );
};

// --- Main Component ---
export default function MobilePage() {
  const [activePage, setActivePage] = useState("mobile");
  const [formData, setFormData] = useState({
    company: "",
    model: "",
    storage: "",
    sellingPrice: "",
    mrp: "",
    imei: "",
    ram: "",
  });
  const [accessoriesData, setAccessoriesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, ...(name === 'company' && { model: '' }) })); // Reset model when company changes
  };

  const handleSave = () => {
    const newItem = { ...formData, id: Date.now() }; // Add a unique ID
    setAccessoriesData((prev) => [...prev, newItem]);
    setFormData({
      company: "",
      model: "",
      storage: "",
      sellingPrice: "",
      mrp: "",
      imei: "",
      ram: "",
    });
    setActivePage("accessories"); // Redirect to Accessories/History page
  };

  const openBarcodeModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Filter models based on selected company
  const availableModels = MODEL_OPTIONS[formData.company] || [];

  // Get last saved item for Box Label
  const lastAccessory =
    accessoriesData.length > 0
      ? accessoriesData[accessoriesData.length - 1]
      : null;

  return (
    <Box sx={{ backgroundColor: "#f44336", p: 2, minHeight: "100vh" }}>
      {/* Top Menu */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: activePage === "mobile" ? "black" : "white", color: activePage === "mobile" ? "white" : "black" }}
            onClick={() => setActivePage("mobile")}
          >
            Mobile Entry
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: activePage === "accessories" ? "black" : "white", color: activePage === "accessories" ? "white" : "black" }}
            onClick={() => setActivePage("accessories")}
          >
            History
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: activePage === "box" ? "black" : "white", color: activePage === "box" ? "white" : "black" }}
            onClick={() => setActivePage("box")}
            disabled={!lastAccessory} // Disable if no item is saved
          >
            Last Box Label
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{ bgcolor: activePage === "setting" ? "black" : "white", color: activePage === "setting" ? "white" : "black" }}
            onClick={() => setActivePage("setting")}
          >
            Setting
          </Button>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "calc(100vh - 80px)", p: 4, borderRadius: '8px' }}>
        <Grid container spacing={3}>
          {/* -------- Mobile Page (Form) -------- */}
          {activePage === "mobile" && (
            <>
              {/* Company Dropdown */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Company Name"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                >
                  {COMPANY_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Model Dropdown */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Model Number"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  disabled={!formData.company} // Disable until company is selected
                  required
                >
                  {availableModels.length > 0 ? (
                    availableModels.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>Select a Company first</MenuItem>
                  )}
                </TextField>
              </Grid>

              {/* RAM Dropdown */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="RAM"
                  name="ram"
                  value={formData.ram}
                  onChange={handleChange}
                  required
                >
                  {RAM_OPTIONS.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Storage"
                  name="storage"
                  value={formData.storage}
                  onChange={handleChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Selling Price"
                  name="sellingPrice"
                  type="number"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="MRP Price"
                  name="mrp"
                  type="number"
                  value={formData.mrp}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="IMEI Number (Optional)"
                  name="imei"
                  value={formData.imei}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "black", color: "white", mt: 2 }}
                  onClick={handleSave}
                  disabled={!formData.company || !formData.model || !formData.sellingPrice}
                >
                  Save Mobile Entry
                </Button>
              </Grid>
            </>
          )}

          {/* -------- Accessories Page (History) -------- */}
          {activePage === "accessories" && (
            <>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Entry History
                </Typography>
              </Grid>
              {accessoriesData.length === 0 ? (
                <Grid item xs={12}>
                  <Typography>No data added yet.</Typography>
                </Grid>
              ) : (
                accessoriesData.slice().reverse().map((item) => ( // Reverse to show latest first
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Box
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                        p: 2,
                        bgcolor: "white",
                        boxShadow: 1,
                        position: 'relative'
                      }}
                    >
                      <Typography variant="body1">
                        <strong>Model:</strong> {item.company} {item.model}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Specs:</strong> {item.ram} | {item.storage}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Price:</strong> ₹{item.sellingPrice}
                      </Typography>
                      <Typography variant="body2">
                        <strong>IMEI:</strong> {item.imei || 'N/A'}
                      </Typography>

                      <IconButton
                        aria-label="view barcode"
                        onClick={() => openBarcodeModal(item)}
                        sx={{
                          position: 'absolute',
                          top: 8,
                          right: 8,
                          color: '#f44336',
                        }}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                ))
              )}
            </>
          )}

          {/* -------- Box Label Page (Last Saved Item) -------- */}
          {activePage === "box" && lastAccessory && (
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
                Last Saved Box Label (Click View in History for Print)
              </Typography>
              <Box
                sx={{
                  border: "2px solid black",
                  borderRadius: "8px",
                  p: 4,
                  textAlign: "center",
                  bgcolor: "white",
                  maxWidth: 400,
                  mx: 'auto'
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  {lastAccessory.model}
                </Typography>
                <Typography variant="h6">
                  Price: ₹{lastAccessory.sellingPrice}
                </Typography>
                <Typography variant="caption" display="block" sx={{ mb: 2 }}>
                  {lastAccessory.imei || encodePrice(lastAccessory.sellingPrice)}
                </Typography>
                <Box>
                  <Barcode
                    value={lastAccessory.imei || encodePrice(lastAccessory.sellingPrice)}
                    width={2}
                    height={80}
                    fontSize={16}
                  />
                </Box>
                <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                    onClick={() => openBarcodeModal(lastAccessory)}
                    sx={{ mt: 2, bgcolor: "black", color: "white" }}
                  >
                    Generate & Print
                  </Button>
              </Box>
            </Grid>
          )}

          {/* -------- Setting Page -------- */}
          {activePage === "setting" && (
            <Grid item xs={12}>
              <Box
                sx={{
                  border: "2px solid #ccc",
                  borderRadius: "4px",
                  p: 3,
                  bgcolor: "white",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: '#f44336' }}>
                  Setting Page (Future Implementation)
                </Typography>
                <Typography variant="body1">
                  This section is where you would **dynamically manage** the lists for **Company Name** (Category) and **Model Number** (Sub-Category), including **Edit** and **Delete** functionality for entries.
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                  You would also manage the **Price Encoding** table used for hidden pricing on the barcode label.
                </Typography>

                <Box sx={{ mt: 3, p: 2, border: '1px dashed #ccc' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
                    Current Price Encoding Map:
                  </Typography>
                  <Grid container spacing={1}>
                    {Object.entries(PRICE_MAP).map(([num, char]) => (
                      <Grid item key={num}>
                        <Typography variant="body2">
                          <strong>{num}</strong> &rarr; <strong>{char}</strong>
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
                
                <Box sx={{ mt: 3, p: 2, border: '1px dashed #ccc' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    Example Encoding:
                  </Typography>
                  <Typography variant="body2">
                    • Price = 1599
                  </Typography>
                  <Typography variant="body2">
                    • Encoded Code = {encodePrice(1599)}
                  </Typography>
                  <Typography variant="body2">
                    • **Barcode Label:** The barcode will display **ASDD** (if no IMEI is present). This is a hidden price for employees only.
                  </Typography>
                </Box>

              </Box>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Barcode Modal */}
      <BarcodeModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        item={selectedItem}
      />
    </Box>
  );
}





// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Typography,
//   TextField,
//   MenuItem,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
// } from "@mui/material";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import Barcode from "react-barcode";

// export default function MobilePage() {
//   const [activePage, setActivePage] = useState("mobile");

//   // Sample dropdown options
//   const companies = ["Samsung", "Apple", "OnePlus", "Xiaomi"];
//   const models = {
//     Samsung: ["S23", "A54", "M14"],
//     Apple: ["iPhone 13", "iPhone 14", "iPhone 15 Pro"],
//     OnePlus: ["Nord 3", "11R", "12"],
//     Xiaomi: ["Redmi Note 13", "Mi 11X", "Poco X5"],
//   };

//   // Form state
//   const [formData, setFormData] = useState({
//     company: "",
//     model: "",
//     storage: "",
//     sellingPrice: "",
//     mrp: "",
//     imei: "",
//     ram: "",
//   });

//   // History
//   const [history, setHistory] = useState([]);

//   // Popup state
//   const [openPopup, setOpenPopup] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     setHistory((prev) => [...prev, formData]);
//     setFormData({
//       company: "",
//       model: "",
//       storage: "",
//       sellingPrice: "",
//       mrp: "",
//       imei: "",
//       ram: "",
//     });
//     setActivePage("history");
//   };

//   const handleViewBarcode = (item) => {
//     setSelectedItem(item);
//     setOpenPopup(true);
//   };

//   return (
//     <Box sx={{ backgroundColor: "#f44336", p: 2 }}>
//       {/* Menu */}
//       <Grid container spacing={2} justifyContent="center">
//         {["mobile", "history", "accessories", "box", "setting"].map((page) => (
//           <Grid item key={page}>
//             <Button
//               variant="contained"
//               sx={{ bgcolor: "white", color: "black" }}
//               onClick={() => setActivePage(page)}
//             >
//               {page}
//             </Button>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Bottom Section */}
//       <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh", p: 4, width: '100%', borderRadius: '8px', mt: 2 }}>
//         <Grid container spacing={2}>
//           {/* -------- Mobile Page (Form) -------- */}
//           {activePage === "mobile" && (
//             <>
//               {/* Company Dropdown */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Company Name"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                   style={{ textTransform: "uppercase", width: '190px' }}
//                 >
//                   {companies.map((comp) => (
//                     <MenuItem key={comp} value={comp}>
//                       {comp}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               {/* Model Dropdown (depends on company) */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Model Number"
//                   name="model"
//                   value={formData.model}
//                   onChange={handleChange}
//                   disabled={!formData.company}
//                   style={{ textTransform: "uppercase", width: '190px' }}
//                 >
//                   {(models[formData.company] || []).map((mod) => (
//                     <MenuItem key={mod} value={mod}>
//                       {mod}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               {/* Other Fields */}
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Storage"
//                   name="storage"
//                   value={formData.storage}
//                   onChange={handleChange}
//                   style={{ textTransform: "uppercase", width: '90px' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Selling Price"
//                   name="sellingPrice"
//                   value={formData.sellingPrice}
//                   onChange={handleChange}
//                   style={{ textTransform: "uppercase", width: '120px' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="MRP Price"
//                   name="mrp"
//                   value={formData.mrp}
//                   onChange={handleChange}
//                   style={{ textTransform: "uppercase", width: '120px' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="IMEI Number"
//                   name="imei"
//                   value={formData.imei}
//                   onChange={handleChange}
//                   style={{ textTransform: "uppercase", width: '180px' }}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="RAM"
//                   name="ram"
//                   value={formData.ram}
//                   onChange={handleChange}
//                   style={{ textTransform: "uppercase", width: '90px' }}
//                 >
//                   {["2GB", "4GB", "6GB", "8GB", "12GB"].map((ram) => (
//                     <MenuItem key={ram} value={ram}>
//                       {ram}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>

//               {/* Save Button */}
//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   sx={{ bgcolor: "black", color: "white", mt: 2 }}
//                   onClick={handleSave}
//                 >
//                   Save
//                 </Button>
//               </Grid>
//             </>
//           )}

//           {/* -------- History (Accessories Page) -------- */}
//           {activePage === "history" && (
//             <>
//               {history.length === 0 ? (
//                 <Typography>No history yet.</Typography>
//               ) : (
//                 history.map((item, i) => (
//                   <Grid item xs={12} sm={6} key={i}>
//                     <Box
//                       sx={{
//                         border: "2px solid black",
//                         borderRadius: "4px",
//                         p: 2,
//                         bgcolor: "white",
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "center",
//                       }}
//                     >
//                       <Box>
//                         <Typography>
//                           <strong>{item.company}</strong> - {item.model}
//                         </Typography>
//                         <Typography>₹{item.sellingPrice}</Typography>
//                       </Box>
//                       <IconButton onClick={() => handleViewBarcode(item)}>
//                         <VisibilityIcon />
//                       </IconButton>
//                     </Box>
//                   </Grid>
//                 ))
//               )}
//             </>
//           )}
//         </Grid>
//       </Box>

//       {/* Popup Modal for Barcode */}
//       <Dialog open={openPopup} onClose={() => setOpenPopup(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Barcode Label</DialogTitle>
//         <DialogContent sx={{ textAlign: "center" }}>
//           {selectedItem && (
//             <>
//               <Typography variant="h6">{selectedItem.company} - {selectedItem.model}</Typography>
//               <Typography>IMEI: {selectedItem.imei}</Typography>
//               <Typography>Price: ₹{selectedItem.sellingPrice}</Typography>
//               <Box sx={{ mt: 2 }}>
//                 <Barcode
//                   value={selectedItem.imei || selectedItem.sellingPrice}
//                   width={2}
//                   height={80}
//                   fontSize={16}
//                 />
//               </Box>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }












// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Grid,
//   Typography,
//   TextField,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   IconButton,
//   Dialog,
//   DialogContent,
//   DialogTitle,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import Barcode from "react-barcode";

// export default function MobilePage() {
//   const [activePage, setActivePage] = useState("mobile");
//   const [formData, setFormData] = useState({
//     company: "",
//     model: "",
//     storage: "",
//     sellingPrice: "",
//     mrp: "",
//     imei: "",
//     ram: "",
//   });

//   // State to manage the list of saved mobiles (history)
//   const [mobileHistory, setMobileHistory] = useState([]);

//   // State to manage dynamic company and model lists
//   const [companies, setCompanies] = useState(["Samsung", "Apple", "Xiaomi"]);
//   const [models, setModels] = useState(["Galaxy S21", "iPhone 13", "Redmi Note 10"]);

//   // State for barcode pop-up
//   const [openBarcodeDialog, setOpenBarcodeDialog] = useState(false);
//   const [barcodeValue, setBarcodeValue] = useState("");
//   const [barcodeLabel, setBarcodeLabel] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSave = () => {
//     setMobileHistory((prev) => [...prev, { ...formData, id: Date.now() }]);
//     setFormData({
//       company: "",
//       model: "",
//       storage: "",
//       sellingPrice: "",
//       mrp: "",
//       imei: "",
//       ram: "",
//     });
//     setActivePage("accessories");
//   };

//   const handleDelete = (id) => {
//     setMobileHistory((prev) => prev.filter((item) => item.id !== id));
//   };

//   const handleEdit = (item) => {
//     setFormData(item);
//     setActivePage("mobile");
//   };

//   const handleOpenBarcode = (item) => {
//     setBarcodeValue(item.imei || item.sellingPrice);
//     setBarcodeLabel(`Price: ₹${item.sellingPrice}`);
//     setOpenBarcodeDialog(true);
//   };

//   const handleCloseBarcode = () => {
//     setOpenBarcodeDialog(false);
//   };

//   const lastAccessory = mobileHistory[mobileHistory.length - 1] || null;

//   return (
//     <Box sx={{ backgroundColor: "#f44336", p: 2, minHeight: "100vh" }}>
//       {/* Top Menu */}
//       <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
//         <Grid item>
//           <Button
//             variant="contained"
//             sx={{ bgcolor: activePage === "mobile" ? "#f44336" : "white", color: activePage === "mobile" ? "white" : "black" }}
//             onClick={() => setActivePage("mobile")}
//           >
//             Mobile
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             sx={{ bgcolor: activePage === "accessories" ? "#f44336" : "white", color: activePage === "accessories" ? "white" : "black" }}
//             onClick={() => setActivePage("accessories")}
//           >
//             History
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             sx={{ bgcolor: activePage === "box" ? "#f44336" : "white", color: activePage === "box" ? "white" : "black" }}
//             onClick={() => setActivePage("box")}
//           >
//             Box Label
//           </Button>
//         </Grid>
//         <Grid item>
//           <Button
//             variant="contained"
//             sx={{ bgcolor: activePage === "setting" ? "#f44336" : "white", color: activePage === "setting" ? "white" : "black" }}
//             onClick={() => setActivePage("setting")}
//           >
//             Setting
//           </Button>
//         </Grid>
//       </Grid>

//       {/* Bottom Section */}
//       <Box sx={{ bgcolor: "#f5f5f5", p: 4 }}>
//         <Grid container spacing={4}>
//           {/* -------- Mobile Page (Form) -------- */}
//           {activePage === "mobile" && (
//             <>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Company Name"
//                   name="company"
//                   value={formData.company}
//                   onChange={handleChange}
//                 >
//                   {companies.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="Model Number"
//                   name="model"
//                   value={formData.model}
//                   onChange={handleChange}
//                 >
//                   {models.map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Storage"
//                   name="storage"
//                   value={formData.storage}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="Selling Price"
//                   name="sellingPrice"
//                   value={formData.sellingPrice}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="MRP Price"
//                   name="mrp"
//                   value={formData.mrp}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   fullWidth
//                   label="IMEI Number"
//                   name="imei"
//                   value={formData.imei}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   select
//                   fullWidth
//                   label="RAM"
//                   name="ram"
//                   value={formData.ram}
//                   onChange={handleChange}
//                 >
//                   {["2GB", "4GB", "6GB", "8GB", "12GB"].map((option) => (
//                     <MenuItem key={option} value={option}>
//                       {option}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item xs={12}>
//                 <Button
//                   variant="contained"
//                   sx={{ bgcolor: "black", color: "white", mt: 2 }}
//                   onClick={handleSave}
//                 >
//                   Save
//                 </Button>
//               </Grid>
//             </>
//           )}

//           {/* -------- History Page (Table) -------- */}
//           {activePage === "accessories" && (
//             <Grid item xs={12}>
//               <Typography variant="h5" sx={{ mb: 2 }}>
//                 Mobile History
//               </Typography>
//               {mobileHistory.length === 0 ? (
//                 <Typography>No data added yet.</Typography>
//               ) : (
//                 <TableContainer component={Paper}>
//                   <Table>
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Company</TableCell>
//                         <TableCell>Model</TableCell>
//                         <TableCell>Storage</TableCell>
//                         <TableCell>Price</TableCell>
//                         <TableCell>IMEI</TableCell>
//                         <TableCell align="right">Actions</TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {mobileHistory.map((item) => (
//                         <TableRow key={item.id}>
//                           <TableCell>{item.company}</TableCell>
//                           <TableCell>{item.model}</TableCell>
//                           <TableCell>{item.storage}</TableCell>
//                           <TableCell>₹{item.sellingPrice}</TableCell>
//                           <TableCell>{item.imei}</TableCell>
//                           <TableCell align="right">
//                             <IconButton onClick={() => handleEdit(item)}>
//                               <EditIcon color="primary" />
//                             </IconButton>
//                             <IconButton onClick={() => handleDelete(item.id)}>
//                               <DeleteIcon color="secondary" />
//                             </IconButton>
//                             <IconButton onClick={() => handleOpenBarcode(item)}>
//                               <VisibilityIcon color="action" />
//                             </IconButton>
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//               )}
//             </Grid>
//           )}

//           {/* -------- Barcode Dialog -------- */}
//           <Dialog open={openBarcodeDialog} onClose={handleCloseBarcode}>
//             <DialogTitle sx={{ textAlign: 'center' }}>{barcodeLabel}</DialogTitle>
//             <DialogContent>
//               <Barcode
//                 value={barcodeValue}
//                 width={2}
//                 height={80}
//                 fontSize={16}
//               />
//             </DialogContent>
//           </Dialog>

//           {/* -------- Box Label Page -------- */}
//           {activePage === "box" && (
//             <Grid item xs={12}>
//               <Typography variant="h5" sx={{ mb: 2 }}>
//                 Last Saved Box Label
//               </Typography>
//               {!lastAccessory ? (
//                 <Typography>No items available for a box label.</Typography>
//               ) : (
//                 <Box
//                   sx={{
//                     border: "2px solid black",
//                     borderRadius: "8px",
//                     p: 4,
//                     textAlign: "center",
//                     bgcolor: "white",
//                   }}
//                 >
//                   <Typography variant="h5" sx={{ fontWeight: "bold" }}>
//                     {lastAccessory.model}
//                   </Typography>
//                   <Typography variant="h6">
//                     Price: ₹{lastAccessory.sellingPrice}
//                   </Typography>
//                   <Box sx={{ mt: 2 }}>
//                     <Barcode
//                       value={lastAccessory.imei || lastAccessory.sellingPrice}
//                       width={2}
//                       height={80}
//                       fontSize={16}
//                     />
//                   </Box>
//                 </Box>
//               )}
//             </Grid>
//           )}

//           {/* -------- Setting Page -------- */}
//           {activePage === "setting" && (
//             <>
//               <Grid item xs={12}>
//                 <Box
//                   sx={{
//                     border: "2px solid black",
//                     borderRadius: "4px",
//                     p: 2,
//                     textAlign: "left",
//                     bgcolor: "white",
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//                     Manage Company and Model Lists
//                   </Typography>
//                   <Typography variant="body1" sx={{ mb: 2 }}>
//                     Add, edit, or delete from the company and model lists.
//                   </Typography>
//                   <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
//                     Ceiling Price Table and Number Mapping
//                   </Typography>
//                 </Box>
//               </Grid>
//               <Grid item xs={12}>
//                 <Box
//                   sx={{
//                     border: "2px solid black",
//                     borderRadius: "4px",
//                     p: 2,
//                     bgcolor: "white",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {[
//                     "1 → A", "2 → N", "3 → K", "4 → U", "5 → S",
//                     "6 → H", "7 → M", "8 → E", "9 → D", "0 → G",
//                   ].map((item, i) => (
//                     <Typography key={i} variant="body1">
//                       {item}
//                     </Typography>
//                   ))}
//                 </Box>
//               </Grid>
//               <Grid item xs={12}>
//                 <Box
//                   sx={{
//                     border: "2px solid black",
//                     borderRadius: "4px",
//                     p: 3,
//                     bgcolor: "white",
//                   }}
//                 >
//                   <Typography variant="h6" sx={{ fontWeight: "bold" }}>
//                     Example:
//                   </Typography>
//                   <Typography variant="body1">• Price = 1599</Typography>
//                   <Typography variant="body1">• Code = ASDD</Typography>
//                   <Typography variant="body1">
//                     • The barcode will show "ASDD," which the customer won't understand. The employee can decode it to get the price of 1599.
//                   </Typography>
//                 </Box>
//               </Grid>
//             </>
//           )}
//         </Grid>
//       </Box>
//     </Box>
//   );
// }