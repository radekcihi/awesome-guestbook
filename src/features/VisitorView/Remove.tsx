import React, { FC } from 'react'
import { Button, Toolbar } from '@mui/material'

type RemoveProps = {
    disabled: boolean
    handleRemove: () => void
}

const Remove: FC<RemoveProps> = ({ disabled, handleRemove }) => {
    return (
        <Toolbar>
            <Button color={'error'} variant="contained" disabled={disabled} onClick={handleRemove}>
                Remove
            </Button>
        </Toolbar>
    )
}

export default Remove