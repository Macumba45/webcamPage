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
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color: 'white',
                    width: '2rem',
                    height: '2rem',
                    borderColor: 'white',
                    borderRadius: '50%',
                    border: '1px solid white',
                    padding: '0.8rem',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        backgroundColor: 'white',
                        color: 'black',
                        width: '2.1rem',
                        height: '2.1rem',
                    },
                },
            },
        },
    },
})

export default theme
