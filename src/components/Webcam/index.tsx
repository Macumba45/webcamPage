'use client'

import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import ButtonComponent from '../Button'
import CameraswitchIcon from '@mui/icons-material/Cameraswitch'
import CameraIcon from '@mui/icons-material/Camera'
import SwitchCameraIcon from '@mui/icons-material/SwitchCamera'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import Draggable from 'react-draggable'
import { IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { ContainerPicture, MainContainer, PicuresScreenShot } from './styles'
import SaveIcon from '@mui/icons-material/Save'
import trustedPng from '/public/trusted.png'
import waterMark from '/public/waterMark.png'

import callWaterMarkAPI from '@/services/waterMark'

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
    const [modalOpen, setModalOpen] = useState(false)
    const [modalImage, setModalImage] = useState('')
    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER)
    const [imgSrcs, setImgSrcs] = useState<string[]>([]) // Cambiado a un array
    const [date, setDate] = useState(new Date())
    const [mirror, setMirror] = useState(false)
    const [x, setX] = useState(100)
    const [y, setY] = useState(30)

    const handleStop = (event: any, dragElement: any) => {
        setX(dragElement.x)
        setY(dragElement.y)
    }

    const handleClick = React.useCallback(() => {
        setFacingMode(prevState =>
            prevState === FACING_MODE_USER
                ? FACING_MODE_ENVIRONMENT
                : FACING_MODE_USER
        )
    }, [])

    const capture = useCallback(async () => {
        const imageSrc = webcamRef.current?.getScreenshot() as string
        const img = new Image()
        img.src = imageSrc

        img.onload = async () => {
            try {
                const watermarkedImage = await callWaterMarkAPI(
                    imageSrc,
                    'Your watermark text',
                    img.width,
                    img.height
                )
                setImgSrcs(prevSrcs => [...prevSrcs, watermarkedImage])
            } catch (error) {
                console.error('Error processing image:', error)
            }
        }
    }, [webcamRef, date, x, y])

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
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: '10px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: '10px',
                            }}
                        >
                            <PicuresScreenShot
                                key={index}
                                src={imgSrc}
                                alt={`webcam ${index}`}
                                onClick={() => {
                                    setModalImage(imgSrc)
                                    setModalOpen(true)
                                }}
                            />
                            <div>
                                <IconButton
                                    aria-label="delete"
                                    size="small"
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
                                        }}
                                        fontSize="small"
                                    />
                                </IconButton>
                                <a
                                    href={imgSrc}
                                    download={`webcam_image_${index}.png`}
                                >
                                    <IconButton>
                                        <SaveIcon
                                            sx={{
                                                color: 'white',
                                                fontSize: '1rem',
                                                padding: '0rem',
                                                border: 'none',
                                            }}
                                            fontSize="small"
                                        />
                                    </IconButton>
                                </a>
                            </div>
                        </div>
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
                    screenshotFormat="image/png"
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

                <img // Paso 2
                    style={{
                        position: 'absolute', // Paso 4
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                    src={waterMark.src} // Paso 1
                    alt="Overlay"
                />
                {/* <img
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '70px',
                        height: '70px',
                    }}
                    src={trustedPng.src}
                    alt="Trusted"
                /> */}

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
                {modalOpen && (
                    <Dialog
                        open={modalOpen}
                        onClose={() => setModalOpen(false)}
                    >
                        <DialogContent>
                            <img
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                                src={modalImage}
                                alt="Modal"
                            />
                        </DialogContent>

                        <ButtonComponent
                            onClick={() => {
                                const link = document.createElement('a')
                                link.href = modalImage
                                link.download = 'imagen.png'
                                link.click()
                            }}
                        >
                            Guardar Imagen
                        </ButtonComponent>
                    </Dialog>
                )}
            </div>
        </MainContainer>
    )
}

export default WebcamComponent
