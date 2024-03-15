'use client'
import React, { FC, useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'
import ButtonComponent from '../Button'
import CameraswitchIcon from '@mui/icons-material/Cameraswitch'

const WebcamComponent: FC = () => {
    const FACING_MODE_USER = 'user'
    const FACING_MODE_ENVIRONMENT = 'environment'

    const videoConstraints = {
        facingMode: FACING_MODE_USER,
        // width: { min: 480 },
        // height: { min: 720 },
        aspectRatio: 4 / 3,
    }
    const webcamRef = useRef<Webcam>(null) // specify the type here
    const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER)
    const [imgSrc, setImgSrc] = useState<string | null>(null) // specify the type here

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
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            download={true}
                            videoConstraints={{
                                ...videoConstraints,
                                facingMode,
                            }}
                        />

                        <div
                            style={{
                                display: 'flex',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <ButtonComponent
                                variant="contained"
                                onClick={handleClick}
                                title="Switch camera"
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                }}
                                icon={<CameraswitchIcon />}
                            />
                            {imgSrc ? (
                                <ButtonComponent
                                    variant="contained"
                                    onClick={retake}
                                    title="Retake photo"
                                />
                            ) : (
                                <ButtonComponent
                                    variant="contained"
                                    onClick={capture}
                                    title="Capture photo"
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default WebcamComponent
