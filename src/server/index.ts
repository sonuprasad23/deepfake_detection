import express from 'express';
import multer from 'multer';
import { initializeModel, detectDeepfake } from '../api/detection';
import cors from 'cors';

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

// Enable CORS
app.use(cors());

// Initialize the model when the server starts
initializeModel().catch(console.error);

// Detection endpoint
app.post('/api/detect', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const method = req.body.method as 'basic' | 'advanced';
    if (!method || !['basic', 'advanced'].includes(method)) {
      return res.status(400).json({ error: 'Invalid detection method' });
    }

    const result = await detectDeepfake(req.file.buffer, method);
    res.json(result);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      result: 'Error during detection',
      confidence: '0.00%'
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 