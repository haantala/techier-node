'use client'

import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Button, Card, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from '@iconify-icon/react'

import UserForm from './form'
import { deleteData, getData, updateData } from '@/@core/api/common_api'
import { deleteDataList, getDataList, updateDataList } from '@/redux/reducers/data'
import { deleteSweetAlert, handleToast } from '@/utils/utils'

interface Column {
  id: 'serial' | 'data_id' | 'firstname' | 'lastname' | 'mobile' | 'email' | 'actions'
  label: string
  minWidth?: number
  align?: 'center'
  format?: (value: any) => string
}

const columns: readonly Column[] = [
  { id: 'serial', label: 'No.', minWidth: 50 },
  { id: 'firstname', label: 'First Name', minWidth: 170, align: 'center' },
  { id: 'lastname', label: 'Last Name', minWidth: 170, align: 'center' },
  { id: 'mobile', label: 'Mobile No.', minWidth: 170, align: 'center' },
  { id: 'email', label: 'Email Id', minWidth: 170, align: 'center' },
  { id: 'actions', label: 'Actions', minWidth: 150 }
]

const StickyHeadTable = () => {
  const dispatch = useDispatch()
  const [page, setPage] = React.useState(0)
  const [FilterData, setFilterData] = React.useState<string | undefined>(undefined)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [dialog, setDialog] = React.useState(false)
  const [editingRow, setEditingRow] = React.useState<number | null>(null)
  const [editedRowData, setEditedRowData] = React.useState<any>({})
  const { Datalist } = useSelector((store: any) => store.Data)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleGetData = async () => {
    try {
      const res = await getData()

      if (res.status) {
        dispatch(getDataList(res.data))
      }
    } catch (err) {
      alert(err)
    }
  }

  const handleDataFilter = () => {
    if (!FilterData) {
      return Datalist
    }

    const searchTerm = FilterData.toLowerCase()

    return Datalist.filter((row: any) => {
      const matchDataFirstName = row?.firstname?.toLowerCase().includes(searchTerm)
      const matchDataLastName = row?.lastname?.toLowerCase().includes(searchTerm)
      const matchDataEmail = row?.email?.toLowerCase().includes(searchTerm)
      const matchDataMobile = row?.mobile?.toLowerCase().includes(searchTerm)

      return matchDataFirstName || matchDataLastName || matchDataEmail || matchDataMobile
    })
  }

  React.useEffect(() => {
    if (Datalist?.length === 0) {
      handleGetData()
    }
  }, [Datalist])

  const handleEdit = (row: any) => {
    setEditingRow(row.data_id)
    setEditedRowData(row)
  }

  const handleDeleteData = async (id: any) => {
    try {
      const result = await deleteSweetAlert({})

      if (result.isConfirmed) {
        const res = await deleteData({ data_id: id })

        if (res.status === 1) {
          dispatch(deleteDataList(id))
          handleToast(res.status, res.description)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedRowData({
      ...editedRowData,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    try {
      const res = await updateData(editedRowData)

      if (res.status === 1) {
        dispatch(updateDataList(res.data))
        handleToast(res.status, res.description)
      }
    } catch (err) {
      console.error(err)
    }

    setEditingRow(null)
  }

  const handleCancel = () => {
    setEditingRow(null)
  }

  return (
    <React.Fragment>
      <Card sx={{ mb: 2, px: 2, width: '100%' }}>
        <Stack spacing={1} flexGrow={1} direction='row' justifyContent='flex-end' sx={{ p: 2 }}>
          <TextField
            sx={{
              width: 'auto',
              mr: 2,
              my: { xs: 1, sm: 0 }
            }}
            size='small'
            name='search'
            label='Search'
            onChange={e => setFilterData(e.target.value)}
          />
          <Button variant='contained' onClick={() => setDialog(true)} color='primary' sx={{ mr: 2 }}>
            Add
          </Button>
        </Stack>
      </Card>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(FilterData?.length ? handleDataFilter() : Datalist)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: { [x: string]: any; data_id: React.Key | null | undefined }, index: number) => (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.data_id}>
                    {columns.map(column => {
                      const value = column.id === 'serial' ? page * rowsPerPage + index + 1 : row[column.id]
                      const isEditing = editingRow === row.data_id

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'actions' ? (
                            <React.Fragment>
                              {editingRow !== null ? (
                                <React.Fragment>
                                  <Tooltip title='Save' arrow key='save'>
                                    <IconButton color='success' onClick={handleSave}>
                                      <Icon icon='weui:done-filled' />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title='Cancel' arrow key='cancel'>
                                    <IconButton color='error' onClick={handleCancel}>
                                      <Icon icon='weui:close-filled' />
                                    </IconButton>
                                  </Tooltip>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <Tooltip title='Edit' arrow key='edit'>
                                    <IconButton color='success' onClick={() => handleEdit(row)}>
                                      <Icon icon='akar-icons:edit' />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title='Delete' arrow key='delete'>
                                    <IconButton onClick={() => handleDeleteData(row.data_id)} color='error'>
                                      <Icon icon='maki:waste-basket' />
                                    </IconButton>
                                  </Tooltip>
                                </React.Fragment>
                              )}
                            </React.Fragment>
                          ) : column.id === 'serial' ? (
                            value
                          ) : isEditing ? (
                            <TextField
                              name={column.id}
                              value={editedRowData[column.id] || ''}
                              onChange={handleFieldChange}
                              size='small'
                            />
                          ) : column.format ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={FilterData?.length ? handleDataFilter()?.lenght : Datalist.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Dialog open={dialog} onClose={handleCancel} fullWidth maxWidth='xs'>
        <DialogTitle>{'Add Data'}</DialogTitle>
        <DialogContent>
          <UserForm setDialog={setDialog} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default StickyHeadTable
