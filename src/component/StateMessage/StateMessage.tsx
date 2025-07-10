import type React from "react";

interface StateMessageProps {
    text:string,
    className?:string
}

  const StateMessage:React.FC<StateMessageProps> = ({ text, className }) => (
        <div className="font-rubik flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
            <div className="loader" />
            <div className={`text-3xl font-semibold text-center ${className}`}>{text}</div>
        </div>
    );

export default StateMessage;