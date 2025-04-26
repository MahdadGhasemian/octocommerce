// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'

// ** Components Imports
import TableAddress from '@/components/tables/TableAddress'

const Invoice = () => {
  // ** Hook

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <TableAddress />
        </Card>
      </Grid>
    </Grid>
  )
}

export default Invoice
