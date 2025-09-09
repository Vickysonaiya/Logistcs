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
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import Barcode from "react-barcode";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PrintIcon from "@mui/icons-material/Print";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { green } from "@mui/material/colors";

// --- Mock Data for Dropdowns and State ---
// This data will now be part of the main app's state
// and passed down to the components.
const initialCompanyOptions = ["Samsung", "Apple", "Xiaomi", "OnePlus", "Oppo", "Vivo"];
const initialModelOptions = {
  Samsung: ["Galaxy S23", "Galaxy A54", "Galaxy M34"],
  Apple: ["iPhone 14", "iPhone 13", "iPhone SE"],
  Xiaomi: ["Redmi Note 12", "Xiaomi 13 Pro"],
  OnePlus: ["OnePlus 11", "OnePlus Nord 3"],
  Oppo: ["Oppo Reno 10", "Oppo F23"],
  Vivo: ["Vivo V27", "Vivo T2"],
};
const RAM_OPTIONS = ["2GB", "4GB", "6GB", "8GB", "12GB"];
const initialPriceMap = {
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

// --- Helper Function for Price Encoding ---
const encodePrice = (price, priceMap) => {
  if (!price) return "";
  return String(price)
    .split("")
    .map((digit) => priceMap[digit] || digit)
    .join("");
};

// --- Barcode Modal Component ---
const BarcodeModal = ({ open, handleClose, item, priceMap }) => {
  if (!item) return null;

  const encodedPrice = encodePrice(item.sellingPrice, priceMap);
  const barcodeValue = item.imei || encodedPrice;

  const handlePrint = () => {
    const printContent = document.getElementById("barcode-print-content");
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Barcode</title>");
    printWindow.document.write('<style>@media print { body { margin: 0; } }</style>');
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
          sx={{ position: "absolute", right: 8, top: 8 }}
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
            {item.imei ? "IMEI" : "Price Code"}: {barcodeValue}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Barcode value={barcodeValue} width={2} height={80} fontSize={16} displayValue />
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

// --- Box Label Modal Component ---
const BoxLabelModal = ({ open, handleClose, companyOptions, modelOptions, priceMap }) => {
  const [formData, setFormData] = useState({
    company: "",
    sellingPrice: "",
    items: [],
  });

  const handleCompanyChange = (e) => {
    setFormData({ ...formData, company: e.target.value, items: [] });
  };

  const handleAddModel = () => {
    if (formData.company) {
      setFormData((prev) => ({
        ...prev,
        items: [...prev.items, { model: "", stock: "" }],
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const handlePrint = () => {
    const printContent = document.getElementById("box-label-print-content");
    const printWindow = window.open("", "_blank");
    printWindow.document.write("<html><head><title>Print Box Label</title>");
    printWindow.document.write('<style>@media print { body { margin: 0; } }</style>');
    printWindow.document.write("</head><body>");
    printWindow.document.write(printContent.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const availableModels = modelOptions[formData.company] || [];

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 350, sm: 500, md: 600 },
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
          Create Box Label
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Company Name"
              name="company"
              value={formData.company}
              onChange={handleCompanyChange}
              required
            >
              {companyOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Selling Price (for barcode)"
              name="sellingPrice"
              type="number"
              value={formData.sellingPrice}
              onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={handleAddModel}
              disabled={!formData.company}
              sx={{ mb: 2, bgcolor: "black", color: "white" }}
            >
              Add Model
            </Button>
          </Grid>
          {formData.items.map((item, index) => (
            <Grid container item spacing={2} key={index} alignItems="center">
              <Grid item xs={8}>
                <TextField
                  select
                  fullWidth
                  label={`Model ${index + 1}`}
                  value={item.model}
                  onChange={(e) => handleItemChange(index, "model", e.target.value)}
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
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Stock"
                  type="number"
                  value={item.stock}
                  onChange={(e) => handleItemChange(index, "stock", e.target.value)}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Print Preview Section */}
        <Box id="box-label-print-content" sx={{ textAlign: "center", p: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {formData.company}
          </Typography>
          {formData.items.length > 0 && (
            <List dense sx={{ width: "100%", maxWidth: 360, mx: "auto" }}>
              {formData.items.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemText
                    primary={item.model}
                    secondary={`Stock: ${item.stock}`}
                    primaryTypographyProps={{
                      variant: "h6",
                      fontWeight: "bold",
                    }}
                    secondaryTypographyProps={{
                      variant: "body1",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          )}
          {formData.sellingPrice && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">
                Price: ₹{formData.sellingPrice}
              </Typography>
              <Barcode
                value={encodePrice(formData.sellingPrice, priceMap)}
                width={2}
                height={80}
                fontSize={16}
                displayValue
              />
            </Box>
          )}
        </Box>

        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          disabled={!formData.company || formData.items.length === 0}
          sx={{ mt: 2, bgcolor: "black", color: "white" }}
        >
          Print Box Label
        </Button>
      </Box>
    </Modal>
  );
};

// --- Reusable Form Component ---
const EntryForm = ({ formData, setFormData, onSave, historyData, openBarcodeModal, companyOptions, modelOptions }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value, ...(name === "company" && { model: "" }) }));
  };

  const availableModels = modelOptions[formData.company] || [];

  return (
    <>
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
          {companyOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          select
          fullWidth
          label="Model Number"
          name="model"
          value={formData.model}
          onChange={handleChange}
          disabled={!formData.company}
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
          onClick={onSave}
          disabled={!formData.company || !formData.model || !formData.sellingPrice}
        >
          Save Entry
        </Button>
      </Grid>

      {/* --- History Section --- */}
      <Grid item xs={12}>
        <Typography variant="h6" sx={{ mt: 4, mb: 2, fontWeight: "bold" }}>
          Entry History
        </Typography>
      </Grid>
      {historyData.length === 0 ? (
        <Grid item xs={12}>
          <Typography>No data added yet.</Typography>
        </Grid>
      ) : (
        historyData
          .slice()
          .reverse()
          .map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Box
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  p: 2,
                  bgcolor: "white",
                  boxShadow: 1,
                  position: "relative",
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
                  <strong>IMEI:</strong> {item.imei || "N/A"}
                </Typography>

                <IconButton
                  aria-label="view barcode"
                  onClick={() => openBarcodeModal(item)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "#f44336",
                  }}
                >
                  <VisibilityIcon />
                </IconButton>
              </Box>
            </Grid>
          ))
      )}
    </>
  );
};

// --- New Settings Page Component ---
const SettingsPage = ({
  companyOptions,
  setCompanyOptions,
  modelOptions,
  setModelOptions,
  priceMap,
  setPriceMap,
  mobileData,
  setMobileData,
  accessoriesData,
  setAccessoriesData,
}) => {
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newModelName, setNewModelName] = useState("");
  const [selectedCompanyForModel, setSelectedCompanyForModel] = useState("");
  const [editCompanyIndex, setEditCompanyIndex] = useState(null);
  const [editModelDetails, setEditModelDetails] = useState({
    company: "",
    index: null,
    value: "",
  });

  const [updatePrice, setUpdatePrice] = useState({
    company: "",
    model: "",
    newPrice: "",
  });

  // Category (Company) Management
  const handleAddCompany = () => {
    if (newCompanyName && !companyOptions.includes(newCompanyName)) {
      setCompanyOptions([...companyOptions, newCompanyName]);
      setModelOptions({ ...modelOptions, [newCompanyName]: [] });
      setNewCompanyName("");
    }
  };

  const handleDeleteCompany = (companyToDelete) => {
    setCompanyOptions(companyOptions.filter((c) => c !== companyToDelete));
    const newModels = { ...modelOptions };
    delete newModels[companyToDelete];
    setModelOptions(newModels);
  };

  const handleEditCompany = (index) => {
    setEditCompanyIndex(index);
    setNewCompanyName(companyOptions[index]);
  };

  const handleSaveCompanyEdit = () => {
    if (editCompanyIndex !== null && newCompanyName) {
      const oldName = companyOptions[editCompanyIndex];
      const newOptions = [...companyOptions];
      newOptions[editCompanyIndex] = newCompanyName;
      setCompanyOptions(newOptions);
      const newModels = { ...modelOptions };
      newModels[newCompanyName] = newModels[oldName] || [];
      if (oldName !== newCompanyName) {
        delete newModels[oldName];
      }
      setModelOptions(newModels);
      setEditCompanyIndex(null);
      setNewCompanyName("");
    }
  };

  // Sub Category (Model) Management
  const handleAddModel = () => {
    if (selectedCompanyForModel && newModelName) {
      const newModels = { ...modelOptions };
      newModels[selectedCompanyForModel] = [...(newModels[selectedCompanyForModel] || []), newModelName];
      setModelOptions(newModels);
      setNewModelName("");
    }
  };

  const handleDeleteModel = (company, modelToDelete) => {
    const newModels = { ...modelOptions };
    newModels[company] = newModels[company].filter((m) => m !== modelToDelete);
    setModelOptions(newModels);
  };

  const handleEditModel = (company, index, value) => {
    setEditModelDetails({ company, index, value });
  };

  const handleSaveModelEdit = () => {
    if (editModelDetails.company && editModelDetails.index !== null && editModelDetails.value) {
      const newModels = { ...modelOptions };
      newModels[editModelDetails.company][editModelDetails.index] = editModelDetails.value;
      setModelOptions(newModels);
      setEditModelDetails({ company: "", index: null, value: "" });
    }
  };

  // Price Encoding
  const handlePriceMapChange = (digit, value) => {
    setPriceMap({ ...priceMap, [digit]: value });
  };

  // Update Price for a Model
  const handleUpdatePrice = () => {
    const { company, model, newPrice } = updatePrice;
    if (company && model && newPrice) {
      const parsedPrice = parseFloat(newPrice);
      if (!isNaN(parsedPrice)) {
        // Update Mobile Data
        const updatedMobileData = mobileData.map((item) =>
          item.company === company && item.model === model
            ? { ...item, sellingPrice: parsedPrice }
            : item
        );
        setMobileData(updatedMobileData);

        // Update Accessories Data
        const updatedAccessoriesData = accessoriesData.map((item) =>
          item.company === company && item.model === model
            ? { ...item, sellingPrice: parsedPrice }
            : item
        );
        setAccessoriesData(updatedAccessoriesData);

        setUpdatePrice({ company: "", model: "", newPrice: "" });
        alert(`Successfully updated selling price for ${company} ${model} to ₹${parsedPrice}`);
      } else {
        alert("Please enter a valid number for the new price.");
      }
    } else {
      alert("Please select a company, model, and enter a new price.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, color: "#f44336" }}>
        Settings
      </Typography>

      <Grid container spacing={4}>
        {/* Company Name / Category */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Company (Category) Management
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                fullWidth
                label="Add/Edit Company"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
              />
              <IconButton onClick={editCompanyIndex !== null ? handleSaveCompanyEdit : handleAddCompany} color="primary">
                {editCompanyIndex !== null ? <SaveIcon sx={{ color: green[500] }} /> : <AddIcon />}
              </IconButton>
            </Box>
            <List dense>
              {companyOptions.map((company, index) => (
                <ListItem
                  key={company}
                  secondaryAction={
                    <>
                      <IconButton onClick={() => handleEditCompany(index)} edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteCompany(company)} edge="end" aria-label="delete">
                        <DeleteIcon color="error" />
                      </IconButton>
                    </>
                  }
                >
                  <ListItemText primary={company} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>

        {/* Model Number / Sub Category */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Model (Sub Category) Management
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Select Company"
                  value={selectedCompanyForModel}
                  onChange={(e) => setSelectedCompanyForModel(e.target.value)}
                >
                  {companyOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    label="Add New Model"
                    value={newModelName}
                    onChange={(e) => setNewModelName(e.target.value)}
                    disabled={!selectedCompanyForModel}
                  />
                  <IconButton onClick={handleAddModel} color="primary" disabled={!selectedCompanyForModel}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <List dense>
                  {(modelOptions[selectedCompanyForModel] || []).map((model, index) => (
                    <ListItem
                      key={model}
                      secondaryAction={
                        <>
                          <IconButton onClick={() => handleEditModel(selectedCompanyForModel, index, model)} edge="end" aria-label="edit">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDeleteModel(selectedCompanyForModel, model)} edge="end" aria-label="delete">
                            <DeleteIcon color="error" />
                          </IconButton>
                        </>
                      }
                    >
                      {editModelDetails.company === selectedCompanyForModel && editModelDetails.index === index ? (
                        <Box sx={{ display: "flex", gap: 1, width: "100%", alignItems: "center" }}>
                          <TextField
                            fullWidth
                            value={editModelDetails.value}
                            onChange={(e) => setEditModelDetails({ ...editModelDetails, value: e.target.value })}
                          />
                          <IconButton onClick={handleSaveModelEdit} color="primary">
                            <SaveIcon sx={{ color: green[500] }} />
                          </IconButton>
                        </Box>
                      ) : (
                        <ListItemText primary={model} />
                      )}
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Price Encoding Map */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Price Encoding Map
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {Object.keys(priceMap).map((digit) => (
                <TextField
                  key={digit}
                  label={digit}
                  value={priceMap[digit]}
                  onChange={(e) => handlePriceMapChange(digit, e.target.value)}
                  sx={{ width: 60 }}
                  inputProps={{ maxLength: 1 }}
                />
              ))}
            </Box>
            <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: "bold" }}>
              Example:
            </Typography>
            <Typography variant="body1">
              Price = 1599
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Code = {encodePrice(1599, priceMap)}
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              This price code will be displayed on the barcode label.
            </Typography>
          </Box>
        </Grid>

        {/* Update Price for a Model */}
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: "8px" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
              Update Selling Price for Model
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Company"
                  value={updatePrice.company}
                  onChange={(e) => setUpdatePrice({ ...updatePrice, company: e.target.value, model: "" })}
                >
                  {companyOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Model"
                  value={updatePrice.model}
                  onChange={(e) => setUpdatePrice({ ...updatePrice, model: e.target.value })}
                  disabled={!updatePrice.company}
                >
                  {(modelOptions[updatePrice.company] || []).map((model) => (
                    <MenuItem key={model} value={model}>
                      {model}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Selling Price"
                  type="number"
                  value={updatePrice.newPrice}
                  onChange={(e) => setUpdatePrice({ ...updatePrice, newPrice: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleUpdatePrice}
                  sx={{ bgcolor: "black", color: "white" }}
                >
                  Update Price
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// --- Main Component ---
export default function MobilePage() {
  const [activePage, setActivePage] = useState("mobile");
  const [companyOptions, setCompanyOptions] = useState(initialCompanyOptions);
  const [modelOptions, setModelOptions] = useState(initialModelOptions);
  const [priceMap, setPriceMap] = useState(initialPriceMap);

  const [mobileData, setMobileData] = useState([]);
  const [accessoriesData, setAccessoriesData] = useState([]);

  const [mobileForm, setMobileForm] = useState({
    company: "",
    model: "",
    storage: "",
    sellingPrice: "",
    mrp: "",
    imei: "",
    ram: "",
  });

  const [accessoryForm, setAccessoryForm] = useState({
    company: "",
    model: "",
    storage: "",
    sellingPrice: "",
    mrp: "",
    imei: "",
    ram: "",
  });

  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState(false);
  const [isBoxLabelModalOpen, setIsBoxLabelModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openBarcodeModal = (item) => {
    setSelectedItem(item);
    setIsBarcodeModalOpen(true);
  };
  const handleCloseBarcodeModal = () => {
    setIsBarcodeModalOpen(false);
    setSelectedItem(null);
  };
  const handleOpenBoxLabelModal = () => {
    setIsBoxLabelModalOpen(true);
  };
  const handleCloseBoxLabelModal = () => {
    setIsBoxLabelModalOpen(false);
  };

  const handleSaveMobile = () => {
    setMobileData((prev) => [...prev, { ...mobileForm, id: Date.now() }]);
    setMobileForm({
      company: "",
      model: "",
      storage: "",
      sellingPrice: "",
      mrp: "",
      imei: "",
      ram: "",
    });
  };

  const handleSaveAccessory = () => {
    setAccessoriesData((prev) => [...prev, { ...accessoryForm, id: Date.now() }]);
    setAccessoryForm({
      company: "",
      model: "",
      storage: "",
      sellingPrice: "",
      mrp: "",
      imei: "",
      ram: "",
    });
  };

  return (
    <Box sx={{ backgroundColor: "#f44336", p: 2, minHeight: "100vh" }}>
      {/* Top Menu */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              bgcolor: activePage === "mobile" ? "black" : "white",
              color: activePage === "mobile" ? "white" : "black",
            }}
            onClick={() => setActivePage("mobile")}
          >
            Mobile Entry
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              bgcolor: activePage === "accessories" ? "black" : "white",
              color: activePage === "accessories" ? "white" : "black",
            }}
            onClick={() => setActivePage("accessories")}
          >
            Accessories Entry
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              bgcolor: activePage === "box-label" ? "black" : "white",
              color: activePage === "box-label" ? "white" : "black",
            }}
            onClick={() => setActivePage("box-label")}
          >
            Box Label
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            sx={{
              bgcolor: activePage === "settings" ? "black" : "white",
              color: activePage === "settings" ? "white" : "black",
            }}
            onClick={() => setActivePage("settings")}
          >
            Settings
          </Button>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Box sx={{ bgcolor: "#f5f5f5", minHeight: "calc(100vh - 80px)", p: 4, borderRadius: "8px" }}>
        <Grid container spacing={3}>
          {activePage === "mobile" && (
            <EntryForm
              formData={mobileForm}
              setFormData={setMobileForm}
              onSave={handleSaveMobile}
              historyData={mobileData}
              openBarcodeModal={openBarcodeModal}
              companyOptions={companyOptions}
              modelOptions={modelOptions}
            />
          )}

          {activePage === "accessories" && (
            <EntryForm
              formData={accessoryForm}
              setFormData={setAccessoryForm}
              onSave={handleSaveAccessory}
              historyData={accessoriesData}
              openBarcodeModal={openBarcodeModal}
              companyOptions={companyOptions}
              modelOptions={modelOptions}
            />
          )}
          {activePage === "box-label" && (
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleOpenBoxLabelModal}
                sx={{ bgcolor: "black", color: "white" }}
              >
                Create New Box Label
              </Button>
            </Grid>
          )}

          {activePage === "settings" && (
            <SettingsPage
              companyOptions={companyOptions}
              setCompanyOptions={setCompanyOptions}
              modelOptions={modelOptions}
              setModelOptions={setModelOptions}
              priceMap={priceMap}
              setPriceMap={setPriceMap}
              mobileData={mobileData}
              setMobileData={setMobileData}
              accessoriesData={accessoriesData}
              setAccessoriesData={setAccessoriesData}
            />
          )}
        </Grid>
      </Box>

      {/* Barcode Modal */}
      <BarcodeModal open={isBarcodeModalOpen} handleClose={handleCloseBarcodeModal} item={selectedItem} priceMap={priceMap} />

      {/* Box Label Modal */}
      <BoxLabelModal open={isBoxLabelModalOpen} handleClose={handleCloseBoxLabelModal} companyOptions={companyOptions} modelOptions={modelOptions} priceMap={priceMap} />
    </Box>
  );
}