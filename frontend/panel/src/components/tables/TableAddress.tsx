// ** React Imports
import { useCallback, useEffect, useMemo, useState } from 'react'

// ** MUI Imports
import {
  Box,
  Tooltip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  DialogActions,
  styled,
  ButtonProps,
  useTheme,
  useMediaQuery
} from '@mui/material'

// ** Icons Imports
import { Delete, Pencil, Plus } from 'mdi-material-ui'

// ** MaterialReactTable Imports
import MaterialReactTable, {
  MRT_Cell,
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_FullScreenToggleButton,
  MRT_PaginationState,
  MRT_Row,
  MRT_ShowHideColumnsButton,
  MRT_SortingState,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFiltersButton,
  MRT_ToggleGlobalFilterButton,
  MaterialReactTableProps
} from 'material-react-table'
import { MRT_Localization_FA } from 'material-react-table/locales/fa'

// ** Services Import
import BasicService, { Address } from '@/services/basic.service'
import { User } from '@/services/auth.service'
import { InputColumnFiltersModel } from '@/services/param'

// ** Comnfirmation Import
import { useConfirmation } from '@/context/confirmationContext'

// ** Import libraries
import ExportButton from '../ExportButton'
import UserSelect from '../UserSelect'

// ** Redux Imports
import { isCustomerUser } from '@/redux/slices/authSlice'
import { useSelector } from 'react-redux'

