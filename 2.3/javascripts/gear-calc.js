// Two-stage gear ratio calculator for setup/gear-ratios.md.
// Each <div class="gear-calc" data-type="1|2"> gets a small form; results are
// the two numbers to enter in the Motors tab gear ratio fields.
function setupGearCalc(root) {
  const type = root.dataset.type;
  const defaults = type === "1"
    ? { z1: 21, z2: 56, z3: 18, z4: 68, z5: 34, z6: 26 } // SAB Goblin 700
    : { z1: 21, z2: 54, z3: 17, z4: 66, z5: 57, z6: 14 }; // KDS Agile A5

  root.innerHTML = `
    <div class="gear-calc__inputs">
      ${Object.keys(defaults).map((z) => `
        <label>${z}<input type="number" min="1" step="1" name="${z}" value="${defaults[z]}"></label>`).join("")}
    </div>
    <p class="gear-calc__result"></p>`;

  const result = root.querySelector(".gear-calc__result");
  const update = () => {
    const v = Object.fromEntries(
      [...root.querySelectorAll("input")].map((i) => [i.name, Number(i.value) || 0]),
    );
    const main = [v.z1 * v.z3, v.z2 * v.z4];
    const tail = type === "1" ? [v.z3 * v.z6, v.z4 * v.z5] : [v.z6, v.z5];
    const fmt = ([a, b]) => `<strong>${a} : ${b}</strong> (1 : ${(b / a).toFixed(3)})`;
    result.innerHTML = `Main Rotor Gear Ratio ${fmt(main)}<br>Tail Rotor Gear Ratio ${fmt(tail)}`;
  };
  root.addEventListener("input", update);
  update();
}

// Material's instant navigation swaps pages without a reload, so hook its
// document$ observable when present.
const initGearCalcs = () => document.querySelectorAll(".gear-calc").forEach(setupGearCalc);
if (typeof document$ !== "undefined") {
  document$.subscribe(initGearCalcs);
} else {
  document.addEventListener("DOMContentLoaded", initGearCalcs);
}
