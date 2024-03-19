import { NextApiRequest, NextApiResponse } from 'next'
import sharp from 'sharp'

const getWaterMarkImageByTxt = async (
    width: number,
    height: number,
    txt: string
) => {
    const svg = `
    <svg width="${width}" height="${height}">
    <text x="50%" y="50%" text-anchor="middle" font-weight="bold" font-family="Helvetica, Arial, sans-serif" font-size="36" id="svg_1" stroke-width="0" stroke="#000" fill="#2bbc4f">${txt}</text>
    </svg>
    `

    return sharp(Buffer.from(svg))
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const {
            picUrl,
            markTxt = 'aigf.art',
            width = 400,
            height = 200,
        } = req.body

        const fimg = await fetch(picUrl)
        const imageBuffer = await (await fimg.blob()).arrayBuffer()
        const orgImg = sharp(imageBuffer)
        const metadata = await orgImg.metadata()

        const adjustedWidth = metadata.width! < width ? metadata.width! : width
        const adjustedHeight =
            metadata.height! < height ? metadata.height! : height

        const watermask = await (
            await getWaterMarkImageByTxt(adjustedWidth, adjustedHeight, markTxt)
        ).toBuffer()

        let top = metadata.height! - adjustedHeight
        top = top <= 0 ? 20 : top

        let left = (metadata.width! - adjustedWidth) / 2
        left = left <= 0 ? 20 : left

        const output = await orgImg
            .composite([{ input: watermask, left: left, top: top }])
            .png()
            .toBuffer()

        const base64 = 'data:image/jpeg;base64,' + output.toString('base64')

        res.status(200).json({ base64 })
    } catch (error) {
        console.error('Error processing image:', error)
        res.status(500).json({ error: 'Error processing image' })
    }
}
