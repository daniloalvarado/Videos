import { ImageSection } from "./components/ImageSection"


const App = () => {
  return (
    <div>
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <span className="text-white/80 text-7xl tracking-[0.2em] uppercase">
          Scroll to explore
        </span>
      </div>
      <ImageSection />
      <div className="bg-black h-screen" />
    </div>
  )
}

export default App