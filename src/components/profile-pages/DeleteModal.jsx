import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const style = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  zIndex: 9999,
};

export default function DeleteModal({ open, handleClose, handleConfirm }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
    >
      <Box sx={style}>
        <Typography variant="h6" component="h2" className="mb-4">
          Elanı silmək istədiyinizə əminsiniz?
        </Typography>
        <div className="flex justify-end gap-4">
          <Button onClick={handleClose} variant="outlined">İmtina</Button>
          <Button onClick={handleConfirm} variant="contained" color="error">Sil</Button>
        </div>
      </Box>
    </Modal>
  );
}
