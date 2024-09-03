import { logo } from 'D:/Projects/Summarizer/src/assets/assets';

const Hero = () => {
    return (
        <header className="w-full flex justify-center items-center flex-col">
            <nav className="flex justify-between items-center w-full mb-8 pt-2">
                <img src={logo} alt="Sumz logo" className="w-28 object-contain" />
                <button type="button" className="black_btn">
                    Sohard
                </button>
            </nav>

            <h1 className="head_text">
                Let me Summarize for <br className="max-md:hidden" />
                <span className="orange_gradient">You</span>
            </h1>
            <h2 className="desc">
                I will help you in simplifying your reading work :)
            </h2>
        </header>
    )
}

export default Hero;
