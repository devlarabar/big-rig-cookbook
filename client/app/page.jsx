
import Image from 'next/image'

const Home = () => {
    return (
        <section>
            <section className="w-full flex-center flex-col">

                <h1 className="header_text text-center">Big Rig Cookbook:
                    <br className="max-md:hidden" />
                    <span className="header_gradient text-center"> Take Charge of Your Health</span></h1>
                <Image
                    src={"/assets/images/semi-truck.svg"}
                    width={200}
                    height={200}
                    className="mt-5"
                />
                <p className="desc text-center mt-5 max-w-[640px]">
                    Join your fellow truckers in improving your health and wellness on the road! Share your unique and creative <em>big rig recipes</em> with other drivers, save stretch routines, and earn achievements by maintaining healthy habits.
                </p>
            </section>
            <section>
                <p></p>
            </section>
        </section>
    )
}

export default Home