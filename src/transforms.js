import MagicString from 'magic-string';

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
  ['{:nah_man ef ', '{:else if '],
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

/**
 * Find regions in code that should not be transformed:
 * string literals (single, double, backtick) and comments (// and /* *\/).
 * Template literal ${...} expressions are left unprotected.
 */
function findProtectedRegions(code) {
  const regions = [];
  let i = 0;

  while (i < code.length) {
    const ch = code[i];
    const next = code[i + 1];

    if (ch === "'" || ch === '"') {
      const quote = ch;
      const start = i;
      i++;
      while (i < code.length) {
        if (code[i] === '\\') { i += 2; continue; }
        if (code[i] === quote) { i++; break; }
        i++;
      }
      regions.push([start, i]);
    } else if (ch === '`') {
      let segStart = i;
      i++;
      while (i < code.length) {
        if (code[i] === '\\') { i += 2; continue; }
        if (code[i] === '$' && code[i + 1] === '{') {
          regions.push([segStart, i]);
          i += 2;
          let depth = 1;
          while (i < code.length && depth > 0) {
            if (code[i] === '{') depth++;
            else if (code[i] === '}') depth--;
            if (depth > 0) i++;
          }
          i++;
          segStart = i;
          continue;
        }
        if (code[i] === '`') { i++; break; }
        i++;
      }
      regions.push([segStart, i]);
    } else if (ch === '/' && next === '/') {
      const start = i;
      i += 2;
      while (i < code.length && code[i] !== '\n') i++;
      regions.push([start, i]);
    } else if (ch === '/' && next === '*') {
      const start = i;
      i += 2;
      while (i < code.length && !(code[i] === '*' && code[i + 1] === '/')) i++;
      i += 2;
      regions.push([start, i]);
    } else {
      i++;
    }
  }

  return regions;
}

export function applyTransforms(code, filename) {
  const s = new MagicString(code);
  const protectedRegions = findProtectedRegions(code);
  const overwritten = [];

  function overlaps(start, end) {
    for (const [s, e] of overwritten) {
      if (start < e && end > s) return true;
    }
    return false;
  }

  function isProtected(start, end) {
    for (const [s, e] of protectedRegions) {
      if (start >= s && end <= e) return true;
    }
    return false;
  }

  function replaceAllLiteral(from, to, skipProtection = false) {
    let idx = code.indexOf(from);
    while (idx !== -1) {
      const end = idx + from.length;
      if (!overlaps(idx, end) && (skipProtection || !isProtected(idx, end))) {
        s.overwrite(idx, end, to);
        overwritten.push([idx, end]);
      }
      idx = code.indexOf(from, idx + from.length);
    }
  }

  // Import paths first (these intentionally target quoted strings)
  for (const [from, to] of importTransforms) {
    replaceAllLiteral(from, to, true);
  }

  // Literal string replacements
  for (const [from, to] of transforms) {
    replaceAllLiteral(from, to);
  }

  // Store replacements
  for (const [from, to] of storeTransforms) {
    replaceAllLiteral(from, to);
  }

  // Regex replacements (word-boundary)
  for (const [pattern, to] of regexTransforms) {
    const re = new RegExp(pattern.source, pattern.flags);
    let match;
    while ((match = re.exec(code)) !== null) {
      const start = match.index;
      const end = start + match[0].length;
      if (!overlaps(start, end) && !isProtected(start, end)) {
        s.overwrite(start, end, to);
        overwritten.push([start, end]);
      }
    }
  }

  return {
    code: s.toString(),
    map: s.generateMap({ source: filename, hires: true }),
  };
}
