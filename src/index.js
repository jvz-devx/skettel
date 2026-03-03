import { applyTransforms } from './transforms.js';

export function skettel() {
  return {
    name: 'skettel',
    markup({ content, filename }) {
      if (filename && !filename.endsWith('.skettel')) return;
      return { code: applyTransforms(content) };
    }
  };
}