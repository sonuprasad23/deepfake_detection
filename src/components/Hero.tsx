import React, { useState, useRef } from 'react';
import { Upload, Zap, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { DetectionResults } from './DetectionResults';
export function Hero() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any | null>(null);
  const [detectionMethod, setDetectionMethod] = useState<'basic' | 'advanced'>('basic');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setUploadedImage(event.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = event => {
        setUploadedImage(event.target?.result as string);
        setResults(null);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const analyzeImage = () => {
    if (!uploadedImage) return;
    setIsAnalyzing(true);
    // Mock API call - simulating backend response
    setTimeout(() => {
      // Generate random results for demo purposes
      const isAi = Math.random() > 0.5;
      const confidence = Math.round(70 + Math.random() * 29);
      setResults({
        isAi,
        confidence,
        detailedAnalysis: {
          genAI: Math.round(isAi ? 80 + Math.random() * 19 : Math.random() * 5),
          faceManipulation: Math.round(isAi ? 60 + Math.random() * 30 : Math.random() * 3),
          diffusion: {
            other: Math.round(isAi ? Math.random() * 80 : Math.random() * 2),
            stableDiffusion: Math.round(isAi ? Math.random() * 90 : Math.random() * 1),
            recraft: Math.round(isAi ? Math.random() * 70 : 0),
            midjourney: Math.round(isAi ? Math.random() * 85 : Math.random() * 2),
            imagen: Math.round(isAi ? Math.random() * 60 : 0),
            ideogram: Math.round(isAi ? Math.random() * 50 : 0),
            flux: Math.round(isAi ? Math.random() * 40 : 0),
            firefly: Math.round(isAi ? Math.random() * 30 : 0),
            dallE: Math.round(isAi ? Math.random() * 75 : Math.random() * 1)
          },
          gan: {
            styleGAN: Math.round(isAi ? Math.random() * 65 : 0)
          },
          other: {
            faceManipulation: Math.round(isAi ? Math.random() * 55 : 0)
          }
        }
      });
      setIsAnalyzing(false);
    }, 2000);
  };
  return <section id="home" className="py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
          Detect Deepfakes with AI Precision
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Our advanced AI technology can identify manipulated media with high
          accuracy. Upload an image to see if it's authentic or AI-generated.
        </p>
        <div className="mb-8">
          <div className="flex justify-center space-x-4 mb-6">
            <button className={`px-6 py-2 rounded-full transition ${detectionMethod === 'basic' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`} onClick={() => setDetectionMethod('basic')}>
              Basic Model (Free)
            </button>
            <button className={`px-6 py-2 rounded-full transition ${detectionMethod === 'advanced' ? 'bg-emerald-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`} onClick={() => setDetectionMethod('advanced')}>
              Advanced Model (Premium)
            </button>
          </div>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 mb-6 cursor-pointer hover:border-emerald-500 transition" onClick={triggerFileInput} onDrop={handleDrop} onDragOver={handleDragOver}>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleUpload} />
            {!uploadedImage ? <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg text-gray-300 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPG, PNG, WEBP (Max 5MB)
                </p>
              </div> : <div className="relative">
                <img src={uploadedImage} alt="Uploaded" className="max-h-96 mx-auto rounded-lg" />
                <button className="absolute top-2 right-2 bg-gray-900/80 p-1 rounded-full" onClick={e => {
              e.stopPropagation();
              setUploadedImage(null);
              setResults(null);
            }}>
                  <X size={20} className="text-white" />
                </button>
              </div>}
          </div>
          {uploadedImage && !results && <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-medium flex items-center justify-center space-x-2 mx-auto transition" onClick={analyzeImage} disabled={isAnalyzing}>
              {isAnalyzing ? <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  <span>Analyzing...</span>
                </> : <>
                  <Zap size={20} />
                  <span>Detect Deepfake</span>
                </>}
            </button>}
        </div>
        {results && <DetectionResults results={results} />}
      </div>
    </section>;
}