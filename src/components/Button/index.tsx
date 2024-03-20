import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { FC, ReactNode } from 'react'

interface ButtonProps {
    onClick: () => void
    title?: string
    disabled?: boolean
    variant?: 'text' | 'outlined' | 'contained'
    sx?: object
    children?: ReactNode
    icon?: ReactNode
}

const ButtonComponent: FC<ButtonProps> = ({
    onClick,
    title,
    disabled,
    variant,
    sx,
    children,
    icon,
}) => {
    return (
        <Stack display="flex" direction="row" spacing={2}>
            <Button
                disabled={disabled}
                onClick={onClick}
                variant={variant}
                sx={{
                    ...sx,
                    '.MuiButton-startIcon': {
                        margin: '0px', // adjust this value as needed
                    },
                    '&:hover': {
                        backgroundColor: 'transparent', // remove the hover effect
                    },
                }}
                startIcon={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {icon}
                    </div>
                }
            >
                {children || title}
            </Button>
        </Stack>
    )
}

export default ButtonComponent
