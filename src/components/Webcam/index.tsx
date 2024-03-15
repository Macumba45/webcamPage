'use client'
import React, { FC, useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'

const WebcamComponent: FC = () => {
    const FACING_MODE_USER = 'user'
    const FACING_MODE_ENVIRONMENT = 'environment'

    const videoConstraints = {
        facingMode: FACING_MODE_USER,
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
            <div>
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
                            style={{ width: '100vw', height: '100vh' }}
                            videoConstraints={{
                                ...videoConstraints,
                                facingMode,
                            }}
                        />
                        <button onClick={handleClick}>Switch camera</button>
                    </>
                )}
                <div>
                    {imgSrc ? (
                        <button onClick={retake}>Retake photo</button>
                    ) : (
                        <button onClick={capture}>Capture photo</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default WebcamComponent