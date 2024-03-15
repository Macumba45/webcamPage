'use client'
import React, { FC, useCallback, useRef, useState } from 'react'
import Webcam from 'react-webcam'

const WebcamComponent: FC = () => {
    const webcamRef = useRef<Webcam>(null) // specify the type here
    const [imgSrc, setImgSrc] = useState<string | null>(null) // specify the type here

    const retake = () => {
        setImgSrc(null)
    }
    console.log(imgSrc)

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
                    <Webcam
                        audio={false}
                        screenshotQuality={1}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        download={true}
                        style={{ width: '100vw' }}
                    />
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
