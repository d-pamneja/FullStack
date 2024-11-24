"use client"
import { useState, useEffect } from 'react';
import { AiOutlineLink } from 'react-icons/ai';

const LinkPreview = ({ url }: { url: string }) => {
  const [previewData, setPreviewData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreviewData = async () => {
      try {
        setLoading(true);

        const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}`);

        if (!response.ok) throw new Error('Failed to fetch preview');
        
        const data = await response.json();
        setPreviewData(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load preview');
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchPreviewData();
    }
  }, [url]);

  if (loading) {
    return (
      <div className="animate-pulse flex items-start space-x-4 mt-4 bg-black/20 rounded-lg p-4 backdrop-blur-sm">
        <div className="w-20 h-20 bg-gray-700 rounded" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-700 rounded w-full" />
          <div className="h-3 bg-gray-700 rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !previewData) {
    return (
      <div className="flex items-center space-x-2 mt-4 text-neutral-200 bg-black/20 rounded-lg p-4 backdrop-blur-sm">
        <AiOutlineLink className="w-5 h-5" />
        <span className="text-sm">{url}</span>
      </div>
    );
  }

  return (
        <div className="flex flex-col gap-4">
            {previewData.image?.url && (
                <div className="relative aspect-[16/9] bg-white/10 rounded-lg">
                    <img 
                        src={previewData.image.url} 
                        alt="" 
                        className="absolute inset-0 w-full h-full object-cover p-4 rounded-lg"
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                        }}
                    />
                </div>
            )}
        </div>
  );
};

export default LinkPreview;