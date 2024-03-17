'use client'

import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import ButtonComponent from '../Button'
import CameraswitchIcon from '@mui/icons-material/Cameraswitch'
import CameraIcon from '@mui/icons-material/Camera'
import SwitchCameraIcon from '@mui/icons-material/SwitchCamera'
import Draggable from 'react-draggable'
import { IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ContainerPicture, MainContainer, PicuresScreenShot } from './styles'

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
    const [imgSrcs, setImgSrcs] = useState<string[]>([]) // Cambiado a un array
    const [date, setDate] = useState(new Date())
    const [mirror, setMirror] = useState(true)

    const [city, setCity] = useState<string | null>(null)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
            )
                .then(response => response.json())
                .then(data => setCity(data.address.city))
        })
    }, [])

    const handleClick = React.useCallback(() => {
        setFacingMode(prevState =>
            prevState === FACING_MODE_USER
                ? FACING_MODE_ENVIRONMENT
                : FACING_MODE_USER
        )
    }, [])

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot() as string
        const canvas = document.createElement('canvas')
        const img = new Image()
        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.drawImage(img, 0, 0)
                ctx.fillText(date.toLocaleString(), 10, 80) // Añade la fecha
                ctx.fillText(city || '', 10, 110) // Añade la ciudad
            }
            const watermarkedImage = canvas.toDataURL('image/png')
            setImgSrcs(prevSrcs => [...prevSrcs, watermarkedImage])
        }
        img.src = imageSrc
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
        <MainContainer>
            <ContainerPicture>
                {imgSrcs.map((imgSrc, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'relative',
                            display: 'inline-block',
                            margin: '10px',
                        }}
                    >
                        <a
                            href={imgSrc}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <PicuresScreenShot
                                key={index}
                                src={imgSrc}
                                alt={`webcam ${index}`}
                            />
                        </a>
                        <IconButton
                            aria-label="delete"
                            size="small"
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                zIndex: 10000,
                            }}
                            onClick={() => {
                                const newImgSrcs = [...imgSrcs]
                                newImgSrcs.splice(index, 1)
                                setImgSrcs(newImgSrcs)
                            }}
                        >
                            <DeleteIcon
                                sx={{
                                    color: 'white',
                                    fontSize: '1rem',
                                    padding: '0rem',
                                    border: 'none',
                                    mt: 6,
                                }}
                                fontSize="small"
                            />
                        </IconButton>
                        <a href={imgSrc} download={`webcam_image_${index}.png`}>
                            <button>Guardar imagen</button>
                        </a>
                    </div>
                ))}
            </ContainerPicture>
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
                            top: '10px',
                            right: '10px',
                            color: 'white',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            padding: '2px 5px',
                            borderRadius: '5px',
                        }}
                    >
                        <Typography fontSize={24} fontWeight={700}>
                            {date.toLocaleString()}
                        </Typography>
                        <Typography fontSize={24} fontWeight={700}>
                            {city}
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
                </div>
            </div>
        </MainContainer>
    )
}

export default WebcamComponent
