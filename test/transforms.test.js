import { describe, it, expect } from 'vitest';
import { applyTransforms } from '../src/transforms.js';
import { skettel } from '../src/index.js';

describe('Runes', () => {
  it('$ting → $state', () => {
    expect(applyTransforms('let x = $ting(0)').code).toBe('let x = $state(0)');
  });

  it('$ting.raw → $state.raw', () => {
    expect(applyTransforms('let x = $ting.raw({})').code).toBe('let x = $state.raw({})');
  });

  it('$ting.snapshot → $state.snapshot', () => {
    expect(applyTransforms('$ting.snapshot(obj)').code).toBe('$state.snapshot(obj)');
  });

  it('$figga_out → $derived', () => {
    expect(applyTransforms('let d = $figga_out(x * 2)').code).toBe('let d = $derived(x * 2)');
  });

  it('$figga_out.by → $derived.by', () => {
    expect(applyTransforms('let d = $figga_out.by(() => x * 2)').code).toBe('let d = $derived.by(() => x * 2)');
  });

  it('$gwaan → $effect', () => {
    expect(applyTransforms('$gwaan(() => {})').code).toBe('$effect(() => {})');
  });

  it('$gwaan.pre → $effect.pre', () => {
    expect(applyTransforms('$gwaan.pre(() => {})').code).toBe('$effect.pre(() => {})');
  });

  it('$gwaan.root → $effect.root', () => {
    expect(applyTransforms('$gwaan.root(() => {})').code).toBe('$effect.root(() => {})');
  });

  it('$wah_yuh_bring → $props', () => {
    expect(applyTransforms('let { a } = $wah_yuh_bring()').code).toBe('let { a } = $props()');
  });

  it('$check_dis → $inspect', () => {
    expect(applyTransforms('$check_dis(val)').code).toBe('$inspect(val)');
  });

  it('$link_up → $bindable', () => {
    expect(applyTransforms('$link_up').code).toBe('$bindable');
  });
});

describe('Template blocks', () => {
  it('{#ef → {#if', () => {
    expect(applyTransforms('{#ef hungry}').code).toBe('{#if hungry}');
  });

  it('{:nah_man} → {:else}', () => {
    expect(applyTransforms('{:nah_man}').code).toBe('{:else}');
  });

  it('{:nah_man ef → {:else if', () => {
    expect(applyTransforms('{:nah_man ef x > 5}').code).toBe('{:else if x > 5}');
  });

  it('{:nah_man ef does not break {:nah_man}', () => {
    const input = '{#ef x}{:nah_man ef y}{:nah_man}{/ef}';
    expect(applyTransforms(input).code).toBe('{#if x}{:else if y}{:else}{/if}');
  });

  it('{/ef} → {/if}', () => {
    expect(applyTransforms('{/ef}').code).toBe('{/if}');
  });

  it('{#every → {#each', () => {
    expect(applyTransforms('{#every items as item}').code).toBe('{#each items as item}');
  });

  it('{/every} → {/each}', () => {
    expect(applyTransforms('{/every}').code).toBe('{/each}');
  });

  it('{#hol_on → {#await', () => {
    expect(applyTransforms('{#hol_on fetchData()}').code).toBe('{#await fetchData()}');
  });

  it('{:bless → {:then', () => {
    expect(applyTransforms('{:bless data}').code).toBe('{:then data}');
  });

  it('{:bloodclaat → {:catch', () => {
    expect(applyTransforms('{:bloodclaat error}').code).toBe('{:catch error}');
  });

  it('{/hol_on} → {/await}', () => {
    expect(applyTransforms('{/hol_on}').code).toBe('{/await}');
  });

  it('{#likkle_bit → {#snippet', () => {
    expect(applyTransforms('{#likkle_bit header()}').code).toBe('{#snippet header()}');
  });

  it('{/likkle_bit} → {/snippet}', () => {
    expect(applyTransforms('{/likkle_bit}').code).toBe('{/snippet}');
  });

  it('{@big_up → {@render', () => {
    expect(applyTransforms('{@big_up header()}').code).toBe('{@render header()}');
  });
});

describe('Special tags', () => {
  it('{@bare → {@html', () => {
    expect(applyTransforms('{@bare content}').code).toBe('{@html content}');
  });

  it('{@wah_a_gwaan → {@debug', () => {
    expect(applyTransforms('{@wah_a_gwaan variable}').code).toBe('{@debug variable}');
  });

  it('{@lock_dung → {@const', () => {
    expect(applyTransforms('{@lock_dung x = 5}').code).toBe('{@const x = 5}');
  });
});

