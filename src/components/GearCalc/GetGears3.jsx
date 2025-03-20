import { useState } from 'react';
import Gears3 from '@site/src/resources/gears3.json';
import 'bootstrap/dist/css/bootstrap.css';
import styles3 from '@site/src/components/GearCalc/gears3.module.css'
import gearPic3 from './img/gears3.png'

const heliGear = Gears3.heliGears
let selectIndex = 0;

function GetGears() {

const [ heli, setHeli ] = useState('Heli-Default');
const [ z1, setZ1 ] = useState('15');
const [ z2, setZ2 ] = useState('60');
const [ z3, setZ3 ] = useState('19');
const [ z4, setZ4 ] = useState('61');
const [ z5, setZ5 ] = useState('14');
const [ z6, setZ6 ] = useState('9');
const [ z7, setZ7 ] = useState('9');

const handleOnChange = (e)=>{
    setHeli(e.target.value);
    selectIndex = document.getElementById('select3').selectedIndex  ; 
    console.log(document.getElementById('select3'))

    setZ1(heliGear[selectIndex].z1);
    setZ2(heliGear[selectIndex].z2);
    setZ3(heliGear[selectIndex].z3);
    setZ4(heliGear[selectIndex].z4);
    setZ5(heliGear[selectIndex].z5);
    setZ6(heliGear[selectIndex].z6);
    setZ7(heliGear[selectIndex].z7);
}

const handleGearChange = ()=> {
    setZ1(document.getElementById('z1_3').value);
    setZ2(document.getElementById('z2_3').value);
    setZ3(document.getElementById('z3_3').value);
    setZ4(document.getElementById('z4_3').value);
    setZ5(document.getElementById('z5_3').value);
    setZ6(document.getElementById('z6_3').value);
    setZ7(document.getElementById('z7_3').value);
}

    return (
<>
    <form className={styles3.wrapper} position='relative'>
        <div className={styles3.image}>
            <img src={gearPic3} class="img-thumbnail" alt="gears"></img>
        
            <div className={styles3.content}>
                <div>
                    <p>Type 2: two stage gear</p>
                </div>
                <div className="mt-4">
                    <select className={styles3.drop} id="select3" onChange={ handleOnChange } value={heli}>
                    {heliGear.map((g)=>
                        (g.type===3 && <option id={g.index} value={g.name}>{g.name}</option>)
                    )}
                    </select>
                </div>
            </div>
            <div>
                <input className={styles3.z1} type='number' id="z1_3" onChange={ handleGearChange } value={z1}></input>
                <input className={styles3.z2} type='number' id="z2_3" onChange={ handleGearChange } value={z2}></input>
                <input className={styles3.z3} type='number' id="z3_3" onChange={ handleGearChange } value={z3}></input>
                <input className={styles3.z4} type='number' id="z4_3" onChange={ handleGearChange } value={z4}></input>
                <input className={styles3.z5} type='number' id="z5_3" onChange={ handleGearChange } value={z5}></input>
                <input className={styles3.z6} type='number' id="z6_3" onChange={ handleGearChange } value={z6}></input>
                <input className={styles3.z7} type='number' id="z7_3" onChange={ handleGearChange } value={z7}></input>
            </div>
            <div className={styles3.outContainer}>
                <div className={styles3.out}>
                    <span>
                        <input key='main1-3' disabled='true' type='number' value={z1*z3}></input>
                        <b> : </b>
                        <input key='main2-3' disabled='true' type='number' value={z2*z4}></input>
                        <b>Calculated Main Ratio</b>
                    </span>
                </div>
                <div className={styles3.out}>
                    <span >
                        <input key='tail1-3' disabled='true' type='number' value={z5*z7}></input>
                        <b> : </b>
                        <input key='tail2-3' disabled='true' type='number' value={z4*z6}></input>
                        <b>Calculated Tail Ratio</b>
                    </span>
                </div>
            </div>
        </div>
    </form>

</>
    )
}

export default GetGears