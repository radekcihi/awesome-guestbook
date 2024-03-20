import React, { FC, useState } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Chip, Paper, Typography } from '@mui/material'


import { getDepartmentColor, useUser } from '@/providers/UserContext'
import Remove from './Remove'

const columns: GridColDef[] = [
    {
        field: 'fullName',
        headerName: 'Visitor',
        flex: 2,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 100,
        flex: 4,
        renderCell: params =>
            <a style={{ color: "gray" }}>
                {params.value}
            </a>,

    },
    {
        field: 'department',
        headerName: 'Department',
        align: 'right',
        renderCell: params => <Chip label={params.value} color={getDepartmentColor(params.value)} variant={'filled'} />,
    },
]

interface TableProps {
}

const Table: FC<TableProps> = () => {
    const { users, setAll } = useUser()
    const [selected, setSelected] = useState<string[]>([])

    const handleRemove = () => {
        const newUsers = users.filter(user => !selected.includes(user.id))
        setAll(newUsers)
    }

    return (
        <Box sx={{ marginTop: 4, overflow: 'auto' }}>

            <Box component={Paper} boxShadow={4}>

                <Typography component="h1" variant="h4" padding={1}>
                    Visitor management
                </Typography>


                <DataGrid
                    sx={{
                        border: 'none',
                    }}
                    autoHeight
                    hideFooterPagination
                    rows={users}
                    columns={columns}
                    slots={{
                        toolbar: () => <Remove handleRemove={handleRemove} disabled={selected.length === 0} />,
                    }}

                    checkboxSelection
                    onRowSelectionModelChange={id => setSelected(id as string[])}
                />

            </Box>
        </Box >
    )
}

export default Table