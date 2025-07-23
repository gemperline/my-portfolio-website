export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-text px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Hey, I'm <span className="text-primary">Adam Gemperline</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-xl mx-auto">
          I'm a software engineer who builds modern, elegant web apps using
          clean code, smart design, and a bit of flair.
        </p>
        <div>
          <a
            href="#projects"
            className="inline-block bg-primary text-text font-medium py-3 px-6 rounded-lg hover:bg-opacity-80 transition"
          >
            View My Work
          </a>
        </div>
      </div>
    </main>
  )
}
