import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconifyIcon from 'components/base/IconifyIcon';
import BalanceBG from 'assets/images/balance-bg.png';
import CreditBalanceChart from './CreditBalanceChart';
import customShadows from 'theme/shadows';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import React from 'react';


interface CreditBalanceProps {
  id: number | string;
  type: string;
  time: string;
  amount: string;
  icon: string;
  color: string;
}

const creditBalanceData: CreditBalanceProps[] = [
  {
    id: 1,
    type: 'Bill & Taxes',
    time: 'Today, 16:36',
    amount: '-$154.50',
    icon: 'ic:baseline-domain',
    color: 'secondary.light',
  },
  {
    id: 2,
    type: 'Car Energy',
    time: '23 Jun, 13:06',
    amount: '-$40.50',
    icon: 'ic:baseline-electric-car',
    color: 'success.main',
  },
  {
    id: 3,
    type: 'Design Course',
    time: '21 Jun, 19:04',
    amount: '-$70.00',
    icon: 'ic:outline-school',
    color: 'warning.main',
  },
];

const CreditBalance = () => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    amount: '',
    description: '',
    date: '',
    User_id: 1,
  });
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
      amount: parseFloat(formData.amount),
      User_id: formData.User_id,
    };

    try {
      const response = await fetch('http://localhost:3000/budgetbuddy/api/transactions', { // Add /budgetbuddy prefix
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),      
      });

      const responseData = await response.json(); // Parse the response
      console.log('API Response:', responseData); // Log the response for debugging

      if (response.ok) {
        alert('Transaction added successfully!');
        setFormData({ amount: '', description: '', date: '', User_id: 1 });
        handleClose();
      } else {
        console.error('Error response:', responseData);
        alert(responseData.error || 'Failed to add transaction.');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message); // Log the error
      } else {
        console.error('Error:', error); // Log the error if it's not an instance of Error
      }
      alert('An error occurred while submitting the transaction.');
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Paper sx={{ height: 396 }}>
      <Box
        p={2}
        height={100}
        borderRadius={4}
        sx={{
          backgroundImage: `url('${BalanceBG}')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        boxShadow={customShadows[0]}
      >
        <Stack justifyContent="space-between">
          <Stack mt={0.25} alignItems="center" spacing={0.5}>
          <Button
            variant="outlined"
            size="medium"
            sx={{ color: 'text.buttons', borderColor: 'text.buttons' }}
            onClick={handleOpen}
          >
            Log A Transaction
          </Button>

          </Stack>

          <CreditBalanceChart
            data={[25, 12, 50, 40, 60]}
            sx={{ width: 80, height: '50px !important' }}
          />
        </Stack>
      </Box>

      <Typography mt={2} variant="body2" color="text.disabled" fontWeight={500}>
        Recent
      </Typography>

      {creditBalanceData.map((item) => (
        <Stack key={item.id} mt={1.25} mb={2.75} alignItems="center" justifyContent="space-between">
          <Stack spacing={2} alignItems="center" justifyContent="flex-start">
            <Stack
              alignItems="center"
              justifyContent="center"
              height={48}
              width={48}
              bgcolor="info.dark"
              borderRadius="50%"
            >
              <IconifyIcon icon={item.icon} color={item.color} fontSize="h4.fontSize" />
            </Stack>
            <Stack direction="column">
              <Typography variant="body1" fontWeight={700}>
                {item.type}
              </Typography>
              <Typography variant="caption" color="text.disabled" fontWeight={500}>
                {item.time}
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="body1" fontWeight={700}>
            {item.amount}
          </Typography>
        </Stack>
      ))}

      {/* Dialog Popup */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
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
              InputProps={{
                style: { color: 'inherit' }, // Ensure text color matches the theme
              }}
              InputLabelProps={{
                style: { color: 'inherit' }, // Ensure label color matches the theme
              }}
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default CreditBalance;