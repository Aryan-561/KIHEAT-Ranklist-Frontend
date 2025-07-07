

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../Logo/Logo";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const Footer = () => {

    return(
        <>
            <footer className="bg-green-900 text-white rounded-xl py-4 flex flex-col gap-2 items-center justify-center w-full mt-4">
                <Logo/>
                <div className="flex gap-4">
                    <a href="https://github.com/Aryan-561/KIHEAT-Ranklist-Frontend" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors">
                        <FontAwesomeIcon icon={faGithub} size="lg" />
                    </a>
                </div>
                <div className="container mx-auto text-xs sm:text-sm text-center font-roboto-flex">
                    <p>&copy; {new Date().getFullYear()} KIHEATRanklist. All rights reserved.</p>
                </div>

            </footer>
        </>
    )
}

export default Footer;
