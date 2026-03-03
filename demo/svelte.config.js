import adapter from '@sveltejs/adapter-auto';
import { skettel } from 'skettel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [skettel()],
	extensions: ['.svelte', '.skettel'],
	kit: {
		adapter: adapter()
	}
};

export default config;
