import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

const images = {
  'hero-image.jpg': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1920&q=80',
  'product-main.jpg': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80',
  'product-1.jpg': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
  'product-2.jpg': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
  'product-3.jpg': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80',
  'customer-1.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  'customer-2.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  'customer-3.jpg': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
};

const publicDir = path.join(__dirname, '../../public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

Object.entries(images).forEach(([filename, url]) => {
  const filepath = path.join(publicDir, filename);
  downloadImage(url, filepath)
    .then(filepath => console.log(`Downloaded: ${filepath}`))
    .catch(err => console.error(`Error downloading ${filename}:`, err));
}); 