const transforms = [
  // === Runes ===
  // Sub-methods must come before base runes to avoid partial matches
  ['$ting.raw(', '$state.raw('],
  ['$ting.snapshot(', '$state.snapshot('],
  ['$ting(', '$state('],
  ['$figga_out.by(', '$derived.by('],
  ['$figga_out(', '$derived('],
  ['$gwaan.pre(', '$effect.pre('],
  ['$gwaan.root(', '$effect.root('],
  ['$gwaan(', '$effect('],
  ['$wah_yuh_bring(', '$props('],
  ['$check_dis(', '$inspect('],
  ['$link_up', '$bindable'],

  // === Template blocks ===
  ['{#ef ', '{#if '],
  ['{:nah_man}', '{:else}'],
  ['{/ef}', '{/if}'],
  ['{#every ', '{#each '],
  ['{/every}', '{/each}'],
  ['{#hol_on ', '{#await '],
  ['{:bless ', '{:then '],
  ['{:bloodclaat ', '{:catch '],
  ['{/hol_on}', '{/await}'],
  ['{#likkle_bit ', '{#snippet '],
  ['{/likkle_bit}', '{/snippet}'],
  ['{@big_up ', '{@render '],
  ['{@bare ', '{@html '],
  ['{@wah_a_gwaan ', '{@debug '],
  ['{@lock_dung ', '{@const '],

  // === Event handlers ===
  ['wen_yuh_press=', 'onclick='],
  ['wen_yuh_type=', 'oninput='],
  ['wen_yuh_change=', 'onchange='],
  ['wen_yuh_hover=', 'onmouseenter='],
  ['wen_yuh_leave=', 'onmouseleave='],
  ['wen_yuh_submit=', 'onsubmit='],

  // === Directives ===
  ['link_up:', 'bind:'],
  ['vibes:', 'transition:'],
  ['come_een:', 'in:'],
  ['guh_weh:', 'out:'],
  ['dance:', 'animate:'],
  ['rock:', 'class:'],
  ['tek:', 'use:'],

  // === Lifecycle ===
  ['wen_mi_reach', 'onMount'],
  ['wen_mi_lef', 'onDestroy'],

  // === Utilities ===
  ['bawl_out(', 'console.log('],
  ['warn_dem(', 'console.warn('],
  ['bumbaclaat(', 'console.error('],
  ['soon_come(', 'setTimeout('],
  ['nah_stop(', 'setInterval('],
];

const regexTransforms = [
  [/\byeah_man\b/g, 'true'],
  [/\bno_sah\b/g, 'false'],
  [/\bnutten\b/g, 'null'],
  [/\bnuh_def\b/g, 'undefined'],
];

const storeTransforms = [
  ['yuh_can_change', 'writable'],
  ['jus_look', 'readable'],
];

// Sub-paths must be replaced before bare 'skettel' to avoid partial matches
const importTransforms = [
  ["'skettel/stash'", "'svelte/store'"],
  ["'skettel/move'", "'svelte/transition'"],
  ["'skettel/motion'", "'svelte/motion'"],
  ["'skettel/anime'", "'svelte/animate'"],
  ["'skettel'", "'svelte'"],
  ['"skettel/stash"', '"svelte/store"'],
  ['"skettel/move"', '"svelte/transition"'],
  ['"skettel/motion"', '"svelte/motion"'],
  ['"skettel/anime"', '"svelte/animate"'],
  ['"skettel"', '"svelte"'],
];

export function applyTransforms(code) {
  let result = code;

  // Import paths first (sub-paths before bare)
  for (const [from, to] of importTransforms) {
    result = result.replaceAll(from, to);
  }

  // Literal string replacements
  for (const [from, to] of transforms) {
    result = result.replaceAll(from, to);
  }

  // Store replacements
  for (const [from, to] of storeTransforms) {
    result = result.replaceAll(from, to);
  }

  // Regex replacements (word-boundary)
  for (const [pattern, to] of regexTransforms) {
    result = result.replace(pattern, to);
  }

  return result;
}
