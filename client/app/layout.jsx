import '@styles/globals.css'
import AuthProvider from '@contexts/AuthContext'
import ToggleThemeProvider from '@contexts/ThemeContext/useProvideTheme'
import ThemeToggle from '@components/ui/ThemeToggle'
import UI from '../components/ui/UI'

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
                        <UI children={children} />
                    </AuthProvider>
                </ToggleThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout