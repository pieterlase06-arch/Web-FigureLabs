import './App.css'
import Header from './components/layout/Header'
import Button from './components/ui/Button'
import Badge from './components/ui/Badge'

function App() {
  return (
    <div className="min-h-screen bg-obsidian-canvas text-frost-text flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 space-y-12 max-w-[1200px] mx-auto w-full">
        {/* Component Showcase Area for Testing */}
        <div className="flex flex-col items-center space-y-6">
          <Badge variant="default">2/5 SPOTS LEFT FOR APRIL</Badge>
          <Badge variant="accent">EXPERIMENTAL AI ENGINE</Badge>
          
          <h1 className="text-display tracking-display font-aeonik font-normal leading-none text-center">
            Scientific precision,<br />visual excellence.
          </h1>
          
          <div className="flex items-center gap-4 pt-4">
            <Button variant="primary">Start Now</Button>
            <Button variant="outlined" icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            }>Read Manifesto</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
