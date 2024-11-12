// // Naive Approach
// export function Sidebar(){ 
//     return(
//         <main className="flex w-screen h-screen">
//             <div className="transition-all duration-1000 bg-red-300 p-4 md:w-52 w-12 hover:bg-red-100 hover:p-8 hidden md:block"> {/*Setting display to block makes it appear. So by default the sidebar is hidden, once we cross md threshold, it appears*/}
//                 Sidebar
//             </div>
//             <div className="bg-green-200 w-full">
//                 Content
//             </div>
//         </main>
//     )
// }

// // Better Approach 1 - Controlling Width
// export function Sidebar(){
//     return(
//         <main className="flex w-screen h-screen">
//             <div className="transition-all duration-1000 bg-red-300 p-4 md:w-52 w-16 hover:bg-red-100 hover:p-8"> {/*Note that : Here, we are controlling the width based on breakpoint, and using animations, we are controlling the duration of the change of width effectively rendering an animation*/}
//                 Sidebar
//             </div>
//             <div className="bg-green-200 w-full">
//                 Content
//             </div>
//         </main>
//     )
// }

// Better Approach - Using Translate
export function Sidebar(){
    return(
        <main className="flex w-screen h-screen">
            <div className="transition-all duration-1000 bg-red-300 p-4 md:translate-x-0 md:w-0 -translate-x-84 w-96"> {/*Note that here, by default the width is 0, and this element will be moved to the left by 96 i.e will be moved away from the screen. However, if the screen becomes bigger than equal to md, it's width becomes 96 and it will translate back to where it was*/}
                Sidebar
            </div>
            <div className="bg-green-200 w-full">
                Content
            </div>
        </main>
    )
}

export default Sidebar