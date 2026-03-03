import { describe, it, expect } from 'vitest';
import { applyTransforms } from '../src/transforms.js';
import { skettel } from '../src/index.js';

describe('Runes', () => {
  it('$ting → $state', () => {
    expect(applyTransforms('let x = $ting(0)')).toBe('let x = $state(0)');
  });

  it('$ting.raw → $state.raw', () => {
    expect(applyTransforms('let x = $ting.raw({})')).toBe('let x = $state.raw({})');
  });

  it('$ting.snapshot → $state.snapshot', () => {
    expect(applyTransforms('$ting.snapshot(obj)')).toBe('$state.snapshot(obj)');
  });

  it('$figga_out → $derived', () => {
    expect(applyTransforms('let d = $figga_out(x * 2)')).toBe('let d = $derived(x * 2)');
  });

  it('$figga_out.by → $derived.by', () => {
    expect(applyTransforms('let d = $figga_out.by(() => x * 2)')).toBe('let d = $derived.by(() => x * 2)');
  });

  it('$gwaan → $effect', () => {
    expect(applyTransforms('$gwaan(() => {})')).toBe('$effect(() => {})');
  });

  it('$gwaan.pre → $effect.pre', () => {
    expect(applyTransforms('$gwaan.pre(() => {})')).toBe('$effect.pre(() => {})');
  });

  it('$gwaan.root → $effect.root', () => {
    expect(applyTransforms('$gwaan.root(() => {})')).toBe('$effect.root(() => {})');
  });

  it('$wah_yuh_bring → $props', () => {
    expect(applyTransforms('let { a } = $wah_yuh_bring()')).toBe('let { a } = $props()');
  });

  it('$check_dis → $inspect', () => {
    expect(applyTransforms('$check_dis(val)')).toBe('$inspect(val)');
  });

  it('$link_up → $bindable', () => {
    expect(applyTransforms('$link_up')).toBe('$bindable');
  });
});

describe('Template blocks', () => {
  it('{#ef → {#if', () => {
    expect(applyTransforms('{#ef hungry}')).toBe('{#if hungry}');
  });

  it('{:nah_man} → {:else}', () => {
    expect(applyTransforms('{:nah_man}')).toBe('{:else}');
  });

  it('{/ef} → {/if}', () => {
    expect(applyTransforms('{/ef}')).toBe('{/if}');
  });

  it('{#every → {#each', () => {
    expect(applyTransforms('{#every items as item}')).toBe('{#each items as item}');
  });

  it('{/every} → {/each}', () => {
    expect(applyTransforms('{/every}')).toBe('{/each}');
  });

  it('{#hol_on → {#await', () => {
    expect(applyTransforms('{#hol_on fetchData()}')).toBe('{#await fetchData()}');
  });

  it('{:bless → {:then', () => {
    expect(applyTransforms('{:bless data}')).toBe('{:then data}');
  });

  it('{:bloodclaat → {:catch', () => {
    expect(applyTransforms('{:bloodclaat error}')).toBe('{:catch error}');
  });

  it('{/hol_on} → {/await}', () => {
    expect(applyTransforms('{/hol_on}')).toBe('{/await}');
  });

  it('{#likkle_bit → {#snippet', () => {
    expect(applyTransforms('{#likkle_bit header()}')).toBe('{#snippet header()}');
  });

  it('{/likkle_bit} → {/snippet}', () => {
    expect(applyTransforms('{/likkle_bit}')).toBe('{/snippet}');
  });

  it('{@big_up → {@render', () => {
    expect(applyTransforms('{@big_up header()}')).toBe('{@render header()}');
  });
});

describe('Special tags', () => {
  it('{@bare → {@html', () => {
    expect(applyTransforms('{@bare content}')).toBe('{@html content}');
  });

  it('{@wah_a_gwaan → {@debug', () => {
    expect(applyTransforms('{@wah_a_gwaan variable}')).toBe('{@debug variable}');
  });

  it('{@lock_dung → {@const', () => {
    expect(applyTransforms('{@lock_dung x = 5}')).toBe('{@const x = 5}');
  });
});

describe('Event handlers', () => {
  it('wen_yuh_press → onclick', () => {
    expect(applyTransforms('wen_yuh_press={fn}')).toBe('onclick={fn}');
  });

  it('wen_yuh_type → oninput', () => {
    expect(applyTransforms('wen_yuh_type={fn}')).toBe('oninput={fn}');
  });

  it('wen_yuh_change → onchange', () => {
    expect(applyTransforms('wen_yuh_change={fn}')).toBe('onchange={fn}');
  });

  it('wen_yuh_hover → onmouseenter', () => {
    expect(applyTransforms('wen_yuh_hover={fn}')).toBe('onmouseenter={fn}');
  });

  it('wen_yuh_leave → onmouseleave', () => {
    expect(applyTransforms('wen_yuh_leave={fn}')).toBe('onmouseleave={fn}');
  });

  it('wen_yuh_submit → onsubmit', () => {
    expect(applyTransforms('wen_yuh_submit={fn}')).toBe('onsubmit={fn}');
  });
});

