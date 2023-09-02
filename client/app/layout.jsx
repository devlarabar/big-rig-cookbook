import '@styles/globals.css'
import Header from '@components/ui/Header'
import AuthProvider from '@contexts/AuthContext'
import ToggleThemeProvider from '@contexts/ThemeContext/useProvideTheme'
import ThemeToggle from '@components/ui/ThemeToggle'

export const metadata = {
    title: 'Big Rig Cookbook',
    description: 'Trucker health and wellness app'
}

const RootLayout = ({ children, recipeModal }) => {
    return (
        <html lang="en">
            <body>
                <ToggleThemeProvider>
                    <main className="app">
                        <AuthProvider>
                            <ThemeToggle />
                            <Header />
                            {recipeModal}
                            {children}
                        </AuthProvider>
                    </main>
                </ToggleThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout