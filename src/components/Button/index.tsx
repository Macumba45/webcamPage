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
}

const ButtonComponent: FC<ButtonProps> = ({
    onClick,
    title,
    disabled,
    variant,
    sx,
    children,
}) => {
    return (
        <Stack
            height={40}
            direction="row"
            spacing={2}
            marginLeft={3}
            marginRight={3}
        >
            <Button
                disabled={disabled}
                onClick={onClick}
                variant={variant}
                sx={sx}
            >
                {children || title}
            </Button>
        </Stack>
    )
}

export default ButtonComponent
