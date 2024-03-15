import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import StyledComponentsRegistry from '@/lib/StyledComponentsRegistry'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Roboto } from 'next/font/google'
import { ThemeProvider } from '@mui/system'
import theme from './theme'

const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin'],
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Hotel Data Booking',
    description: 'Hotel Data Booking',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <head></head>
            <html lang="en" className={roboto.className}>
                <body>
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
