import '@styles/globals.css'
import Header from '@components/ui/Header'
import AuthProvider from '@contexts/AuthContext'
import ToggleThemeProvider from '@contexts/ThemeContext/useProvideTheme'
import ThemeToggle from '@components/ui/ThemeToggle'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '../components/ui/Sidebar'

export const metadata = {
    title: 'Big Rig Cookbook',
    description: 'Trucker health and wellness app'
}

const RootLayout = ({ children, recipeModal }) => {
    return (
        <html lang="en">
            <body className="md:flex flex-between">
                <ToggleThemeProvider>

                    <AuthProvider>
                        <ThemeToggle />
                        {recipeModal}

                        <Sidebar children={children} />
                    </AuthProvider>

                </ToggleThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout