 
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ProductForm from "./ProductForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProductModal({ open, setOpen, editItem, setEditItem }) {
   
  const handleClose = () => {
    setOpen(false);
    setEditItem({});
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} overflow={'auto'} height={600}>
          <ProductForm
            open={open}
            setOpen={setOpen}
            editItem={editItem}
            setEditItem={setEditItem}
          />
        </Box>
      </Modal>
    </div>
  );
}
