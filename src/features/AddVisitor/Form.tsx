import React, { FC } from 'react'
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material'
import { fakerEN as faker } from '@faker-js/faker'
import { DepartmentType, User, listOfDepartments, useUser } from '@/providers/UserContext'
import Restore from "@mui/icons-material/Restore";
import Person from "@mui/icons-material/Person";

interface FormProps {
}

const Form: FC<FormProps> = () => {
    const { users, addUser } = useUser()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const newUser: User = {
            id: faker.string.uuid(),
            fullName: data.get('fullName') as string,
            email: data.get('email') as string,
            department: data.get('department') as DepartmentType,
        }
        if (users.filter(user => user.email === newUser.email).length > 0) {
            alert('This email is already in the list')
            return
        }
        addUser(newUser)
    }

    return (
        <Box
            sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                boxShadow: 4

            }}
            padding={2}
            bgcolor={"white"}
            borderRadius={1}
        >
            <Typography component="h2" variant="h6">
                Add new visitor

            </Typography>
            <Typography component="p" variant="body2" color="textSecondary">
                Fill name, email address and the department.
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

                <TextField
                    margin='normal'
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    autoComplete="full-name"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    type={'email'}
                />

                <FormControl fullWidth margin={'normal'}>
                    <InputLabel htmlFor={'department'} >Department</InputLabel>
                    <Select
                        id="department"
                        name="department"
                        label={'Department'}
                        labelId="department-label"
                        defaultValue={listOfDepartments[0]}
                    >
                        {listOfDepartments.map(key => (
                            <MenuItem key={key} value={key}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin={'normal'}>
                    <FormControlLabel
                        control={<Checkbox name={'agree'} color="primary" required />}
                        label="I agree to be added to the table"
                    />
                </FormControl>

                <FormControl fullWidth margin={'normal'}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={5}>
                            <Button type="reset" fullWidth variant="outlined" startIcon={<Restore />}>
                                Reset form
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={7}>
                            <Button type="submit" fullWidth variant="contained" startIcon={<Person />}>
                                Add new visitor
                            </Button>
                        </Grid>
                    </Grid>
                </FormControl>
            </Box>
        </Box>
    )
}

export default Form