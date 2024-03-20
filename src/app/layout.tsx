import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '@mui/system'
import theme from './theme'
import './reset.css'
import './global.css'

const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Captura de Foto de DNI y Marca de Agua',
    description:
        'Captura fotos de tu DNI y usa una marca de agua para prevenir fraudes',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <head></head>
            <meta
                http-equiv="ScreenOrientation"
                content="autoRotate:disabled"
            />
            <html lang="en" className={roboto.className}>
                <body
                    style={{
                        backgroundColor: '#000000',
                    }}
                >
                    <AppRouterCacheProvider>
                        <StyledComponentsRegistry>
                            <ThemeProvider theme={theme}>
                                <SpeedInsights />
                                {children}
                            </ThemeProvider>
                        </StyledComponentsRegistry>
                    </AppRouterCacheProvider>
                </body>
            </html>
        </>
    )
}
