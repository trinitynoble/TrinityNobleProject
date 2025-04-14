import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

const Clients = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: '',
    userId: 1,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (!formData.amount || !formData.description || !formData.date) {
      alert('Please fill in all fields.');
      return;
    }

    const payload = {
      ...formData,
      amount: parseFloat(formData.amount), // Ensure it's a number
    };

    try {
      const response = await fetch('http://localhost:3000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      

      if (response.ok) {
        alert('Expense added successfully!');
        setFormData({ amount: '', description: '', date: '', userId: 1 });
        handleClose();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert(errorData.error || 'Failed to add expense.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the expense.');
    }
  };

  return (
    <Paper
      component={Stack}
      alignItems="center"
      justifyContent="center"
      sx={{ px: 2, py: 3 }}
    >
      <Stack alignItems="center" spacing={2}>
        <Button
          variant="outlined"
          size="large"
          sx={{ color: 'text.disabled', borderColor: 'text.disabled' }}
          onClick={handleOpen}
        >
          Log Monthly Expenses
        </Button>
      </Stack>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Expense</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Clients;
