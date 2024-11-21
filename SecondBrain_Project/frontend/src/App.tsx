import { ButtonDiv } from './components/ui/button'
import './App.css'
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from './components/ui/app-sidebar'

function App() {

  return (
    <div className='flex justify-between w-full'>
      <div className="flex justify-start">
        <SidebarProvider>
          <AppSidebar/>
          <SidebarTrigger className=''/>
        </SidebarProvider>
      </div>
      <div className='flex lg:flex-row flex-col lg:justify-between w-full'>
        <h1 className='text-5xl font-bold mx-4'>Workspace</h1>
        <ButtonDiv className="lg:justify-end justify-center lg:my-0 my-[20px]"/>
      </div>
    </div>
      
  )
}

export default App
