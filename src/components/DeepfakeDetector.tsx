import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';

interface DetectionResult {
  result: string;
  confidence: string;
}

export function DeepfakeDetector() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [detectionMethod, setDetectionMethod] = useState<'basic' | 'advanced'>('basic');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleDetect = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedImage);
    formData.append('method', detectionMethod);

    try {
      const response = await fetch('/api/detect', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Detection failed');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error during detection:', error);
      setResult({
        result: 'Error during detection',
        confidence: '0.00%',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Deepfake Detection</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="image">Upload Image</Label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mt-4 max-w-full h-auto rounded-lg"
            />
          )}
        </div>

        <div>
          <Label>Detection Method</Label>
          <RadioGroup
            value={detectionMethod}
            onValueChange={(value: 'basic' | 'advanced') => setDetectionMethod(value)}
            className="mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="basic" id="basic" />
              <Label htmlFor="basic">Basic Model (Free)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="advanced" />
              <Label htmlFor="advanced">Advanced Model (API)</Label>
            </div>
          </RadioGroup>
        </div>

        <Button
          onClick={handleDetect}
          disabled={!selectedImage || isLoading}
          className="w-full"
        >
          {isLoading ? 'Detecting...' : 'Detect Deepfake'}
        </Button>

        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-semibold">Result: {result.result}</p>
            <p>Confidence: {result.confidence}</p>
          </div>
        )}
      </div>
    </Card>
  );
} 