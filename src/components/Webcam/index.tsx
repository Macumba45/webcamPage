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
    const [mirror, setMirror] = useState(false)
    const [isCapturing, setIsCapturing] = useState(false)

    const handleClick = React.useCallback(() => {
        setFacingMode(prevState =>
            prevState === FACING_MODE_USER
                ? FACING_MODE_ENVIRONMENT
                : FACING_MODE_USER
        )
    }, [])

    const capture = useCallback(async () => {
        setIsCapturing(true)
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
            } finally {
                setIsCapturing(false)
            }
        }
    }, [webcamRef])

    const mirrorImage = () => {
        setMirror(!mirror)
    }

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

                {/* <img // Paso 2
                    style={{
                        position: 'absolute', // Paso 4
                        objectFit: 'contain',
                        width: '100%',
                        height: '100%',
                    }}
                    src={waterMark.src} // Paso 1
                    alt="Overlay"
                /> */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        marginTop: '3rem',
                    }}
                >
                    <div
                        style={{
                            width: '250px',
                            height: '400px',
                            border: '1px solid white',
                            position: 'absolute',
                            borderRadius: '0.5rem',
                        }}
                    ></div>
                </div>
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
                        disabled={isCapturing}
                        sx={{
                            backgroundColor: 'transparent',
                            color: 'black',
                        }}
                        icon={
                            <CameraIcon
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    animation: `${
                                        isCapturing
                                            ? 'spin 1s linear infinite'
                                            : 'none'
                                    }`,
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
