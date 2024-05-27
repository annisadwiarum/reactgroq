import './App.css'
import { useState } from 'react'
import { requestGroqAi } from './utils/groq'
import { Light as SyntaxHiglight } from 'react-syntax-highlighter'
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import ReactLoading from 'react-loading'

function App() {
  const [data, setData] = useState('')
  const [content, setContent] = useState('')
  const [showLoading, setShowLoading] = useState(false)

  const handleSubmit = async () => {
    setShowLoading(true)
    const ai = await requestGroqAi(content)
    setTimeout(() => {
      setData(ai)
      setShowLoading(false)
    }, 2000)
    console.log(ai)
  }
  return (
    <main className="flex flex-col min-h-[80vh] justify-center gap-3 items-center max-w-xl w-full mx-auto">
      <h1 className="font-bold text-green-500">REACT X GROQ AI by Anne</h1>
      <form action="" className="flex flex-col gap-4 py-4 w-full">
        <input
          type="text"
          className="py-2 px-4 text-md rounded-md"
          placeholder="ketik permintaan di sini.."
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          disabled={showLoading}
          type="button"
          className="bg-green-500 py-2 px-4 font-bold text-white rounded-md flex items-center justify-center"
        >
          {showLoading ? (
            <ReactLoading
              type="bubbles"
              color="#ffffff"
              height={30}
              width={30}
            />
          ) : (
            'Kirim'
          )}
        </button>
      </form>
      <div className="max-w-xl">
        {data ? (
          <SyntaxHiglight language="swift" style={darcula} wrapLongLines={true}>
            {data}
          </SyntaxHiglight>
        ) : null}
      </div>
    </main>
  )
}

export default App
