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
        aspectRatio: 4 / 4,
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
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'black',
                }}
            >
                {imgSrc ? (
                    <img src={imgSrc} alt="webcam" />
                ) : (
                    <>
                        <Webcam
                            audio={false}
                            screenshotQuality={1}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            download={true}
                            // height={720}
                            // width={480}
                            style={{ width: '100vw', height: '100%' }}
                            videoConstraints={{
                                ...videoConstraints,
                                facingMode,
                            }}
                        />
                        <ButtonComponent
                            variant="contained"
                            sx={{ position: 'absolute', bottom: 0, left: 0 }}
                            onClick={handleClick}
                            title="Switch camera"
                            icon={<CameraswitchIcon />}
                        />
                    </>
                )}
                <div>
                    {imgSrc ? (
                        <ButtonComponent
                            variant="contained"
                            sx={{ position: 'absolute', bottom: 0, right: 0 }}
                            onClick={retake}
                            title="Retake photo"
                        />
                    ) : (
                        <ButtonComponent
                            variant="contained"
                            sx={{ position: 'absolute', bottom: 0, right: 0 }}
                            onClick={capture}
                            title="Capture photo"
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default WebcamComponent
