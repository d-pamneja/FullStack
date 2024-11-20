import { ButtonDiv } from './components/ui/button'
import './App.css'
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from './components/ui/app-sidebar'

function App() {

  return (
    <div className='flex justify-end'>
      <div>
        <SidebarProvider>
          <AppSidebar />
          {/* <SidebarTrigger /> */}
        </SidebarProvider>
      </div>
      <div>
        <ButtonDiv className="mr-[-100px]"/>
      </div>
    </div>
      
  )
}

export default App
