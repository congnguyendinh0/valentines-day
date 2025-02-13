export default function MusicPlayer() {
  return (
    <div className="w-full max-w-xl mt-8 bg-white bg-opacity-80 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
      <iframe
        src="https://open.spotify.com/embed/track/4iZ4pt7kvcaH6Yo8UoZ4s2?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-2xl"
      />
    </div>
  )
}

