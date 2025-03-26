import React from 'react';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';
type DetectionResultsProps = {
  results: {
    isAi: boolean;
    confidence: number;
    detailedAnalysis: {
      genAI: number;
      faceManipulation: number;
      diffusion: {
        other: number;
        stableDiffusion: number;
        recraft: number;
        midjourney: number;
        imagen: number;
        ideogram: number;
        flux: number;
        firefly: number;
        dallE: number;
      };
      gan: {
        styleGAN: number;
      };
      other: {
        faceManipulation: number;
      };
    };
  };
};
export function DetectionResults({
  results
}: DetectionResultsProps) {
  const {
    isAi,
    confidence,
    detailedAnalysis
  } = results;
  return <div className="bg-gray-900/60 backdrop-blur-md rounded-xl p-6 border border-gray-800 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Detection Results</h2>
        <div className={`text-xl font-bold px-4 py-2 rounded-lg ${isAi ? 'bg-red-900/50 text-red-300' : 'bg-green-900/50 text-green-300'}`}>
          {confidence}%
        </div>
      </div>
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          {isAi ? <>
              <AlertTriangle className="h-8 w-8 text-red-500" />
              <h3 className="text-xl font-semibold text-red-400">
                Likely AI-generated or Deepfake
              </h3>
            </> : <>
              <CheckCircle className="h-8 w-8 text-green-500" />
              <h3 className="text-xl font-semibold text-green-400">
                Not likely to be AI-generated or Deepfake
              </h3>
            </>}
        </div>
        <p className="text-gray-300">
          {isAi ? 'Our detection system has identified patterns consistent with AI-generated or manipulated content in this image.' : 'Our detection system found no significant indicators of AI manipulation in this image.'}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center mb-2">
            <h4 className="text-lg font-medium">GenAI</h4>
            <Info size={16} className="ml-2 text-gray-500" />
          </div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500" style={{
            width: `${detailedAnalysis.genAI}%`
          }}></div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Score</span>
            <span>{detailedAnalysis.genAI}%</span>
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <h4 className="text-lg font-medium">Face Manipulation</h4>
            <Info size={16} className="ml-2 text-gray-500" />
          </div>
          <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-emerald-500" style={{
            width: `${detailedAnalysis.faceManipulation}%`
          }}></div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>Score</span>
            <span>{detailedAnalysis.faceManipulation}%</span>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Detailed Analysis</h3>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h4 className="text-lg font-medium">Diffusion</h4>
            <Info size={16} className="ml-2 text-gray-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(detailedAnalysis.diffusion).map(([key, value]) => <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span>{value}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{
                width: `${value}%`
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <h4 className="text-lg font-medium">GAN</h4>
            <Info size={16} className="ml-2 text-gray-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(detailedAnalysis.gan).map(([key, value]) => <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span>{value}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{
                width: `${value}%`
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
        <div>
          <div className="flex items-center mb-2">
            <h4 className="text-lg font-medium">Other</h4>
            <Info size={16} className="ml-2 text-gray-500" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(detailedAnalysis.other).map(([key, value]) => <div key={key}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span>{value}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{
                width: `${value}%`
              }}></div>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}