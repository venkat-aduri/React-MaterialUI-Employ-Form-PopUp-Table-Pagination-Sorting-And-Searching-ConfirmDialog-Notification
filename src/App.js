import './App.css';
import React, { useState } from 'react';
import useTable from './components/useTable';
import { Paper, TableBody, TableRow, TableCell, Toolbar, makeStyles, InputAdornment } from '@material-ui/core';
import Input from './components/controls/Input';
import { Search } from '@material-ui/icons';
import Button from './components/controls/Button';
import Popup from "./components/Popup";
import AddIcon from '@material-ui/icons/Add';
import EmployeeForm from './pages/employees/EmployeeForm';
import Notification from './components/Notification';
import ConfirmDialog from './components/ConfirmDialog';
import Controls from './components/controls/Controls';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme=>({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3)
  },
  searchInput:{
    width : '75%'
  },
  newButton: {
    position: 'absolute',
    right: '10px'
}
}));

const records1 = [

  { id : 101, fullName : "Hello_1", email : "email1@gmail.com", department : "Training" },
  { id : 102, fullName : "Hello_2", email : "email2@gmail.com", department : "Training2" },
  { id : 103, fullName : "Hello_3", email : "email3@gmail.com", department : "Training3" },
  { id : 104, fullName : "Hello_4", email : "email4@gmail.com", department : "Training4" },
  { id : 105, fullName : "Hello_5", email : "email5@gmail.com", department : "Training5" },
  { id : 106, fullName : "Hello_6", email : "email6@gmail.com", department : "Training6" },
  { id : 107, fullName : "Hello_7", email : "email7@gmail.com", department : "Training7" },
  { id : 108, fullName : "Hello_8", email : "email8@gmail.com", department : "Training8" }

];

const headCells = [

  { id : "id", label : "ID"},
  { id : "fullName", label : "Full Name"},
  { id : "email", label : "Email (Personal)"},
  { id : "department", label : "Department"},
  { id: 'actions', label: 'Actions', disableSorting: true }

];



function App() {

  const classes = useStyles();

  const [records, setRecords] = useState(records1);
  const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting } = useTable(records,headCells,filterFn);

    const handleSearch = e => {
      let target = e.target;
      let searchString = target.value;
      setFilterFn({
          fn: items => {
              if (searchString == "")
                  return items;
              else
                  return items.filter(x =>( x.fullName.toLowerCase().includes(searchString.toLowerCase())
                                        ||  x.email.toLowerCase().includes(searchString.toLowerCase())
                                        ||  x.department.toLowerCase().includes(searchString.toLowerCase())
                                        ||  x.id == searchString
                  ))
          }
      })
    };

    const addOrEdit = (employee, resetForm) => {
      if (employee.id == 0){

      }
         // employeeService.insertEmployee(employee)
      else{

      }
         // employeeService.updateEmployee(employee)
      resetForm()
      setRecordForEdit(null)
      setOpenPopup(false)
      //setRecords(employeeService.getAllEmployees())
      setNotify({
          isOpen: true,
          message: 'Submitted Successfully',
          type: 'success'
      })
    };

  const openInPopup = item => {
      setRecordForEdit(item);
      setOpenPopup(true);
  };

  const onDelete = id => {
      setConfirmDialog({
          ...confirmDialog,
          isOpen: false
      });
      // employeeService.deleteEmployee(id);
      // setRecords(employeeService.getAllEmployees());
      setNotify({
          isOpen: true,
          message: 'Deleted Successfully',
          type: 'error'
      });
  };

  return (
    <div >
      <Paper className={classes.pageContent}>
        <Toolbar>
            <Input
                label="Search Employees"
                className={classes.searchInput}
                InputProps={{
                    startAdornment: (<InputAdornment position="start">
                        <Search />
                    </InputAdornment>)
                }}
                onChange={handleSearch}
            />
            <Button
                text="Add New"
                variant="outlined"
                startIcon={<AddIcon />}
                className={classes.newButton}
                onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
            />
        </Toolbar>
        <TblContainer>
          <TblHead/>
          <TableBody>
            {
              recordsAfterPagingAndSorting().map(record => (
                <TableRow key={record.id}>
                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.fullName}</TableCell>
                  <TableCell>{record.email}</TableCell>
                  <TableCell>{record.department}</TableCell>
                  <TableCell>
                      <Controls.ActionButton
                          color="primary"
                          onClick={() => { openInPopup(record) }}>
                          <EditOutlinedIcon fontSize="small" />
                      </Controls.ActionButton>
                      <Controls.ActionButton
                          color="secondary"
                          onClick={() => {
                              setConfirmDialog({
                                  isOpen: true,
                                  title: 'Are you sure to delete this record?',
                                  subTitle: "You can't undo this operation",
                                  onConfirm: () => { onDelete(record.id) }
                              })
                          }}>
                          <CloseIcon fontSize="small" />
                      </Controls.ActionButton>
                  </TableCell>
                </TableRow>
              ))
            }

          </TableBody> 
        </TblContainer>
        <TblPagination/>
      </Paper>
      <Popup
          title="Employee Form"
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
      >
          <EmployeeForm
              recordForEdit={recordForEdit}
              addOrEdit={addOrEdit} 
          />  
      </Popup>
      <Notification
          notify={notify}
          setNotify={setNotify}
      />
      <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
      />

    </div>
  );
};

export default App;