describe('Event handlers', () => {
  it('wen_yuh_press → onclick', () => {
    expect(applyTransforms('wen_yuh_press={fn}').code).toBe('onclick={fn}');
  });

  it('wen_yuh_type → oninput', () => {
    expect(applyTransforms('wen_yuh_type={fn}').code).toBe('oninput={fn}');
  });

  it('wen_yuh_change → onchange', () => {
    expect(applyTransforms('wen_yuh_change={fn}').code).toBe('onchange={fn}');
  });

  it('wen_yuh_hover → onmouseenter', () => {
    expect(applyTransforms('wen_yuh_hover={fn}').code).toBe('onmouseenter={fn}');
  });

  it('wen_yuh_leave → onmouseleave', () => {
    expect(applyTransforms('wen_yuh_leave={fn}').code).toBe('onmouseleave={fn}');
  });

  it('wen_yuh_submit → onsubmit', () => {
    expect(applyTransforms('wen_yuh_submit={fn}').code).toBe('onsubmit={fn}');
  });
});

describe('Directives', () => {
  it('link_up: → bind:', () => {
    expect(applyTransforms('link_up:value={name}').code).toBe('bind:value={name}');
  });

  it('vibes: → transition:', () => {
    expect(applyTransforms('vibes:fade').code).toBe('transition:fade');
  });

  it('come_een: → in:', () => {
    expect(applyTransforms('come_een:fly').code).toBe('in:fly');
  });

  it('guh_weh: → out:', () => {
    expect(applyTransforms('guh_weh:fade').code).toBe('out:fade');
  });

  it('dance: → animate:', () => {
    expect(applyTransforms('dance:flip').code).toBe('animate:flip');
  });

  it('rock: → class:', () => {
    expect(applyTransforms('rock:active={isActive}').code).toBe('class:active={isActive}');
  });

  it('tek: → use:', () => {
    expect(applyTransforms('tek:tooltip').code).toBe('use:tooltip');
  });
});

describe('Lifecycle', () => {
  it('wen_mi_reach → onMount', () => {
    expect(applyTransforms('wen_mi_reach(() => {})').code).toBe('onMount(() => {})');
  });

  it('wen_mi_lef → onDestroy', () => {
    expect(applyTransforms('wen_mi_lef(() => {})').code).toBe('onDestroy(() => {})');
  });
});

describe('Utilities', () => {
  it('bawl_out → console.log', () => {
    expect(applyTransforms("bawl_out('yo')").code).toBe("console.log('yo')");
  });

  it('warn_dem → console.warn', () => {
    expect(applyTransforms("warn_dem('careful')").code).toBe("console.warn('careful')");
  });

  it('bumbaclaat → console.error', () => {
    expect(applyTransforms("bumbaclaat('it bruck!')").code).toBe("console.error('it bruck!')");
  });

  it('soon_come → setTimeout', () => {
    expect(applyTransforms('soon_come(() => {}, 1000)').code).toBe('setTimeout(() => {}, 1000)');
  });

  it('nah_stop → setInterval', () => {
    expect(applyTransforms('nah_stop(() => {}, 500)').code).toBe('setInterval(() => {}, 500)');
  });

  it('yeah_man → true', () => {
    expect(applyTransforms('let x = yeah_man').code).toBe('let x = true');
  });

  it('no_sah → false', () => {
    expect(applyTransforms('let x = no_sah').code).toBe('let x = false');
  });

  it('nutten → null', () => {
    expect(applyTransforms('let x = nutten').code).toBe('let x = null');
  });

  it('nuh_def → undefined', () => {
    expect(applyTransforms('let x = nuh_def').code).toBe('let x = undefined');
  });

  it('does not replace partial matches for yeah_man', () => {
    expect(applyTransforms('yeah_manners').code).toBe('yeah_manners');
  });
});

describe('Stores', () => {
  it('yuh_can_change → writable', () => {
    expect(applyTransforms('const c = yuh_can_change(0)').code).toBe('const c = writable(0)');
  });

  it('jus_look → readable', () => {
    expect(applyTransforms('const t = jus_look(Date.now())').code).toBe('const t = readable(Date.now())');
  });
});

describe('Imports', () => {
  it("'skettel' → 'svelte' (single quotes)", () => {
    expect(applyTransforms("from 'skettel'").code).toBe("from 'svelte'");
  });

  it('"skettel" → "svelte" (double quotes)', () => {
    expect(applyTransforms('from "skettel"').code).toBe('from "svelte"');
  });

  it("'skettel/stash' → 'svelte/store'", () => {
    expect(applyTransforms("from 'skettel/stash'").code).toBe("from 'svelte/store'");
  });

  it("'skettel/move' → 'svelte/transition'", () => {
    expect(applyTransforms("from 'skettel/move'").code).toBe("from 'svelte/transition'");
  });

  it("'skettel/motion' → 'svelte/motion'", () => {
    expect(applyTransforms("from 'skettel/motion'").code).toBe("from 'svelte/motion'");
  });

  it("'skettel/anime' → 'svelte/animate'", () => {
    expect(applyTransforms("from 'skettel/anime'").code).toBe("from 'svelte/animate'");
  });

  it('"skettel/stash" → "svelte/store" (double quotes)', () => {
    expect(applyTransforms('from "skettel/stash"').code).toBe('from "svelte/store"');
  });
});

