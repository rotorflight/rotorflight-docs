import { ChangeEvent, useState } from "react";
import Gears3 from "@site/src/resources/gears3.json";
import styles3 from "@site/src/components/GearCalc/gears3.module.css";
import gearPic3 from "./img/gears3.png";

type GearPreset = {
  name: string;
  type: number;
  z1: number;
  z2: number;
  z3: number;
  z4: number;
  z5: number;
  z6: number;
  z7: number;
};

type GearKey = "z1" | "z2" | "z3" | "z4" | "z5" | "z6" | "z7";
type GearValues = Record<GearKey, number>;

const allHeliGears = Gears3.heliGears as GearPreset[];
const heliGear = allHeliGears.filter((g) => g.type === 3);
const fallbackGear: GearPreset = {
  name: "Type 3 Custom",
  type: 3,
  z1: 15,
  z2: 50,
  z3: 19,
  z4: 61,
  z5: 14,
  z6: 9,
  z7: 9,
};

const getGearValues = (gear: GearPreset): GearValues => ({
  z1: gear.z1,
  z2: gear.z2,
  z3: gear.z3,
  z4: gear.z4,
  z5: gear.z5,
  z6: gear.z6,
  z7: gear.z7,
});

function GetGears() {
  const initialGear = heliGear[0] ?? fallbackGear;
  const [heli, setHeli] = useState(initialGear.name);
  const [gears, setGears] = useState<GearValues>(() =>
    getGearValues(initialGear),
  );

  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const selectedGear =
      heliGear.find((g) => g.name === selectedName) ?? fallbackGear;

    setHeli(selectedName);
    setGears(getGearValues(selectedGear));
  };

  const handleGearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name as GearKey;
    const value = Number(e.target.value);

    setGears((prev) => ({
      ...prev,
      [key]: Number.isNaN(value) ? 0 : value,
    }));
  };

  const { z1, z2, z3, z4, z5, z6, z7 } = gears;

  return (
    <>
      <form className={styles3.wrapper}>
        <div className={styles3.image}>
          <img src={gearPic3} className="img-thumbnail" alt="gears" />

          <div className={styles3.content}>
            <div>
              <p>Type 3: two stage gear</p>
            </div>
            <div className="mt-4">
              <select
                className={styles3.drop}
                id="select3"
                onChange={handleOnChange}
                value={heli}
              >
                {heliGear.map((g) => (
                  <option key={g.name} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <input
              className={styles3.z1}
              type="number"
              id="z1_3"
              name="z1"
              onChange={handleGearChange}
              value={z1}
            />
            <input
              className={styles3.z2}
              type="number"
              id="z2_3"
              name="z2"
              onChange={handleGearChange}
              value={z2}
            />
            <input
              className={styles3.z3}
              type="number"
              id="z3_3"
              name="z3"
              onChange={handleGearChange}
              value={z3}
            />
            <input
              className={styles3.z4}
              type="number"
              id="z4_3"
              name="z4"
              onChange={handleGearChange}
              value={z4}
            />
            <input
              className={styles3.z5}
              type="number"
              id="z5_3"
              name="z5"
              onChange={handleGearChange}
              value={z5}
            />
            <input
              className={styles3.z6}
              type="number"
              id="z6_3"
              name="z6"
              onChange={handleGearChange}
              value={z6}
            />
            <input
              className={styles3.z7}
              type="number"
              id="z7_3"
              name="z7"
              onChange={handleGearChange}
              value={z7}
            />
          </div>
          <div className={styles3.outContainer}>
            <div className={styles3.out}>
              <span>
                <input disabled type="number" value={z1 * z3} />
                <b> : </b>
                <input disabled type="number" value={z2 * z4} />
                <b>Calculated Main Ratio</b>
              </span>
            </div>
            <div className={styles3.out}>
              <span>
                <input disabled type="number" value={z5 * z7} />
                <b> : </b>
                <input disabled type="number" value={z4 * z6} />
                <b>Calculated Tail Ratio</b>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default GetGears;
