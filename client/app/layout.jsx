import '@styles/globals.css'
import Header from '@components/ui/Header'
import AuthProvider from "@contexts/AuthContext";

export const metadata = {
    title: 'Big Rig Cookbook',
    description: 'Trucker health and wellness app'
}

const RootLayout = ({ children, recipeModal }) => {
    return (
        <html data-theme="cupcake" lang="en">
            <body>
                <div className="main">
                    <div className="gradient" />
                </div>

                <main className="app">
                    <AuthProvider>
                        <Header />
                        {recipeModal}
                        {children}
                    </AuthProvider>
                </main>
            </body>
        </html>
    )
}

export default RootLayout