# 🇯🇲 Skettel.js

### The first frontend framework fi di Caribbean massive.

> *"Soon come, but fast."*

**Skettel** is a Svelte preprocessor that lets you write components in **Jamaican Patois**. It transpiles `.skettel` files into valid Svelte before compilation. Same reactive power, more vibes.

---

## Installation

```bash
npm install skettel
```

## Setup

```js
// svelte.config.js
import { skettel } from 'skettel';

export default {
  preprocess: [skettel()],
  extensions: ['.svelte', '.skettel'],
};
```

Done. Yuh ready fi cook.

---

## Syntax Guide

### Reactive State (Runes)

| Skettel | Svelte | Wah it do |
|---|---|---|
| `$ting(0)` | `$state(0)` | Reactive variable |
| `$ting.raw({})` | `$state.raw({})` | Non-proxied state |
| `$ting.snapshot(obj)` | `$state.snapshot(obj)` | Snapshot of state |
| `$figga_out(x * 2)` | `$derived(x * 2)` | Derived value |
| `$figga_out.by(() => x)` | `$derived.by(() => x)` | Derived with function |
| `$gwaan(() => {})` | `$effect(() => {})` | Side effect |
| `$gwaan.pre(() => {})` | `$effect.pre(() => {})` | Pre-render effect |
| `$gwaan.root(() => {})` | `$effect.root(() => {})` | Root effect |
| `$wah_yuh_bring()` | `$props()` | Component props |
| `$check_dis(val)` | `$inspect(val)` | Dev inspection |
| `$link_up` | `$bindable` | Bindable prop |

### Template Blocks

```skettel
{#ef hungry}
  <p>Mi want food</p>
{:nah_man}
  <p>Mi good</p>
{/ef}

{#every foods as one_a_dem}
  <p>{one_a_dem}</p>
{/every}

{#hol_on fetchData()}
  <p>Soon come... ⏳</p>
{:bless data}
  <p>It reach! {data}</p>
{:bloodclaat error}
  <p>It bruck: {error.message}</p>
{/hol_on}
```

### Snippets & Render (Svelte 5)

```skettel
{#likkle_bit greeting(name)}
  <h1>Wah gwaan {name}!</h1>
{/likkle_bit}

{@big_up greeting('Massive')}
```

### Special Tags

| Skettel | Svelte | Wah it do |
|---|---|---|
| `{@bare content}` | `{@html content}` | Raw HTML — exposed, naked |
| `{@wah_a_gwaan var}` | `{@debug var}` | Debug — "What's going on?" |
| `{@lock_dung x = 5}` | `{@const x = 5}` | Locked down, can't change |

### Event Handlers

| Skettel | Svelte |
|---|---|
| `wen_yuh_press={fn}` | `onclick={fn}` |
| `wen_yuh_type={fn}` | `oninput={fn}` |
| `wen_yuh_change={fn}` | `onchange={fn}` |
| `wen_yuh_hover={fn}` | `onmouseenter={fn}` |
| `wen_yuh_leave={fn}` | `onmouseleave={fn}` |
| `wen_yuh_submit={fn}` | `onsubmit={fn}` |

### Directives

```skettel
<input link_up:value={name} />

<div vibes:fade>Smooth</div>
<div come_een:fly>Entrance</div>
<div guh_weh:fade>Exit</div>
<div dance:flip>Animate</div>

<div rock:active={isActive}>Rock dis look</div>
<div tek:tooltip>Tek dis action</div>
```

### Lifecycle & Utilities

| Skettel | Svelte |
|---|---|
| `wen_mi_reach(() => {})` | `onMount(() => {})` |
| `wen_mi_lef(() => {})` | `onDestroy(() => {})` |
| `bawl_out('yow')` | `console.log('yow')` |
| `warn_dem('careful')` | `console.warn('careful')` |
| `bumbaclaat('it bruck!')` | `console.error('it bruck!')` |
| `soon_come(() => {}, 1000)` | `setTimeout(() => {}, 1000)` |
| `nah_stop(() => {}, 500)` | `setInterval(() => {}, 500)` |
| `yeah_man` / `no_sah` | `true` / `false` |
| `nutten` | `null` |
| `nuh_def` | `undefined` |

### Stores (Svelte 4 compatible)

```js
import { yuh_can_change, jus_look } from 'skettel/stash';

const count = yuh_can_change(0);   // writable
const time = jus_look(Date.now());  // readable
```

### Imports

| Skettel | Svelte |
|---|---|
| `from 'skettel'` | `from 'svelte'` |
| `from 'skettel/stash'` | `from 'svelte/store'` |
| `from 'skettel/move'` | `from 'svelte/transition'` |
| `from 'skettel/motion'` | `from 'svelte/motion'` |
| `from 'skettel/anime'` | `from 'svelte/animate'` |

---

## Full Example

```skettel
<!-- BigMan.skettel -->
<script>
  import { wen_mi_reach } from 'skettel';

  let { pickney_name } = $wah_yuh_bring();
  let count = $ting(0);
  let doubled = $figga_out(count * 2);
  let active = $ting(yeah_man);

  $gwaan(() => {
    bawl_out(`${pickney_name} press it ${count} time`);
  });

  function press_it() {
    count++;
  }

  function bruck_it() {
    bumbaclaat('Someting gone wrong!');
  }

  wen_mi_reach(() => {
    bawl_out('Component reach! Big up!');
    soon_come(() => warn_dem('3 seconds pass already'), 3000);
  });
</script>

{#likkle_bit greeting(name)}
  <h1>Wah Gwaan {name}!</h1>
{/likkle_bit}

{@big_up greeting(pickney_name)}

<button wen_yuh_press={press_it} rock:active={active}>
  Press dis ya ({count})
</button>
<p>Doubled: {doubled}</p>

{#ef count > 10}
  <p>Yuh a go hard!</p>
{:nah_man}
  <p>Keep pressing...</p>
{/ef}
```

---

## How It Works

Skettel is a standard [Svelte preprocessor](https://svelte.dev/docs/svelte-compiler#preprocess). It runs regex-based transforms on your `.skettel` files before Svelte sees them, converting Patois keywords back to valid Svelte syntax. No runtime overhead. No extra bundle size. Just vibes.

```
.skettel file → Skettel preprocessor → Valid Svelte → Svelte compiler → JS
```

---

## FAQ

**Q: Is this production ready?**
A: It's a joke package, but technically yes. It's just string transforms.

**Q: Does it affect bundle size?**
A: No. Zero runtime. Everything happens at compile time.

**Q: Can I mix `.svelte` and `.skettel` files?**
A: Yes! The preprocessor only transforms files with the right extension.

**Q: What about TypeScript?**
A: Works fine. The preprocessor runs before TypeScript compilation. Just use `<script lang="ts">` as normal.

**Q: Can I use this at work?**
A: That depends on how criss your team lead is.

---

## Contributing

PRs welcome! Some ideas:
- 🎨 Patois CSS properties (`background-color` → `back-a-di-wall`?)
- 🗣️ VS Code syntax highlighting for `.skettel` files
- 📖 More Patois keywords
- 🌍 Other language variants (Nigerian Pidgin? Trinidadian Creole?)

---

## License

MIT — Do wah yuh want wid it.

---

<p align="center">
  <strong>Skettel.js</strong> — Svelte, but make it Caribbean 🏝️
  <br/>
  <em>Built with ❤️ and jerk seasoning</em>
</p>
