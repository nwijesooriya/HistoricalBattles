'use client';

export default function LottieAnimation() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="w-full max-w-2xl">
        <video 
          src="/Swords.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto rounded-lg"
        />
      </div>
    </div>
  );
}
