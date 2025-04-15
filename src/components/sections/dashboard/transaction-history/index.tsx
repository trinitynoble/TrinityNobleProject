import { useState } from 'react';
import { TextField, Container } from '@mui/material';
import TransactionHistoryTable from './TransactionHistoryTable';

const TransactionHistory = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <Container>
      <TextField
        label="Search Transactions"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchText(e.target.value)}
      />
      <TransactionHistoryTable searchText={searchText} />
    </Container>
  );
};

export default TransactionHistory;
