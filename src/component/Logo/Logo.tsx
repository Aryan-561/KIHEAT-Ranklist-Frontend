import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Logo = () => {
    return(
        <>
            <NavLink to='/' className="flex items-center gap-1 sm:gap-2 text-xs sm:text-xl font-bold text-white font-rubik hover:scale-102 transition-transform duration-150 cursor-pointer">
                <FontAwesomeIcon icon={faGraduationCap} size="lg" className="text-white" />
                KIHEAT Ranklist
            </NavLink>        
        </>
    )
}

export default Logo;
