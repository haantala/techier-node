'use client'

import Grid from '@mui/material/Grid'

import StickyHeadTable from '@/views/Data/datagrid' // Adjust import path as needed

const DashboardAnalytics = () => {
  return (
    <Grid container spacing={6}>
      <StickyHeadTable />
    </Grid>
  )
}

export default DashboardAnalytics