describe('Directives', () => {
  it('link_up: → bind:', () => {
    expect(applyTransforms('link_up:value={name}')).toBe('bind:value={name}');
  });

  it('vibes: → transition:', () => {
    expect(applyTransforms('vibes:fade')).toBe('transition:fade');
  });

  it('come_een: → in:', () => {
    expect(applyTransforms('come_een:fly')).toBe('in:fly');
  });

  it('guh_weh: → out:', () => {
    expect(applyTransforms('guh_weh:fade')).toBe('out:fade');
  });

  it('dance: → animate:', () => {
    expect(applyTransforms('dance:flip')).toBe('animate:flip');
  });

  it('rock: → class:', () => {
    expect(applyTransforms('rock:active={isActive}')).toBe('class:active={isActive}');
  });

  it('tek: → use:', () => {
    expect(applyTransforms('tek:tooltip')).toBe('use:tooltip');
  });
});

describe('Lifecycle', () => {
  it('wen_mi_reach → onMount', () => {
    expect(applyTransforms('wen_mi_reach(() => {})')).toBe('onMount(() => {})');
  });

  it('wen_mi_lef → onDestroy', () => {
    expect(applyTransforms('wen_mi_lef(() => {})')).toBe('onDestroy(() => {})');
  });
});

describe('Utilities', () => {
  it('bawl_out → console.log', () => {
    expect(applyTransforms("bawl_out('yo')")).toBe("console.log('yo')");
  });

  it('warn_dem → console.warn', () => {
    expect(applyTransforms("warn_dem('careful')")).toBe("console.warn('careful')");
  });

  it('bumbaclaat → console.error', () => {
    expect(applyTransforms("bumbaclaat('it bruck!')")).toBe("console.error('it bruck!')");
  });

  it('soon_come → setTimeout', () => {
    expect(applyTransforms('soon_come(() => {}, 1000)')).toBe('setTimeout(() => {}, 1000)');
  });

  it('nah_stop → setInterval', () => {
    expect(applyTransforms('nah_stop(() => {}, 500)')).toBe('setInterval(() => {}, 500)');
  });

  it('yeah_man → true', () => {
    expect(applyTransforms('let x = yeah_man')).toBe('let x = true');
  });

  it('no_sah → false', () => {
    expect(applyTransforms('let x = no_sah')).toBe('let x = false');
  });

  it('nutten → null', () => {
    expect(applyTransforms('let x = nutten')).toBe('let x = null');
  });

  it('nuh_def → undefined', () => {
    expect(applyTransforms('let x = nuh_def')).toBe('let x = undefined');
  });

  it('does not replace partial matches for yeah_man', () => {
    expect(applyTransforms('yeah_manners')).toBe('yeah_manners');
  });
});

describe('Stores', () => {
  it('yuh_can_change → writable', () => {
    expect(applyTransforms('const c = yuh_can_change(0)')).toBe('const c = writable(0)');
  });

  it('jus_look → readable', () => {
    expect(applyTransforms('const t = jus_look(Date.now())')).toBe('const t = readable(Date.now())');
  });
});

describe('Imports', () => {
  it("'skettel' → 'svelte' (single quotes)", () => {
    expect(applyTransforms("from 'skettel'")).toBe("from 'svelte'");
  });

  it('"skettel" → "svelte" (double quotes)', () => {
    expect(applyTransforms('from "skettel"')).toBe('from "svelte"');
  });

  it("'skettel/stash' → 'svelte/store'", () => {
    expect(applyTransforms("from 'skettel/stash'")).toBe("from 'svelte/store'");
  });

  it("'skettel/move' → 'svelte/transition'", () => {
    expect(applyTransforms("from 'skettel/move'")).toBe("from 'svelte/transition'");
  });

  it("'skettel/motion' → 'svelte/motion'", () => {
    expect(applyTransforms("from 'skettel/motion'")).toBe("from 'svelte/motion'");
  });

  it("'skettel/anime' → 'svelte/animate'", () => {
    expect(applyTransforms("from 'skettel/anime'")).toBe("from 'svelte/animate'");
  });

  it('"skettel/stash" → "svelte/store" (double quotes)', () => {
    expect(applyTransforms('from "skettel/stash"')).toBe('from "svelte/store"');
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

    expect(applyTransforms(input)).toBe(expected);
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
    expect(result).toEqual({ code: 'let x = $state(0)' });
  });

  it('transforms when no filename is provided', () => {
    const preprocessor = skettel();
    const result = preprocessor.markup({
      content: 'let x = $ting(0)',
    });
    expect(result).toEqual({ code: 'let x = $state(0)' });
  });
});
