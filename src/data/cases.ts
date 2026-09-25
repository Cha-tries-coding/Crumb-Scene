import chouxImage from '../assets/images/choux.webp'
import ganacheImage from '../assets/images/ganache.jpg'
import macaroonsImage from '../assets/images/macaroons.jpeg'
import type { CaseData } from '../types/game'

export const CASES: CaseData[] = [
  {
    id: 'case01',
    number: 'CASE 01',
    title: 'The Flat Macaron',
    customerStatement: '"They spread into puddles, no feet, and the tops went crispy."',
    imageUrl: macaroonsImage,
    imageAlt: 'An assortment of colorful macarons arranged close together.',
    suspects: [
      { id: 'overmixed', label: 'Overmixed Batter', claim: 'Macaronage went too far, batter flows too fast, shells spread and flatten.', isCulprit: true },
      { id: 'underwhipped', label: 'Under-whipped Meringue', claim: 'Soft peaks instead of stiff, not enough stable air for lift.', isCulprit: false },
      { id: 'cool_oven', label: 'Oven Too Cool', claim: 'Shells never set fast enough to lift, feet stay flat.', isCulprit: false },
      { id: 'no_rest', label: 'Skipped Resting', claim: 'No skin formed before baking, shells crack or spread.', isCulprit: false },
    ],
    sliders: [
      { key: 'temperature', label: 'Oven Temperature', unit: '°F', min: 275, max: 375, step: 5, default: 325, rangeLabel: 'cool, moderate, hot', formatValue: (v) => `${v}°F (${Math.round((v - 32) * 5 / 9)}°C)` },
      { key: 'hydration', label: 'Liquid Ratio', unit: '%', min: 20, max: 60, step: 1, default: 40, rangeLabel: 'stiff, balanced, loose' },
      { key: 'mixingTime', label: 'Mixing Time', unit: ' sec', min: 30, max: 300, step: 10, default: 150, rangeLabel: 'underfold, fold, overfold' },
      { key: 'restingTime', label: 'Resting Time', unit: ' min', min: 0, max: 60, step: 5, default: 30, rangeLabel: 'none, partial skin, full skin' },
    ],
    computeResult(hypothesisId, sliders) {
      const mixNorm = (sliders.mixingTime - 30) / (300 - 30)
      const tempNorm = (sliders.temperature - 275) / (375 - 275)
      const restNorm = sliders.restingTime / 60
      const isOvermixed = mixNorm > 0.58
      const hasFeet = tempNorm > 0.45 && restNorm > 0.38 && !isOvermixed

      if (hypothesisId === 'overmixed') {
        if (isOvermixed) {
          return {
            verdict: 'confirmed',
            clue: 'Batter ribbon falls in a continuous, too-fluid stream off the spatula, no peak holds. Shells spread immediately on contact with parchment. After baking: flat discs, no feet, crispy tops.',
            observation: 'Over-deflated batter loses the surface tension needed to hold a dome. Without that structure, the batter spreads under its own weight before the oven can set it.',
            proves: 'Excessive macaronage destroys the air-cell network in the meringue. The resulting batter is too fluid to hold its shape, and no feet can form without a structured shell lifting from below.',
            doesNotProve: 'This run doesn\'t tell us whether the meringue itself was stable before mixing, or whether a shorter fold time would have preserved it. The failure could be caused by under-whipped meringue producing the same over-fluid result.',
            nextTest: 'Hold mixing time at 90 seconds and re-run. If feet form at that setting, the batter structure, not the meringue, was the variable. Then test the meringue hypothesis separately.',
          }
        }
        return {
          verdict: 'inconclusive',
          clue: 'Batter ribbon folds slowly, holds a brief peak. Shells dome slightly. Some feet attempt to form at the base.',
          observation: 'At this mixing time, batter structure is largely intact. The failure signature for overmixing is not present.',
          proves: 'Mixing time at this level is not sufficient to collapse batter structure, batter viscosity is within a functional range.',
          doesNotProve: 'This run doesn\'t rule out overmixing at a higher setting, nor does it identify what caused the original failure.',
          nextTest: 'Increase mixing time past 180 seconds and observe when the ribbon stops holding a peak.',
        }
      }

      if (hypothesisId === 'cool_oven') {
        if (tempNorm < 0.35) {
          return {
            verdict: 'inconclusive',
            clue: 'Shells set very slowly. No rapid rise in the first 5 minutes. Feet barely form, low heat delayed crust development.',
            observation: 'A cool oven can suppress feet, but the spread pattern here matches moisture-related collapse, not purely thermal. Both variables are implicated.',
            proves: 'Low oven temperature measurably delays crust formation and reduces foot development.',
            doesNotProve: 'Temperature alone doesn\'t explain the puddle-spreading described by the customer. Overmixing also contributes to spread independent of oven conditions.',
            nextTest: 'Set oven temperature above 320°F and keep mixing time high. If spread persists at correct temperature, batter structure is the primary culprit.',
          }
        }
        return {
          verdict: 'ruled_out',
          clue: 'At this temperature, a surface crust forms within 3-4 minutes. Feet attempt to lift. Spread is limited by the set shell.',
          observation: 'Oven temperature is not the limiting factor in this run. The shells respond to heat correctly.',
          proves: 'Oven temperature at this setting supports normal crust formation.',
          doesNotProve: 'This doesn\'t identify the actual cause of the original failure. Batter structure and resting time remain untested.',
          nextTest: 'Keep temperature here and vary mixing time to isolate batter viscosity as the next variable.',
        }
      }

      if (hypothesisId === 'underwhipped') {
        return {
          verdict: 'inconclusive',
          clue: 'Shells show minimal rise. Tops are smooth but fragile, barely hold a dome. No cracking, unlike skipped-rest failures.',
          observation: 'Under-whipped meringue collapses differently from overmixed batter. The failure signatures overlap but are distinct.',
          proves: 'Meringue stability directly affects shell structure, insufficient air leads to flat, hollow-less macarons.',
          doesNotProve: 'This run cannot distinguish a meringue problem from a macaronage problem without testing batter viscosity directly.',
          nextTest: 'Whip meringue to firm stiff peaks, then test at the same mixing time. If shells still fail, the macaronage step is the variable.',
        }
      }

      // no_rest
      if (restNorm < 0.2) {
        return {
          verdict: 'inconclusive',
          clue: 'Surface is tacky, no skin formed. Shells crack at the edges rather than doming. Tops split rather than stay smooth.',
          observation: 'Skipping rest produces cracking, not the puddle-spread described. The failure modes overlap visually but differ in detail.',
          proves: 'Resting time directly controls surface skin formation. Without skin, shells cannot dome or develop feet properly.',
          doesNotProve: 'Cracking is a different failure mode from spreading. The customer described spreading, suggesting batter viscosity is more likely the culprit.',
          nextTest: 'Rest for 30+ minutes and re-run. If spreading persists with a proper skin, resting is ruled out.',
        }
      }
      return {
        verdict: 'ruled_out',
        clue: 'Surface is matte and dry to touch. A proper skin has formed. Shells hold shape entering the oven.',
        observation: 'Resting time was adequate. The skin is present and functional.',
        proves: 'Resting time at this level produces a proper skin, shells are structurally stable before baking.',
        doesNotProve: 'This run doesn\'t identify the cause of the original failure. The skin was present, so the problem lies elsewhere.',
        nextTest: 'Keep rest time here and vary mixing time to isolate batter viscosity.',
      }
    },
  },

  {
    id: 'case02',
    number: 'CASE 02',
    title: 'The Split Ganache',
    customerStatement: '"It turned grainy and oily, like the chocolate curdled."',
    imageUrl: ganacheImage,
    imageAlt: 'A bowl of glossy chocolate ganache with melted chocolate pouring into it.',
    suspects: [
      { id: 'cream_hot', label: 'Cream Too Hot', claim: 'Excessive heat breaks the emulsion, cocoa butter separates from the water phase.', isCulprit: true },
      { id: 'low_liquid', label: 'Liquid Ratio Too Low', claim: 'Not enough water phase to hold the fat, mix turns grainy and oily.', isCulprit: false },
      { id: 'cold_liquid', label: 'Cold Liquid on Warm Ganache', claim: 'Fat solidifies on contact, cocoa particles clump, emulsion can\'t form.', isCulprit: false },
      { id: 'no_emulsify', label: 'Insufficient Emulsification', claim: 'Poured and barely stirred, the emulsion never fully formed.', isCulprit: false },
    ],
    sliders: [
      { key: 'temperature', label: 'Cream Temperature', unit: '°F', min: 90, max: 220, step: 5, default: 160, rangeLabel: 'warm, scalded, boiling', formatValue: (v) => `${v}°F (${Math.round((v - 32) * 5 / 9)}°C)` },
      {
        key: 'hydration', label: 'Cream to Chocolate Ratio', unit: '', min: 50, max: 200, step: 5, default: 100,
        rangeLabel: 'dry ganache, 1:1, loose ganache',
        formatValue: (v) => `${(v / 100).toFixed(1)} : 1`,
      },
      { key: 'mixingTime', label: 'Emulsification Time', unit: ' sec', min: 10, max: 180, step: 5, default: 60, rangeLabel: 'barely stirred, mixed, fully blended' },
      { key: 'restingTime', label: 'Rest Before Mixing', unit: ' min', min: 0, max: 10, step: 1, default: 2, rangeLabel: 'immediate, rested, cold' },
    ],
    computeResult(hypothesisId, sliders) {
      const tempNorm = (sliders.temperature - 90) / (220 - 90)
      const isOverheated = tempNorm > 0.68
      const hasEnoughLiquid = sliders.hydration >= 80
      const isWellMixed = sliders.mixingTime > 55
      const restNorm = sliders.restingTime / 10

      if (hypothesisId === 'cream_hot') {
        if (isOverheated) {
          return {
            verdict: 'confirmed',
            clue: 'Surface appears broken, visible oil pooling at the edges, grainy cocoa solids clumped in the center. The emulsion fractured under thermal stress.',
            observation: 'Cream above ~185°F denatures the lecithin in the chocolate, preventing emulsification. Cocoa butter separates and pools at the surface. This matches the customer\'s report exactly.',
            proves: 'High cream temperature is sufficient to break a ganache emulsion on contact. The failure is thermal, not mechanical.',
            doesNotProve: 'This run confirms temperature as one possible cause but doesn\'t rule out contributing factors like liquid ratio or mixing technique. A ganache can also break at lower temperatures under poor emulsification.',
            nextTest: 'Drop cream temperature to 155-165°F and hold all other variables. If ganache emulsifies cleanly, temperature is confirmed as the sole culprit.',
          }
        }
        return {
          verdict: 'ruled_out',
          clue: 'Surface is smooth and glossy. No separation observed. Ganache emulsifies cleanly at this temperature.',
          observation: 'At this cream temperature, lecithin functions normally and the emulsion forms correctly.',
          proves: 'Cream temperature at this setting does not break the emulsion. The thermal variable is not causing failure here.',
          doesNotProve: 'This rules out temperature at this level but doesn\'t explain the original failure. Another variable is responsible.',
          nextTest: 'Increase cream temperature above 185°F to observe the failure threshold directly.',
        }
      }

      if (hypothesisId === 'low_liquid') {
        if (!hasEnoughLiquid) {
          return {
            verdict: 'inconclusive',
            clue: 'Ganache is thick and stiff, difficult to stir. Some graininess as it cools, but no visible oil separation at the surface.',
            observation: 'Low liquid ratio creates textural stiffness and graininess, but the oily separation described is a different failure signature.',
            proves: 'Insufficient cream creates a dense, grainy ganache as cocoa solids have less water phase to disperse into.',
            doesNotProve: 'Graininess from low liquid ratio differs from the oily separation caused by a broken emulsion. The customer described oiliness, not just graininess.',
            nextTest: 'Increase cream ratio to 1:1 and hold temperature high. If oiliness persists, temperature is the primary variable.',
          }
        }
        return {
          verdict: 'ruled_out',
          clue: 'With this cream ratio, ganache emulsifies smoothly. Texture is balanced.',
          observation: 'Liquid ratio is sufficient to support emulsification at this level.',
          proves: 'A 1:1 ratio provides enough water phase for proper emulsification.',
          doesNotProve: 'This doesn\'t identify what caused the original failure. Cream temperature is the more likely culprit.',
          nextTest: 'Keep liquid ratio here and test cream temperature above 185°F.',
        }
      }

      if (hypothesisId === 'cold_liquid') {
        if (sliders.temperature < 130 && restNorm > 0.4) {
          return {
            verdict: 'inconclusive',
            clue: 'Ganache seizes slightly on contact, visible chocolate lumps, surface appears rough. Different from oily separation: this is clumping, not splitting.',
            observation: 'Cold liquid causes cocoa proteins to seize, creating lumps rather than the oily separation of a true broken emulsion.',
            proves: 'Temperature differential between liquid and chocolate causes seizing, a distinct failure mode from emulsion breaking.',
            doesNotProve: 'Seizing and splitting are related but different failures with different visual signatures. The customer described oiliness, not clumping.',
            nextTest: 'Warm the cream to 155-165°F before adding. If oiliness persists, temperature differential is ruled out.',
          }
        }
        return {
          verdict: 'ruled_out',
          clue: 'Cream and chocolate are close enough in temperature. Ganache comes together with moderate stirring.',
          observation: 'No significant temperature differential, the emulsion forms without seizing.',
          proves: 'Temperature differential at this level is not causing failure.',
          doesNotProve: 'Cold liquid is ruled out here. The cause of the original failure lies elsewhere.',
          nextTest: 'Test cream temperature above 185°F while keeping other variables stable.',
        }
      }

      // no_emulsify
      if (!isWellMixed) {
        return {
          verdict: 'inconclusive',
          clue: 'Chocolate and cream sit in partial layers. Some fat pooling at edges, but primary failure is incomplete integration, not full separation.',
          observation: 'Under-mixing prevents emulsification but produces incomplete integration rather than the thermal splitting described.',
          proves: 'Emulsification time directly controls how thoroughly the fat and water phases integrate.',
          doesNotProve: 'Under-mixing here would be corrected by additional stirring. The customer\'s ganache would not have recovered with more stirring alone, suggesting a thermal cause.',
          nextTest: 'Mix thoroughly for 90+ seconds and observe if the ganache comes together. If it does, emulsification time was the variable.',
        }
      }
      return {
        verdict: 'ruled_out',
        clue: 'With this emulsification time, ganache comes together into a smooth, cohesive mass.',
        observation: 'Sufficient mixing time allows the emulsion to form completely.',
        proves: 'Emulsification time at this level is adequate to form a stable ganache.',
        doesNotProve: 'This rules out under-mixing. The original failure has a different cause.',
        nextTest: 'Test cream temperature above 185°F to isolate the thermal variable.',
      }
    },
    recoveryMove: 'Add warm water at 90-95°F, one teaspoon at a time, while blending with an immersion blender. The warm water phase re-establishes the emulsion by giving the cocoa butter and protein networks a medium to re-integrate. Work quickly and keep the blender submerged.',
  },

  {
    id: 'case03',
    number: 'CASE 03',
    title: 'The Dense Choux',
    customerStatement: '"They came out squat and heavy, with no hollow inside."',
    imageUrl: chouxImage,
    imageAlt: 'A tray of golden choux pastry puffs after baking.',
    suspects: [
      { id: 'wet_panade', label: 'Panade Not Dried Enough', claim: 'Flour paste cooked too briefly, excess moisture remains, steam can\'t build in a structured dough.', isCulprit: true },
      { id: 'too_much_egg', label: 'Too Much Egg', claim: 'Dough turns runny and spreads instead of rising.', isCulprit: false },
      { id: 'door_opened', label: 'Oven Door Opened Early', claim: 'Structure hasn\'t set, shells collapse while still soft.', isCulprit: false },
      { id: 'underbaked', label: 'Underbaked', claim: 'Shells come out golden but damp inside, they deflate as they cool.', isCulprit: false },
    ],
    sliders: [
      { key: 'temperature', label: 'Oven Temperature', unit: '°F', min: 350, max: 450, step: 5, default: 400, rangeLabel: 'low, moderate, hot', formatValue: (v) => `${v}°F (${Math.round((v - 32) * 5 / 9)}°C)` },
      {
        key: 'hydration', label: 'Egg Quantity', unit: '', min: 20, max: 60, step: 5, default: 40,
        rangeLabel: 'stiff dough, balanced, runny dough',
        formatValue: (v) => `${(v / 10).toFixed(1)} eggs`,
      },
      { key: 'mixingTime', label: 'Panade Cook Time', unit: ' sec', min: 30, max: 300, step: 10, default: 120, rangeLabel: 'wet paste, drying, dry film' },
      { key: 'restingTime', label: 'Bake Duration', unit: ' min', min: 20, max: 45, step: 1, default: 32, rangeLabel: 'pale, golden, baked through' },
    ],
    computeResult(hypothesisId, sliders) {
      const panadeNorm = (sliders.mixingTime - 30) / (300 - 30)
      const isPanadeDry = panadeNorm > 0.53
      const eggNorm = (sliders.hydration - 20) / (60 - 20)
      const tooMuchEgg = eggNorm > 0.68
      const bakeNorm = (sliders.restingTime - 20) / (45 - 20)
      const isFullyBaked = bakeNorm > 0.48

      if (hypothesisId === 'wet_panade') {
        if (!isPanadeDry) {
          return {
            verdict: 'confirmed',
            clue: 'Cross-section shows dense, solid interior, no hollow cavity. The V-fold of dough off the spatula collapses flat rather than holding a ribbon. Shells puff minimally, then sink.',
            observation: 'Under-cooked panade retains too much moisture. The dough is too wet to hold structure, steam escapes before the gluten-starch network sets, and no hollow forms.',
            proves: 'Panade cook time directly controls moisture content. Insufficient cooking leaves too much free water, which prevents the structural integrity needed for steam-driven expansion.',
            doesNotProve: 'This confirms that panade moisture matters, but doesn\'t rule out that egg quantity or bake temperature also contributed to the dense result.',
            nextTest: 'Cook panade until a dry film coats the pan, typically 90-120 seconds of active stirring over heat. Run again and compare cross-sections.',
          }
        }
        return {
          verdict: 'ruled_out',
          clue: 'Panade left a dry film on the pan before eggs were added. V-fold off the spatula holds a clean, slow-falling ribbon. Cross-section shows a developing hollow.',
          observation: 'Panade moisture was well-managed. Dough structure is sufficient to trap steam and expand.',
          proves: 'Adequate panade cooking produces a dough capable of forming a hollow. The moisture variable is controlled.',
          doesNotProve: 'This doesn\'t identify the original failure. Panade is ruled out, look at egg ratio or bake conditions.',
          nextTest: 'Hold panade cook time here and reduce egg quantity by one egg. Observe whether the hollow improves.',
        }
      }

      if (hypothesisId === 'too_much_egg') {
        if (tooMuchEgg) {
          return {
            verdict: 'inconclusive',
            clue: 'Dough is very soft, barely pipeable. Shells spread flat rather than holding a mound. The failure looks like spreading, not dense collapse.',
            observation: 'Excess egg creates spreading rather than the squat, heavy shape described. The failure modes differ: too much egg makes flat, thin pastry; wet panade makes dense, squat pastry.',
            proves: 'Egg quantity controls dough consistency, too much produces a slack dough that can\'t hold a piped shape.',
            doesNotProve: 'Spreading from excess egg is a different failure signature from "squat and heavy with no hollow." The original failure points to a structural problem, not a consistency one.',
            nextTest: 'Reduce egg quantity to 3.5-4 eggs and observe whether the hollow appears. If not, panade cook time is the remaining variable.',
          }
        }
        return {
          verdict: 'ruled_out',
          clue: 'Egg quantity is within range. Dough holds a clean V-fold and a firm piped shape.',
          observation: 'Egg ratio is not the issue at this level.',
          proves: 'Egg quantity here is within the functional range for choux.',
          doesNotProve: 'Egg ratio ruled out. The cause lies elsewhere in the process.',
          nextTest: 'Test panade cook time, shorten it to 60 seconds and compare the cross-section.',
        }
      }

      if (hypothesisId === 'door_opened') {
        return {
          verdict: 'inconclusive',
          clue: 'Shells show inconsistent results, some puff, some collapse mid-bake. The failure is not uniform across the tray.',
          observation: 'Opening the oven door early causes inconsistent, partial collapse rather than the uniform dense result described. The customer reported all of them were heavy.',
          proves: 'Thermal disruption during early baking causes collapse in under-set shells.',
          doesNotProve: 'Inconsistent collapse ≠ uniformly dense shells. The original failure sounds structural, built into the dough before baking.',
          nextTest: 'Do not open the oven door for the first 20 minutes and observe whether any hollow forms. If still dense, the dough itself is the problem.',
        }
      }

      // underbaked
      if (!isFullyBaked) {
        return {
          verdict: 'inconclusive',
          clue: 'Shells appear golden but feel soft and damp. They deflate within 5 minutes of leaving the oven, collapsing to a flat disc.',
          observation: 'Underbaking causes post-oven collapse, which can look like "heavy" pastry. But the key tell is the timing, if they were hollow while baking and collapsed after, underbaking is the cause.',
          proves: 'Bake time controls whether moisture escapes completely before the shell sets. Underbaking leaves the interior damp.',
          doesNotProve: 'If the hollow never formed during baking, as described, the problem predates oven time. A dough issue (wet panade) would produce no hollow even in a correctly baked shell.',
          nextTest: 'Extend bake time to 35-38 minutes and look for a hollow forming. If no hollow appears even fully baked, the dough structure is the culprit.',
        }
      }
      return {
        verdict: 'ruled_out',
        clue: 'Shells are fully baked, crisp exterior, sound hollow when tapped. They hold shape on the rack.',
        observation: 'Bake time is adequate. The shell set properly, but the hollow is still absent, pointing to the dough itself.',
        proves: 'Sufficient bake time produces a stable, set shell.',
        doesNotProve: 'This rules out underbaking. A hollow that never forms despite full baking indicates a structural dough problem.',
        nextTest: 'Shorten panade cook time to 60 seconds and observe the cross-section. If no hollow forms, wet panade is confirmed.',
      }
    },
  },
]
