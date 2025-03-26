import { loadModel } from '@tensorflow/tfjs-node';
import * as tf from '@tensorflow/tfjs-node';
import sharp from 'sharp';
import axios from 'axios';

// API credentials
const API_USER = process.env.SIGHTENGINE_API_USER || "122582252";
const API_SECRET = process.env.SIGHTENGINE_API_SECRET || "7qbojdHTDQe4D7fHNbwVB7338pqLdEdD";

let model: tf.LayersModel | null = null;

// Initialize the model
export async function initializeModel() {
  try {
    model = await loadModel('file://./models/yes_final_model.h5');
    console.log('Model loaded successfully');
  } catch (error) {
    console.error('Error loading model:', error);
  }
}

// Preprocess image for the basic model
async function preprocessImage(imageBuffer: Buffer): Promise<tf.Tensor> {
  const resizedImageBuffer = await sharp(imageBuffer)
    .resize(256, 256)
    .toBuffer();
  
  const image = tf.node.decodeImage(resizedImageBuffer);
  const normalized = image.div(255.0);
  const expanded = normalized.expandDims(0);
  
  return expanded;
}

// Basic model detection
async function detectWithBasicModel(imageBuffer: Buffer): Promise<{ result: string; confidence: string }> {
  if (!model) {
    throw new Error('Model not initialized');
  }

  const preprocessedImage = await preprocessImage(imageBuffer);
  const prediction = model.predict(preprocessedImage) as tf.Tensor;
  const probability = await prediction.data();
  
  const probabilityReal = probability[0] * 100;
  const probabilityAI = (1 - probability[0]) * 100;

  if (probabilityReal >= probabilityAI) {
    return {
      result: "Input Image is Real",
      confidence: probabilityReal.toFixed(2) + "%"
    };
  } else {
    return {
      result: "Input Image is AI Generated",
      confidence: probabilityAI.toFixed(2) + "%"
    };
  }
}

// Advanced API detection
async function detectWithAdvancedModel(imageBuffer: Buffer): Promise<{ result: string; confidence: string }> {
  try {
    const formData = new FormData();
    formData.append('media', new Blob([imageBuffer]), 'image.jpg');
    
    const params = new URLSearchParams({
      'models': 'deepfake',
      'api_user': API_USER,
      'api_secret': API_SECRET
    });

    const response = await axios.post(
      'https://api.sightengine.com/1.0/check.json',
      formData,
      {
        params,
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    const output = response.data;
    if ("deepfake" in output.type) {
      const confidence = output.type.deepfake * 100;
      if (confidence > 50) {
        return {
          result: "Input Image is AI Generated",
          confidence: confidence.toFixed(2) + "%"
        };
      } else {
        return {
          result: "Input Image is Real",
          confidence: (100 - confidence).toFixed(2) + "%"
        };
      }
    }

    return {
      result: "Could not determine",
      confidence: "0.00%"
    };
  } catch (error) {
    console.error('Error in advanced detection:', error);
    throw new Error('Advanced detection failed');
  }
}

// Main detection function
export async function detectDeepfake(
  imageBuffer: Buffer,
  method: 'basic' | 'advanced'
): Promise<{ result: string; confidence: string }> {
  try {
    if (method === 'basic') {
      return await detectWithBasicModel(imageBuffer);
    } else {
      return await detectWithAdvancedModel(imageBuffer);
    }
  } catch (error) {
    console.error('Detection error:', error);
    return {
      result: "Error during detection",
      confidence: "0.00%"
    };
  }
} 