const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const TableAddress = () => {
  // ** Hook
  const theme = useTheme()

  // ** Vars
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const columnPinning = isSmallScreen ? {} : { right: ['mrt-row-actions'] }

  // ** Confirm
  const { confirm } = useConfirmation()

  // ** Global State
  const isUser = useSelector(isCustomerUser)

  // ** States
  const [data, setData] = useState<Address[]>([])
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRefetching, setIsRefetching] = useState(false)
  const [rowCount, setRowCount] = useState(0)
  const [refreshKey, setRefreshKey] = useState(0)

  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [validationErrors, setValidationErrors] = useState<{
    [cellId: string]: string
  }>({})

  //table state
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<MRT_SortingState>([
    {
      id: 'id',
      desc: true
    }
  ])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })

  useEffect(() => {
    const fetchData = async () => {
      if (!data.length) {
        setIsLoading(true)
      } else {
        setIsRefetching(true)
      }

      try {
        const response = await BasicService.getAllAddress(
          pagination.pageSize,
          pagination.pageIndex + 1,
          globalFilter,
          columnFilters as InputColumnFiltersModel[],
          sorting
        )

        setData(response.data)
        setRowCount(response.meta.totalItems)
      } catch (error) {
        setIsError(true)
      }
      setIsError(false)
      setIsLoading(false)
      setIsRefetching(false)
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting, refreshKey])

  const handleCreateNewRow = async (values: Address) => {
    try {
      if (isUser) {
        await BasicService.createAddress(values)
      } else {
        await BasicService.createAddressForOtherUser({ ...values, user_id: +values.user.id })
      }

      setRefreshKey(key => key + 1)
    } catch (error) {}
  }

  const handleSaveRowEdits: MaterialReactTableProps<Address>['onEditingRowSave'] = async ({
    exitEditingMode,
    values
  }) => {
    if (!Object.keys(validationErrors).length) {
      try {
        await BasicService.editAddress(values.id, values)

        setRefreshKey(key => key + 1)
      } catch (error) {}

      exitEditingMode()
    }
  }

  const handleCancelRowEdits = () => {
    setValidationErrors({})
  }

  const handleDeleteRow = useCallback(async (row: MRT_Row<Address>) => {
    const id: number = row.getValue('id')
    const name = row.original.title

    if (id) {
      confirm({ groupName: 'آدرس', name })
        .then(async () => {
          try {
            await BasicService.deleteAddress(id)

            setRefreshKey(key => key + 1)
          } catch (error) {}
        })
        .catch()
    }
  }, [])

  const getCommonEditTextFieldProps = useCallback(
    (cell: MRT_Cell<Address>): MRT_ColumnDef<Address>['muiTableBodyCellEditTextFieldProps'] => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: event => {
          const isValid =
            cell.column.id === 'email'
              ? validateEmail(event.target.value)
              : cell.column.id === 'age'
              ? validateAge(+event.target.value)
              : validateRequired(event.target.value)
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} نیاز می باشد.`
            })
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id]
            setValidationErrors({
              ...validationErrors
            })
          }
        }
      }
    },
    [validationErrors]
  )

  const columns = useMemo<MRT_ColumnDef<Address>[]>(
    () =>
      [
        {
          accessorKey: 'id',
          header: 'کد',
          enableEditing: false,
          enableColumnOrdering: false,
          size: 80,
          exportData: {
            width: 5
          }
        },
        {
          accessorKey: 'user',
          enableEditing: false,
          header: 'کاربر',
          accessorFn: (row: Partial<Address>) => `${row?.user?.first_name || ''} ${row?.user?.last_name || ''}`,
          id: 'account',
          size: 240,
          exportData: {
            width: 25,
            accessorFn: (row: Partial<Address>) => `${row?.user?.first_name || ''} ${row?.user?.last_name || ''}`
          }
        },
        {
          accessorKey: 'title',
          header: 'عنوان',
          size: 180,
          exportData: {
            width: 20
          }
        },
        {
          accessorKey: 'phone',
          header: 'تلفن',
          size: 200,
          exportData: {
            width: 15
          }
        },
        {
          accessorKey: 'mobile_phone',
          header: 'شماره همراه',
          size: 140,
          exportData: {
            width: 15
          }
        },
        {
          accessorKey: 'city',
          header: 'شهر',
          exportData: {
            width: 40
          }
        },
        {
          accessorKey: 'address',
          header: 'آدرس',
          size: 340,
          exportData: {
            width: 40
          }
        },
        {
          accessorKey: 'postal_code',
          header: 'کد پستی',
          exportData: {
            width: 15
          }
        },
        {
          accessorKey: 'national_code',
          header: 'شناسه ملی',
          exportData: {
            width: 15
          }
        },
        {
          accessorKey: 'economic_code',
          header: 'کد اقتصادی',
          exportData: {
            width: 15
          }
        }
      ].filter(Boolean) as MRT_ColumnDef<Address>[],
    [getCommonEditTextFieldProps]
  )

  const handleFetchAllData = async () => {
    return BasicService.getAllAddress().then(data => data.data)
  }

  return (
    <>
      <MaterialReactTable
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center'
            },
            size: 80
          }
        }}
        columns={columns}
        data={data}
        enableRowSelection={false}
        initialState={{
          showColumnFilters: false
        }}
        positionActionsColumn='last'
        enableHiding={false}
        manualFiltering
        manualPagination
        manualSorting
        muiToolbarAlertBannerProps={
          isError
            ? {
                color: 'error',
                children: 'خطا در دریافت اطلاعات'
              }
            : undefined
        }
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        rowCount={rowCount}
        state={{
          columnFilters,
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          sorting,
          columnPinning
        }}
        localization={MRT_Localization_FA}
        muiTableBodyRowProps={{
          sx: theme => ({
            background: theme.palette.background.paper
          })
        }}
        muiTableBodyCellProps={({}) => ({
          sx: {
            // fontWeight: 600,
            // fontSize: '0.980rem'
          }
        })}
        editingMode='modal'
        enableColumnOrdering
        enableEditing
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderRowActions={({ row, table }) => (
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement='left' title='اصلاح'>
              <IconButton onClick={() => table.setEditingRow(row)}>
                <Pencil />
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement='right' title='حذف'>
              <IconButton color='error' onClick={() => handleDeleteRow(row)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ButtonStyled
              component='label'
              variant='contained'
              onClick={() => setCreateModalOpen(true)}
              size={isSmallScreen ? 'small' : 'large'}
            >
              {!isSmallScreen && <span>افزودن آدرس جدید</span>}
              <Plus />
            </ButtonStyled>
          </Box>
        )}
        renderToolbarInternalActions={({ table }) => (
          <>
            <MRT_ToggleGlobalFilterButton table={table} />
            <MRT_ToggleFiltersButton table={table} />
            {!isSmallScreen && <MRT_ShowHideColumnsButton table={table} />}
            {!isSmallScreen && <MRT_ToggleDensePaddingButton table={table} />}
            <MRT_FullScreenToggleButton table={table} />
            <ExportButton
              selectedData={data}
              columns={columns}
              filePreName='addresses'
              fetchData={handleFetchAllData}
            />
          </>
        )}
      />
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
      />
    </>
  )
}

interface CreateModalProps {
  columns: MRT_ColumnDef<Address>[]
  onClose: () => void
  onSubmit: (values: Address) => void
  open: boolean
}

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }: CreateModalProps) => {
  const filterItems = ['id', 'account']
  const [values, setValues] = useState<any>(() =>
    columns
      .filter(column => !filterItems.includes(String(column.id)))
      .reduce((acc, column) => {
        acc[column.accessorKey ?? ''] = ''

        return acc
      }, {} as any)
  )
  const [user, setUser] = useState<User | null>(null)

  const handleUserSelect = (user: User | null) => {
    setValues({ ...values, user })
  }

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values)
    onClose()
  }

  return (
    <Dialog open={open}>
      <DialogTitle textAlign='center'>جزییات آدرس</DialogTitle>
      <DialogContent>
        <form onSubmit={e => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
              marginTop: 4
            }}
          >
            <UserSelect onChange={user => handleUserSelect(user)} />

            {columns
              .filter(column => !filterItems.includes(String(column.id)))
              .map(column => (
                <TextField
                  key={column.accessorKey}
                  label={column.header}
                  name={column.accessorKey}
                  onChange={e => setValues({ ...values, [e.target.name]: e.target.value })}
                />
              ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>انصراف</Button>
        <ButtonStyled component='label' variant='contained' onClick={handleSubmit}>
          افزودن آدرس جدید
        </ButtonStyled>
      </DialogActions>
    </Dialog>
  )
}

const validateRequired = (value: string) => !!value.length
const validateEmail = (email: string) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
const validateAge = (age: number) => age >= 18 && age <= 50

export default TableAddress
