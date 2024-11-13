
export function Content(){
    return(
        <div className="bg-white dark:bg-black text-black dark:text-white w-full">
            <div className="bg-black h-48"></div>
            <div className="flex lg:flex-row flex-col grid-rows-3 gap-4 mx-4">
                <div className="lg:block hidden flex flex-col bg-blue-300 w-1/3 h-[350px] rounded-xl -translate-y-16 border-slate-100 shadow-xl">
                    <div>
                        Box 1
                    </div>
                    <button 
                        className="mx-2 my-2 px-4 border-2 border-black rounded-2xl"
                        onClick={()=>{
                        document.querySelector("html").classList.toggle("dark")  // Dark Mode
                    }}>
                        Change Theme
                    </button>
                </div>
                <div className="bg-purple-300 lg:w-2/3 w-full lg:h-[400px] h-[300px] lg:mt-[100px] mt-[10px] rounded-xl order-slate-100 shadow-xl">
                    Box 2
                </div>
                <div className="bg-orange-300 lg:w-1/3 w-full lg:h-[350px] h-[240px] lg:mt-[100px] mt-[10px] rounded-xl border-slate-100 shadow-xl">
                    Box 3
                </div>
            </div>
        </div>
    )
}


export default Content