describe('Full component (BigMan.skettel)', () => {
  it('transforms the README example correctly', () => {
    const input = `<!-- BigMan.skettel -->
<script>
  import { wen_mi_reach } from 'skettel';

  let { pickney_name } = $wah_yuh_bring();
  let count = $ting(0);
  let doubled = $figga_out(count * 2);

  $gwaan(() => {
    bawl_out(\`\${pickney_name} press it \${count} time\`);
  });

  function press_it() {
    count++;
  }

  wen_mi_reach(() => {
    bawl_out('Component reach! Big up!');
  });
</script>

<h1>Wah Gwaan {pickney_name}!</h1>
<button wen_yuh_press={press_it}>
  Press dis ya ({count})
</button>
<p>Doubled: {doubled}</p>`;

    const expected = `<!-- BigMan.skettel -->
<script>
  import { onMount } from 'svelte';

  let { pickney_name } = $props();
  let count = $state(0);
  let doubled = $derived(count * 2);

  $effect(() => {
    console.log(\`\${pickney_name} press it \${count} time\`);
  });

  function press_it() {
    count++;
  }

  onMount(() => {
    console.log('Component reach! Big up!');
  });
</script>

<h1>Wah Gwaan {pickney_name}!</h1>
<button onclick={press_it}>
  Press dis ya ({count})
</button>
<p>Doubled: {doubled}</p>`;

    expect(applyTransforms(input).code).toBe(expected);
  });
});

describe('Preprocessor', () => {
  it('does not transform .svelte files', () => {
    const preprocessor = skettel();
    const result = preprocessor.markup({
      content: 'let x = $ting(0)',
      filename: 'App.svelte',
    });
    expect(result).toBeUndefined();
  });

  it('transforms .skettel files', () => {
    const preprocessor = skettel();
    const result = preprocessor.markup({
      content: 'let x = $ting(0)',
      filename: 'App.skettel',
    });
    expect(result.code).toBe('let x = $state(0)');
    expect(result.map).toBeDefined();
  });

  it('transforms when no filename is provided', () => {
    const preprocessor = skettel();
    const result = preprocessor.markup({
      content: 'let x = $ting(0)',
    });
    expect(result.code).toBe('let x = $state(0)');
    expect(result.map).toBeDefined();
  });
});

describe('String/comment protection', () => {
  it('does not transform keywords inside double-quoted strings', () => {
    expect(applyTransforms('let x = "nah_stop(bad)"').code).toBe('let x = "nah_stop(bad)"');
  });

  it('does not transform keywords inside single-quoted strings', () => {
    expect(applyTransforms("let x = 'soon_come(later)'").code).toBe("let x = 'soon_come(later)'");
  });

  it('does not transform keywords inside single-line comments', () => {
    expect(applyTransforms('// nah_stop(this is a comment)').code).toBe('// nah_stop(this is a comment)');
  });

  it('does not transform keywords inside multi-line comments', () => {
    expect(applyTransforms('/* bawl_out("test") */').code).toBe('/* bawl_out("test") */');
  });

  it('does not transform keywords inside template literal text', () => {
    expect(applyTransforms('let x = `nah_stop(value)`').code).toBe('let x = `nah_stop(value)`');
  });

  it('does transform keywords inside template literal expressions', () => {
    expect(applyTransforms('let x = `${nah_stop(() => {}, 500)}`').code).toBe('let x = `${setInterval(() => {}, 500)}`');
  });

  it('transforms keywords outside strings while preserving string content', () => {
    expect(applyTransforms('let msg = "nah_stop(x)"; nah_stop(() => {}, 100)').code).toBe('let msg = "nah_stop(x)"; setInterval(() => {}, 100)');
  });

  it('still transforms import paths inside strings', () => {
    expect(applyTransforms("from 'skettel/stash'").code).toBe("from 'svelte/store'");
  });

  it('does not transform regex keywords inside comments', () => {
    expect(applyTransforms('// yeah_man this is true').code).toBe('// yeah_man this is true');
  });
});

describe('Source maps', () => {
  it('returns a source map object', () => {
    const result = applyTransforms('let x = $ting(0)', 'App.skettel');
    expect(result.map).toBeDefined();
    expect(result.map.version).toBe(3);
    expect(result.map.sources).toContain('App.skettel');
  });

  it('includes mappings in the source map', () => {
    const result = applyTransforms('let x = $ting(0)', 'App.skettel');
    expect(result.map.mappings).toBeTruthy();
  });

  it('generates map even without filename', () => {
    const result = applyTransforms('let x = $ting(0)');
    expect(result.map).toBeDefined();
  });
});
