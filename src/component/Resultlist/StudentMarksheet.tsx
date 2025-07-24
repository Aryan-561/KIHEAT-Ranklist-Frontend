import React, {useEffect, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


interface StudentMarksheetProps  {
    isOpen:boolean;
    onClose: ()=> void;
    marksheet:any;
    sem:string;
}

const StudentMarksheet: React.FC<StudentMarksheetProps> = ({isOpen, onClose, marksheet, sem })=>{
    const dialogRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
      // Prevent layout shift by adding padding equal to scrollbar width
      document.body.style.paddingRight = `${getScrollbarWidth()}px`;

      const handleEscape = (event: KeyboardEvent) => { // Type the event as KeyboardEvent
        if (event.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = ''; // Re-enable scrolling
        document.body.style.paddingRight = ''; // Reset padding
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      // Ensure scrolling is re-enabled and padding is reset if dialog closes
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [isOpen, onClose]);

  const getScrollbarWidth = (): number => { // Specify return type as number
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // Force scrollbar
    document.body.appendChild(outer);
    const inner = document.createElement('div');
    outer.appendChild(inner);
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.parentNode?.removeChild(outer); // Use optional chaining for parentNode
    return scrollbarWidth;
  };

  if (!isOpen) return null;

    return(
        <AnimatePresence>
 <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 bg-black/50 overflow-y-scroll"
        onClick={(e) => {
          if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
            onClose();
          }
        }}
      >
        <motion.div
          ref={dialogRef}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative mx-auto py-4 w-full sm:w-[80%] z-10 flex justify-center px-4 items-center min-h-screen"
          role="dialog"
          aria-modal="true"
        >
        {marksheet &&  <div className="text-black my-4 bg-emerald-800 border-black border-2 w-full sm:w-10/12 mx-auto flex flex-col items-center justify-center gap-2 p-2 sm:p-4 rounded-2xl relative">
                <div className="font-gabarito font-bold text-center text-xl sm:text-2xl border-b-3 border-white pb-1 mb-2 text-white ">
                  Student MarkSheet
                </div>
                    <button className="absolute top-1 right-2 sm:right-4 text-white cursor-pointer text-xl sm:text-2xl" onClick={()=> onClose()}><FontAwesomeIcon icon={faXmark}  /></button>
                <div className="w-full flex flex-col justify-center items-center bg-emerald-200 py-4 rounded-2xl border-2">
                <div className="font-rubik">
                    <div className="flex flex-col justify-center items-center gap-1 sm:gap-2 text-lg sm:text-xl my-4">
                        <div className="font-semibold">
                            {marksheet?.name}
                        </div>
                        <Link to={`/student/${marksheet?.enrollment}`} className="font-semibold text-green-800 underline flex justify-center items-center gap-1 hover:text-green-700 hover:scale-101">
                            <span>{marksheet?.enrollment}</span>
                            <FontAwesomeIcon icon={faUpRightFromSquare} className="text-base" />
                        </Link>
                        {sem !="overall" && <div className="font-semibold rounded-2xl bg-lime-100 p-1 px-2">
                            {marksheet?.gpa}
                        </div>}
                    </div>
                </div>
                <div className="w-[90%] sm:w-10/12  grid gap-2 grid-cols-3 sm:grid-cols-4 text-[0.6rem] sm:text-xs font-lexend">
                    
                    <div className="flex flex-col   border-2 border-emerald-800 justify-center items-center p-2 rounded-xl gap-1  font-semibold ">
                        <div>
                            Marks
                        </div>
                        <div>
                            {marksheet?.totalMarks}/{marksheet?.maxMarks}
                        </div>
                    </div>
                    <div className="flex flex-col border-2 border-emerald-800 justify-center items-center p-2 rounded-xl gap-1  font-semibold">
                        <div>
                            Credits
                        </div>
                        <div>
                            {marksheet?.totalCredits}/{marksheet?.maxCredits}
                        </div>
                    </div>
                    <div className="flex flex-col border-2 border-emerald-800 justify-center items-center p-2 rounded-xl  font-semibold gap-1">
                        <div>
                            Percentage
                        </div>
                        <div>
                            {marksheet?.percentage?.toFixed(2)}%
                        </div>
                    </div>
                    <div className="col-start-2 sm:col-start-4 flex flex-col border-2 border-emerald-800 justify-center items-center p-2 rounded-xl  font-semibold gap-1">
                        <div>
                            Rank
                        </div>
                        <div>
                            {marksheet?.rank}
                        </div>
                    </div>

                </div>
                </div>
                
                <div className="w-full flex flex-col gap-2 bg-emerald-200 p-3 rounded-2xl border-2">
                    
                    {sem=="overall"?(<>
                          <div className=" font-rubik text-[10px] sm:text-base grid grid-cols-4 gap-6 my-2 p-3  rounded-xl bg-emerald-800 text-white  font-medium text-center">
                        
                        <div>Semester</div>
                        <div>Marks</div>
                        <div>Percentage</div>
                        <div>SGPA</div>
                        
                    </div>
                    
                    {marksheet?.semesters?.map((semester: any) => (
                        <div className="font-lexend font-semibold  cursor-pointer bg-emerald-100 rounded-xl  grid grid-cols-4  gap-6  p-2 px-3  text-green-800 hover:bg-green-200 hover:scale-102 text-[8px] sm:text-sm border-2 text-center border-green-800" key={semester.sem}>
                            <div>{`sem${semester.sem}`}</div>
                            <div>{`${semester.totalMarks}/${semester.maxMarks}`}</div>
                            <div>{`${semester?.percentage?.toFixed(3) ?? 0}%`}</div>
                            <div>{semester.sgpa?.toFixed(3) ?? 0}</div>
                        </div>
                    ))}
                    
                    </>):
                    (<><div className=" font-rubik text-[10px] sm:text-base grid grid-cols-10 gap-6 my-2 p-3  rounded-xl bg-emerald-800 text-white  font-medium">
                        <div className="col-span-5 sm:col-span-6">Subject (credits)</div>
                        <div className="text-center col-span-2 sm:col-span-1">Int.|Ext.</div>
                        <div className="text-center col-span-3">Marks</div>
                        
                    </div>

                  
                    
                    {marksheet?.semester?.subjects?.map((subject:any)=> (
                        <div
                            key={subject?.paperCode}
                            className="font-lexend cursor-pointer bg-emerald-100 rounded-xl  grid grid-cols-10  gap-6 p-2 px-3  text-green-800 hover:bg-green-200 hover:scale-102 text-[8px] sm:text-sm font-medium border-2 border-green-800"
                        >
                            <div className=" col-span-5 sm:col-span-6 ">{subject?.paperName} ({subject?.credits})</div>
                            <div className="text-center col-span-2 sm:col-span-1 ">{subject?.internal}|{subject?.external}</div>
                            <div className="col-span-3 flex justify-center items-center gap-1 flex-wrap">
                                <span>{`${subject?.total}(${subject?.grade})`}</span>

                                {subject?.backlog && (<span className=" text-[8px]  sm:text-xs text-white px-1 mx-0.5 bg-red-500 rounded-sm ">Backlog</span>)}
                                
                                {subject?.reappear && 
                                <span className=" text-[8px] sm:text-xs text-white px-1 mx-0.5 bg-cyan-800 rounded-sm">Reappear</span>}
                            </div>
                            
                        </div>
                    ))}</>)}

                </div>

            </div>} 
      </motion.div>
    </motion.div>
        </AnimatePresence>
    )
}


export default StudentMarksheet;