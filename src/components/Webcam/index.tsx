'use client'

import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import ButtonComponent from '../Button'
import CameraswitchIcon from '@mui/icons-material/Cameraswitch'
import CameraIcon from '@mui/icons-material/Camera'
import SwitchCameraIcon from '@mui/icons-material/SwitchCamera'
import Draggable from 'react-draggable'
import { Resizable } from 'react-resizable'
import { Typography } from '@mui/material'

const WebcamComponent: FC = () => {
    const FACING_MODE_USER = 'user'
    const FACING_MODE_ENVIRONMENT = 'environment'

    const videoConstraints = {
        facingMode: FACING_MODE_USER,
        // width: { min: 480 },
        // height: { min: 720 },
        aspectRatio: 4 / 3,
    }
    const webcamRef = useRef<Webcam>(null)
    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER)
    const [imgSrc, setImgSrc] = useState<string | null>(null)
    const [date, setDate] = useState(new Date())
    const [mirror, setMirror] = useState(true)

    const retake = () => {
        setImgSrc(null)
    }
    const handleClick = React.useCallback(() => {
        setFacingMode(prevState =>
            prevState === FACING_MODE_USER
                ? FACING_MODE_ENVIRONMENT
                : FACING_MODE_USER
        )
    }, [])

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot() as string
        setImgSrc(imageSrc)
    }, [webcamRef])

    const mirrorImage = () => {
        setMirror(!mirror)
    }

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000) // Actualiza la fecha cada segundo
        return () => {
            clearInterval(timer) // Limpia el intervalo al desmontar el componente
        }
    }, [])

    return (
        <>
            <div
                style={{
                    backgroundColor: 'black',
                    background: 'black',
                }}
            >
                {imgSrc ? (
                    <img src={imgSrc} alt="webcam" />
                ) : (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                        }}
                    >
                        <Webcam
                            audio={false}
                            screenshotQuality={1}
                            imageSmoothing={true}
                            mirrored={mirror}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            download={true}
                            videoConstraints={{
                                ...videoConstraints,
                                facingMode,
                            }}
                            style={{
                                borderBottomLeftRadius: '0.5rem',
                                borderBottomRightRadius: '0.5rem',
                            }}
                        />
                        <Draggable scale={1}>
                            <div
                                style={{
                                    position: 'absolute',
                                    bottom: '10px',
                                    right: '10px',
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    padding: '2px 5px',
                                    borderRadius: '5px',
                                }}
                            >
                                <Typography fontSize={24} fontWeight={700}>
                                    {date.toLocaleString()}{' '}
                                </Typography>
                            </div>
                        </Draggable>
                        <div
                            style={{
                                display: 'flex',
                                marginTop: '2rem',
                                height: '100px',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ButtonComponent
                                variant="contained"
                                onClick={handleClick}
                                title=""
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: 'black',
                                }}
                                icon={
                                    <CameraswitchIcon
                                        sx={{
                                            backgroundColor: 'black',
                                        }}
                                    />
                                }
                            />
                            {imgSrc ? (
                                <ButtonComponent
                                    variant="contained"
                                    onClick={retake}
                                    title="Retake photo"
                                />
                            ) : (
                                <>
                                    <ButtonComponent
                                        variant="contained"
                                        onClick={capture}
                                        sx={{
                                            backgroundColor: 'transparent',
                                            color: 'black',
                                        }}
                                        icon={
                                            <CameraIcon
                                                sx={{
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                }}
                                            />
                                        }
                                    />
                                    <ButtonComponent
                                        variant="contained"
                                        onClick={mirrorImage}
                                        sx={{
                                            backgroundColor: 'transparent',
                                            color: 'black',
                                        }}
                                        icon={<SwitchCameraIcon />}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default WebcamComponent
