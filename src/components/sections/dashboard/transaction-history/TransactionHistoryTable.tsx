import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DataGrid,
  GridColDef,
  useGridApiRef,
  GridRowModesModel,
  GridRowModes,
  GridActionsCellItem,
  GridRowEditStopReasons
} from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';

interface Transaction {
  Transaction_id: number;
  amount: number;
  description: string;
  date: string;
  User_id: number;
  id: number; // Required for DataGrid
}

interface Props {
  searchText: string;
}

const TransactionHistoryTable = ({ searchText }: Props) => {
  const apiRef = useGridApiRef();
  const [rows, setRows] = useState<Transaction[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const fetchTransactions = async () => {
    const res = await axios.get('http://localhost:3000/budgetbuddy/api/transactions');
    const dataWithId = res.data.map((tx: Transaction) => ({ ...tx, id: tx.Transaction_id }));
    setRows(dataWithId);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    apiRef.current?.setQuickFilterValues(searchText.split(/\b\W+\b/).filter(Boolean));
  }, [searchText]);

  const handleEditClick = (id: number) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: number) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: number) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const handleDeleteClick = (id: number) => async () => {
    await axios.delete(`http://localhost:3000/budgetbuddy/api/transactions/${id}`);
    setRows(rows.filter((r) => r.id !== id));
  };

  const processRowUpdate = async (newRow: Transaction) => {
    await axios.put(`http://localhost:3000/budgetbuddy/api/transactions/${newRow.Transaction_id}`, {
      amount: newRow.amount,
      description: newRow.description,
      date: newRow.date
    });
    return newRow;
  };

  const columns: GridColDef[] = [
    { field: 'Transaction_id', headerName: 'Transaction ID', width: 120, editable: false },
    { field: 'description', headerName: 'Description', flex: 2, editable: true },
    { field: 'amount', headerName: 'Amount', type: 'number', flex: 1, editable: true },
    { field: 'date', headerName: 'Date', flex: 1.5, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      getActions: ({ id }) => {
        const isEditing = rowModesModel[id]?.mode === GridRowModes.Edit;
        return isEditing
          ? [
              <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(Number(id))} />,
              <GridActionsCellItem icon={<CancelIcon />} label="Cancel" onClick={handleCancelClick(Number(id))} />
            ]
          : [
              <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(Number(id))} />,
              <GridActionsCellItem icon={<DeleteIcon />} label="Delete" onClick={handleDeleteClick(Number(id))} />
            ];
      }
    }
  ];

  return (
    <DataGrid
      apiRef={apiRef}
      rows={rows}
      columns={columns}
      autoHeight
      checkboxSelection
      disableRowSelectionOnClick
      rowModesModel={rowModesModel}
      onRowEditStop={(params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
          event.defaultMuiPrevented = true;
        }
      }}
      processRowUpdate={processRowUpdate}
      experimentalFeatures={{}}
      paginationModel={{ pageSize: 5, page: 0 }}
      pageSizeOptions={[5]}
    />
  );
};

export default TransactionHistoryTable;
