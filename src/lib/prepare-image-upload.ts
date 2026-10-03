const MAX_SOURCE_SIZE = 15 * 1024 * 1024;
const MAX_ACTION_FILE_SIZE = 4 * 1024 * 1024;
const COMPRESSED_TARGET_SIZE = 3.5 * 1024 * 1024;
const MAX_IMAGE_DIMENSION = 2880;

const SUPPORTED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/tiff",
]);

function canvasToWebp(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob || blob.type !== "image/webp") {
          reject(new Error("This browser cannot compress images to WebP."));
          return;
        }
        resolve(blob);
      },
      "image/webp",
      quality
    );
  });
}

/** Compresses oversized source images in the browser so they fit Vercel's request limit. */
export async function prepareImageUpload(file: File): Promise<File> {
  if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Choose a JPG, PNG, WebP, AVIF, or TIFF image.");
  }

  if (file.size > MAX_SOURCE_SIZE) {
    throw new Error("The original image is over 15 MB. Compress it below 15 MB, then try again.");
  }

  if (file.size <= MAX_ACTION_FILE_SIZE) return file;

  if (typeof createImageBitmap !== "function") {
    throw new Error("This browser cannot compress this image. Use a JPG, PNG, or WebP below 4 MB.");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("This image format cannot be compressed in your browser. Convert it to JPG or WebP below 4 MB.");
  }

  const canvas = document.createElement("canvas");
  try {
    let scale = Math.min(
      1,
      MAX_IMAGE_DIMENSION / bitmap.width,
      MAX_IMAGE_DIMENSION / bitmap.height
    );

    for (let dimensionPass = 0; dimensionPass < 5; dimensionPass += 1) {
      canvas.width = Math.max(1, Math.round(bitmap.width * scale));
      canvas.height = Math.max(1, Math.round(bitmap.height * scale));
      const context = canvas.getContext("2d");
      if (!context) throw new Error("The browser could not prepare this image.");
      context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

      for (const quality of [0.86, 0.78, 0.7, 0.62]) {
        const blob = await canvasToWebp(canvas, quality);
        if (blob.size <= COMPRESSED_TARGET_SIZE) {
          const baseName = file.name.replace(/\.[^.]+$/, "") || "mkan-image";
          return new File([blob], `${baseName}.webp`, {
            type: "image/webp",
            lastModified: Date.now(),
          });
        }
      }

      scale *= 0.82;
    }

    throw new Error("This image is still too large after compression. Use an image compressor and keep it below 4 MB.");
  } finally {
    bitmap.close();
    canvas.width = 0;
    canvas.height = 0;
  }
}
