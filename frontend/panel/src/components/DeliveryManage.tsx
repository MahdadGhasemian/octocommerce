// ** React Imports
import { ChangeEvent, useEffect, useState } from 'react'

// ** MUI Imports
import { Radio, CardContent, Grid, RadioGroup, TextField, Card } from '@mui/material'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

// ** MUI Imports
import { styled } from '@mui/material/styles'

// ** Services Import
import { Delivery, DeliveryType, Order } from '@/services/basic.service'

// ** Import Component
import Empty from '@/components/Empty'

// ** Map Types Imports
import { DeliveryTypeMap } from '@/map-types'

const RadioStyled = styled(Radio)(({ theme }) => ({
  '&.Mui-disabled': {
    color: theme.palette.text.primary
  }
}))

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const deliveryTypeValues = Object.values(DeliveryType)

export type Props = {
  order: Order
  isSmallScreen: boolean
}

const DeliveryManage = (props: Props) => {
  // ** Props
  const { order, isSmallScreen } = props

  // ** State
  const [delivery, setDelivery] = useState<Partial<Delivery>>()

  // ** Vars
  const thereIsDeliveryData: boolean = delivery?.id ? true : false
  const readOnly = true

  const deliveryTypeRadioGroup = deliveryTypeValues.map(value => (
    <FormControlLabel
      key={value}
      value={value}
      control={<RadioStyled disabled={readOnly} />}
      label={DeliveryTypeMap.get(value)}
    />
  ))

  const handleChange = (prop: keyof Delivery) => (event: ChangeEvent<HTMLInputElement>) => {
    setDelivery({ ...delivery, [prop]: event.target.value })
  }

  useEffect(() => {
    if (order && order?.delivery) {
      setDelivery({ ...order.delivery, delivery_type: order.delivery?.delivery_type || DeliveryType.RIDER })
    } else {
      setDelivery({ delivery_type: DeliveryType.RIDER })
    }
  }, [order])

  if (!delivery) {
    return <div></div>
  }

  return (
    <CardContent sx={{ padding: isSmallScreen ? 1 : 5 }}>
      <Card sx={{ paddingBottom: 10, paddingTop: 5 }}>
        <CardContent>
          {thereIsDeliveryData ? (
            <form>
              <Grid container spacing={7}>
                <Grid item xs={12} sm={12}>
                  <RadioGroup row value={delivery?.delivery_type} onChange={handleChange('delivery_type')}>
                    {deliveryTypeRadioGroup}
                  </RadioGroup>
                </Grid>
                {/* Address */}
                <Grid item xs={12} sm={12}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={2}
                    label='نشانی تحویل'
                    value={delivery.delivery_address}
                    onChange={handleChange('delivery_address')}
                    InputProps={{
                      readOnly: readOnly
                    }}
                  />
                </Grid>
                {/* Postal Code */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='کد پستی'
                    value={delivery.delivery_postal_code}
                    onChange={handleChange('delivery_postal_code')}
                    InputProps={{
                      readOnly: readOnly
                    }}
                  />
                </Grid>
                {/* Recipient Name */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='نام تحویل گیرنده'
                    value={delivery?.recipient_name}
                    onChange={handleChange('recipient_name')}
                    InputProps={{
                      readOnly: readOnly
                    }}
                  />
                </Grid>
                {/* Recipient National Id */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='کد ملی تحویل گیرنده'
                    value={delivery?.recipient_national_id}
                    onChange={handleChange('recipient_national_id')}
                    InputProps={{
                      readOnly: readOnly
                    }}
                  />
                </Grid>
                {/* Recipient Phone Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='شماره موبایل تحویل گیرنده'
                    value={delivery?.recipient_mobile_phone_number}
                    onChange={handleChange('recipient_mobile_phone_number')}
                    InputProps={{
                      readOnly: readOnly
                    }}
                  />
                </Grid>
                {/* License Plate */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='شماره پلاک'
                    value={delivery?.car_license_plate}
                    onChange={handleChange('car_license_plate')}
                    InputProps={{
                      readOnly: readOnly
                    }}
                  />
                </Grid>
                {/* Recipient Phone Number */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='شماره تلفن'
                    value={delivery.recipient_phone_number}
                    onChange={handleChange('recipient_phone_number')}
                    InputProps={{
                      readOnly: readOnly
                    }}
                  />
                </Grid>
                {/* Note */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label='یادداشت'
                    multiline
                    minRows={2}
                    value={delivery?.delivery_note}
                    onChange={handleChange('delivery_note')}
                    InputProps={{
                      readOnly: readOnly
                    }}
                  />
                </Grid>

                {delivery?.rejected_note && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label='علت عدم تایید'
                      value={delivery?.rejected_note}
                      InputProps={{
                        readOnly: true
                      }}
                      error
                    />
                  </Grid>
                )}
              </Grid>
            </form>
          ) : (
            <Empty message='کاربر هنوز اطلاعات حمل و نقل را بارگذاری نکرده است.' />
          )}
        </CardContent>
      </Card>
    </CardContent>
  )
}

export default DeliveryManage
