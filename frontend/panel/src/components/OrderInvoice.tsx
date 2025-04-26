// ** React Imports
import { forwardRef, useEffect, useState } from 'react'

// ** MUI Imports
import {
  Autocomplete,
  Box,
  Button,
  ButtonProps,
  Grid,
  Paper,
  styled,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography
} from '@mui/material'

// ** Icons Imports
import { Plus } from 'mdi-material-ui'

// ** Services Import
import BasicService, { Address } from '@/services/basic.service'

// ** Component Imports
import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { User } from '@/services/auth.service'

// ** Redux Imports
import { useSelector } from 'react-redux'

const ButtonStyled = styled(Button)<ButtonProps & { htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const CancelButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

interface NumericFormatCustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

const NumericFormatCustom = forwardRef<NumericFormatProps, NumericFormatCustomProps>(function NumericFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      valueIsNumericString
    />
  )
})

type Props = {
  address: Address | null
  onSelectAddress: any
  label?: string
  user: User | null
}

const OrderInvoice = (props: Props) => {
  // ** Props
  const { address, onSelectAddress, label, user } = props

  // ** States
  const [addressList, setAddressList] = useState<Array<Address>>()
  const [newAddress, setNewAddress] = useState<Partial<Address>>()
  const [open, setOpen] = useState(false)

  const fetchAddresses = async () => {
    const addressFilters = user ? [{ id: 'user_id', value: user.id, operator: '$eq' }] : []
    const addresses = await BasicService.getAllAddress(1000, 1, undefined, addressFilters)
    setAddressList(addresses.data)
  }

  const handleAddress = (value: Address | null | undefined) => {
    if (value) {
      onSelectAddress(value)
    }
  }

  const handleAddNewAddress = async () => {
    if (newAddress) {
      if (user) {
        const address = await BasicService.createAddressForOtherUser({ ...newAddress, user_id: +user.id })
        onSelectAddress(address)
      }

      fetchAddresses()
    }
    handleClose()
  }

  const handleClickOpen = () => {
    setNewAddress({})
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    fetchAddresses()
  }, [user])

  if (!addressList) return <p>در حال آماده سازی اطلاعات ...</p>

  return (
    <Box>
      <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose}>
        <DialogTitle>افزودن آدرس جدید</DialogTitle>
        <DialogContent>
          <Grid container spacing={4} marginY={4}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='عنوان'
                placeholder='شرکت'
                value={newAddress?.title}
                onChange={e => {
                  setNewAddress({ ...newAddress, title: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='تلفن ثابت'
                value={newAddress?.phone}
                onChange={e => {
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='تلفن همراه'
                value={newAddress?.mobile_phone}
                onChange={e => {
                  setNewAddress({ ...newAddress, mobile_phone: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                fullWidth
                label='آدرس'
                value={newAddress?.address}
                onChange={e => {
                  setNewAddress({ ...newAddress, address: e.target.value })
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label='کد پستی'
                value={newAddress?.postal_code}
                onChange={e => {
                  setNewAddress({ ...newAddress, postal_code: e.target.value })
                }}
                InputProps={{ style: { direction: 'ltr' }, inputComponent: NumericFormatCustom as any }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='کد ملی'
                value={newAddress?.national_code}
                onChange={e => {
                  setNewAddress({ ...newAddress, national_code: e.target.value })
                }}
                InputProps={{ style: { direction: 'ltr' }, inputComponent: NumericFormatCustom as any }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='کد اقتصادی'
                value={newAddress?.economic_code}
                onChange={e => {
                  setNewAddress({ ...newAddress, economic_code: e.target.value })
                }}
                InputProps={{ style: { direction: 'ltr' }, inputComponent: NumericFormatCustom as any }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonStyled variant='contained' component='label' onClick={handleAddNewAddress}>
            ذخیره
          </ButtonStyled>
          <CancelButtonStyled color='error' variant='outlined' onClick={handleClose}>
            انصراف
          </CancelButtonStyled>
        </DialogActions>
      </Dialog>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            id='address'
            fullWidth
            value={address}
            getOptionLabel={addresses => addresses.title}
            options={addressList}
            isOptionEqualToValue={(option, value) => option.id === value?.id}
            noOptionsText={'هیچ آیتمی موجود نیست'}
            renderOption={(props, addresses) => (
              <Box component='li' {...props} key={addresses.id}>
                {addresses.title}
              </Box>
            )}
            renderInput={params => <TextField {...params} label={label} />}
            onChange={(_, value) => handleAddress(value)}
            PaperComponent={({ children }) => {
              return (
                <Paper>
                  <ButtonStyled
                    component='button'
                    fullWidth
                    onMouseDown={() => {
                      handleClickOpen()
                    }}
                  >
                    افزودن جدید
                    <Plus />
                  </ButtonStyled>
                  {children}
                </Paper>
              )
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2'>{address?.address}</Typography>
          <Typography variant='body2'>{address?.national_code}</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrderInvoice
