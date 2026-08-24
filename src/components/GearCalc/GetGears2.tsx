import { ChangeEvent, useState } from "react";
import Gears2 from "@site/src/resources/gears2.json";
import styles2 from "@site/src/components/GearCalc/gears2.module.css";
import gearPic2 from "./img/gears2.png";

type GearPreset = {
  name: string;
  type: number;
  z1: number;
  z2: number;
  z3: number;
  z4: number;
  z5: number;
  z6: number;
};

type GearKey = "z1" | "z2" | "z3" | "z4" | "z5" | "z6";
type GearValues = Record<GearKey, number>;

const allHeliGears = Gears2.heliGears as GearPreset[];
const heliGear = allHeliGears.filter((g) => g.type === 2);
const fallbackGear: GearPreset = {
  name: "Choose Helicopter",
  type: 2,
  z1: 20,
  z2: 50,
  z3: 20,
  z4: 60,
  z5: 60,
  z6: 20,
};

const getGearValues = (gear: GearPreset): GearValues => ({
  z1: gear.z1,
  z2: gear.z2,
  z3: gear.z3,
  z4: gear.z4,
  z5: gear.z5,
  z6: gear.z6,
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

  const { z1, z2, z3, z4, z5, z6 } = gears;

  return (
    <>
      <form className={styles2.wrapper}>
        <div className={styles2.image}>
          <img src={gearPic2} className="img-thumbnail" alt="gears" />

          <div className={styles2.content}>
            <div>
              <p>Type 2: two stage gear</p>
            </div>
            <div className="mt-4">
              <select
                className={styles2.drop}
                id="select2"
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
              className={styles2.z1}
              type="number"
              id="z1_2"
              name="z1"
              onChange={handleGearChange}
              value={z1}
            />
            <input
              className={styles2.z2}
              type="number"
              id="z2_2"
              name="z2"
              onChange={handleGearChange}
              value={z2}
            />
            <input
              className={styles2.z3}
              type="number"
              id="z3_2"
              name="z3"
              onChange={handleGearChange}
              value={z3}
            />
            <input
              className={styles2.z4}
              type="number"
              id="z4_2"
              name="z4"
              onChange={handleGearChange}
              value={z4}
            />
            <input
              className={styles2.z5}
              type="number"
              id="z5_2"
              name="z5"
              onChange={handleGearChange}
              value={z5}
            />
            <input
              className={styles2.z6}
              type="number"
              id="z6_2"
              name="z6"
              onChange={handleGearChange}
              value={z6}
            />
          </div>
          <div className={styles2.outContainer}>
            <div className={styles2.out}>
              <span>
                <input disabled type="number" value={z1 * z3} />
                <b> : </b>
                <input disabled type="number" value={z2 * z4} />
                <b>Calculated Main Ratio</b>
              </span>
            </div>
            <div className={styles2.out}>
              <span>
                <input disabled type="number" value={z6} />
                <b> : </b>
                <input disabled type="number" value={z5} />
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
