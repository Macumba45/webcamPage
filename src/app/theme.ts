'use client'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    components: {
        MuiSelect: {
            styleOverrides: {
                root: {},
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '', // color when hover
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'black', // color when focused
                    },
                },
                notchedOutline: {
                    borderColor: '', // default color
                },
            },
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    '&.Mui-focused': {
                        color: 'black', // color of the legend when focused
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    minWidth: 50,
                    '&.Mui-focused': {
                        color: 'black', // color of the legend when focused
                    },
                },
            },
        },
        MuiStack: {
            styleOverrides: {
                root: {},
            },
        },
    },
})

export default theme
