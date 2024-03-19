const callWaterMarkAPI = async (
    picUrl: any,
    markTxt: any,
    width: any,
    height: any
) => {
    try {
        const response = await fetch('/api/waterMark/waterMark', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                picUrl,
                markTxt,
                width,
                height,
            }),
        })

        if (!response.ok) {
            throw new Error('Network response was not ok')
        }

        const data = await response.json()

        return data.base64
    } catch (error) {
        console.error('Error calling waterMark API:', error)
        throw error
    }
}

export default callWaterMarkAPI
