import React from 'react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageSrc?: string;
  projectUrl?: string;
}

export default function ProjectModal({
  isOpen,
  onClose,
  title,
  description,
  imageSrc,
  projectUrl,
}: ProjectModalProps) {
  if (!isOpen) return null;

  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const isYouTubeUrl = imageSrc?.includes('youtube.com') || imageSrc?.includes('youtu.be');
  const videoId = isYouTubeUrl ? getYouTubeVideoId(imageSrc!) : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-[600px] max-h-[80vh] overflow-y-auto rounded-xl border-2 border-white/15 bg-blue-500/5 backdrop-blur-[4px] p-6 text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {imageSrc && (
          <div className="mb-6">
            {videoId ? (
              <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden border-2 border-white/15">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={imageSrc}
                alt={title}
                className="w-full h-64 object-cover rounded-lg border-2 border-white/15"
              />
            )}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-mono font-semibold">{title}</h2>
            {projectUrl && (
              <a
                href={projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 border-2 border-white/15 transition-all duration-200 whitespace-nowrap"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                <span className="font-mono text-sm">Visit Project</span>
              </a>
            )}
          </div>
          <p className="text-gray-300 font-mono">{description}</p>
        </div>
      </div>
    </div>
  );
}
