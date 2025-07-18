import * as fs from 'fs';
import * as path from 'path';

/**
 * Converts an image file to base64 string
 * @param imagePath - Path to the image file (relative to public directory)
 * @returns Promise<string> - Base64 encoded image string with data URI
 */
export async function convertImageToBase64(imagePath: string): Promise<string> {
  try {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    
    // Construct full path to image (assuming images are in public directory)
    let fullPath = path.join(process.cwd(), 'public', cleanPath);
    
    // Check if file exists, if not try alternative locations
    if (!fs.existsSync(fullPath)) {
      console.warn(`Image file not found at: ${fullPath}`);
      
      // Try alternative locations
      const alternatives = [
        path.join(process.cwd(), 'public', 'images', path.basename(imagePath)),
        path.join(process.cwd(), 'src', 'assets', path.basename(imagePath)),
        path.join(process.cwd(), 'assets', path.basename(imagePath)),
        path.join(process.cwd(), path.basename(imagePath)), // Project root
        path.join(process.cwd(), 'public', 'signature.png'), // Lowercase
        path.join(process.cwd(), 'public', 'images', 'signature.png'),
      ];

      let found = false;
      for (const alt of alternatives) {
        if (fs.existsSync(alt)) {
          console.log(`Found alternative image at: ${alt}`);
          fullPath = alt;
          found = true;
          break;
        }
      }

      if (!found) {
        console.warn('No signature image found, returning default transparent image');
        // Return a default transparent 1x1 PNG
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
      }
    }
    
    // Read image file
    const imageBuffer = fs.readFileSync(fullPath);
    
    // Get file extension to determine MIME type
    const ext = path.extname(fullPath).toLowerCase();
    
    // Determine MIME type
    let mimeType: string;
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        mimeType = 'image/jpeg';
        break;
      case '.png':
        mimeType = 'image/png';
        break;
      case '.gif':
        mimeType = 'image/gif';
        break;
      case '.svg':
        mimeType = 'image/svg+xml';
        break;
      case '.webp':
        mimeType = 'image/webp';
        break;
      default:
        mimeType = 'image/jpeg'; // Default fallback
    }
    
    // Convert buffer to base64
    const base64String = imageBuffer.toString('base64');
    
    // Return data URI format
    return `data:${mimeType};base64,${base64String}`;
    
  } catch (error) {
    console.error('Error converting image to base64:', error);
    // Return default transparent image instead of throwing
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  }
}

/**
 * Alternative async version using promises with better error handling
 * @param imagePath - Path to the image file
 * @returns Promise<string> - Base64 encoded image string
 */
export function convertImageToBase64Async(imagePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
      let fullPath = path.join(process.cwd(), 'public', cleanPath);
      
      // Check if file exists
      if (!fs.existsSync(fullPath)) {
        console.warn(`Image file not found at: ${fullPath}`);
        
        // Try alternative locations
        const alternatives = [
          path.join(process.cwd(), 'public', 'images', path.basename(imagePath)),
          path.join(process.cwd(), 'src', 'assets', path.basename(imagePath)),
          path.join(process.cwd(), 'assets', path.basename(imagePath)),
          path.join(process.cwd(), path.basename(imagePath)),
          path.join(process.cwd(), 'public', 'signature.png'),
          path.join(process.cwd(), 'public', 'images', 'signature.png'),
        ];

        let found = false;
        for (const alt of alternatives) {
          if (fs.existsSync(alt)) {
            console.log(`Found alternative image at: ${alt}`);
            fullPath = alt;
            found = true;
            break;
          }
        }

        if (!found) {
          console.warn('No signature image found, returning default transparent image');
          resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
          return;
        }
      }
      
      // Use async file reading
      fs.readFile(fullPath, (err, data) => {
        if (err) {
          console.error(`Failed to read image file: ${err.message}`);
          // Return default image instead of rejecting
          resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
          return;
        }
        
        const ext = path.extname(fullPath).toLowerCase();
        let mimeType: string;
        
        switch (ext) {
          case '.jpg':
          case '.jpeg':
            mimeType = 'image/jpeg';
            break;
          case '.png':
            mimeType = 'image/png';
            break;
          case '.gif':
            mimeType = 'image/gif';
            break;
          case '.svg':
            mimeType = 'image/svg+xml';
            break;
          case '.webp':
            mimeType = 'image/webp';
            break;
          default:
            mimeType = 'image/jpeg';
        }
        
        const base64String = data.toString('base64');
        resolve(`data:${mimeType};base64,${base64String}`);
      });
    } catch (error) {
      console.error(`Failed to convert image to base64: ${error.message}`);
      // Return default image instead of rejecting
      resolve('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
    }
  });
}

/**
 * Synchronous version for simple use cases with better error handling
 * @param imagePath - Path to the image file
 * @returns string - Base64 encoded image string
 */
export function convertImageToBase64Sync(imagePath: string): string {
  try {
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    let fullPath = path.join(process.cwd(), 'public', cleanPath);
    
    if (!fs.existsSync(fullPath)) {
      console.warn(`Image file not found at: ${fullPath}`);
      
      // Try alternative locations
      const alternatives = [
        path.join(process.cwd(), 'public', 'images', path.basename(imagePath)),
        path.join(process.cwd(), 'src', 'assets', path.basename(imagePath)),
        path.join(process.cwd(), 'assets', path.basename(imagePath)),
        path.join(process.cwd(), path.basename(imagePath)),
        path.join(process.cwd(), 'public', 'signature.png'),
        path.join(process.cwd(), 'public', 'images', 'signature.png'),
      ];

      let found = false;
      for (const alt of alternatives) {
        if (fs.existsSync(alt)) {
          console.log(`Found alternative image at: ${alt}`);
          fullPath = alt;
          found = true;
          break;
        }
      }

      if (!found) {
        console.warn('No signature image found, returning default transparent image');
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
      }
    }
    
    const imageBuffer = fs.readFileSync(fullPath);
    const ext = path.extname(fullPath).toLowerCase();
    
    let mimeType: string;
    switch (ext) {
      case '.jpg':
      case '.jpeg':
        mimeType = 'image/jpeg';
        break;
      case '.png':
        mimeType = 'image/png';
        break;
      case '.gif':
        mimeType = 'image/gif';
        break;
      case '.svg':
        mimeType = 'image/svg+xml';
        break;
      case '.webp':
        mimeType = 'image/webp';
        break;
      default:
        mimeType = 'image/jpeg';
    }
    
    const base64String = imageBuffer.toString('base64');
    return `data:${mimeType};base64,${base64String}`;
    
  } catch (error) {
    console.error('Error converting image to base64:', error);
    // Return default transparent image instead of throwing
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
  }
}

/**
 * Create a default signature image file
 * @param outputPath - Path where to create the default signature
 */
export function createDefaultSignature(outputPath?: string): void {
  const defaultPath = outputPath || path.join(process.cwd(), 'public', 'signature.png');
  
  // Ensure directory exists
  const dir = path.dirname(defaultPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Create a simple transparent PNG (1x1 pixel)
  const defaultSignature = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
    'base64'
  );
  
  if (!fs.existsSync(defaultPath)) {
    fs.writeFileSync(defaultPath, defaultSignature);
    console.log(`Created default signature at: ${defaultPath}`);
  }
}