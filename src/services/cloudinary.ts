import { api } from './api';

export type CloudinaryUpload = { secure_url:string; public_id:string; resource_type:string; format?:string; original_filename?:string };

const imageTypes = new Set(['image/jpeg','image/png','image/webp']);
const MAX_IMAGE = 6 * 1024 * 1024;
const MAX_PDF = 15 * 1024 * 1024;

export const cloudinaryConfigured = true;

export async function uploadToCloudinary(file:File, folder='sggs-tnp', resourceType?:'image'|'raw'): Promise<CloudinaryUpload> {
  const inferred: 'image'|'raw' = resourceType || (file.type === 'application/pdf' ? 'raw' : 'image');
  const max = inferred === 'raw' ? MAX_PDF : MAX_IMAGE;
  if (file.size <= 0 || file.size > max) throw new Error(`File exceeds the ${Math.round(max/1024/1024)} MB limit.`);
  if (inferred === 'image' && !imageTypes.has(file.type)) throw new Error('Only JPG, PNG and WebP images are allowed.');
  if (inferred === 'raw' && file.type !== 'application/pdf') throw new Error('Only PDF documents are allowed.');

  const signed = await api.media.signature({ resourceType: inferred, mimeType:file.type, size:file.size, folder });
  const endpoint = `https://api.cloudinary.com/v1_1/${signed.cloudName}/${inferred}/upload`;
  const form = new FormData();
  form.append('file', file);
  form.append('api_key', signed.apiKey);
  form.append('timestamp', String(signed.timestamp));
  form.append('signature', signed.signature);
  form.append('folder', signed.folder);
  form.append('public_id', signed.publicId);
  const res = await fetch(endpoint, { method:'POST', body:form });
  const body = await res.json().catch(()=>({}));
  if (!res.ok) throw new Error(body?.error?.message || 'Cloudinary upload failed');
  return body as CloudinaryUpload;
}
