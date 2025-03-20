import { useState } from 'react';
import Gears2 from '@site/src/resources/gears2.json';
import 'bootstrap/dist/css/bootstrap.css';
import styles2 from '@site/src/components/GearCalc/gears2.module.css'
import gearPic2 from './img/gears2.png'

const heliGear = Gears2.heliGears
let selectIndex = 0;

function GetGears() {

const [ heli, setHeli ] = useState('Heli-Default');
const [ z1, setZ1 ] = useState('20');
const [ z2, setZ2 ] = useState('50');
const [ z3, setZ3 ] = useState('20');
const [ z4, setZ4 ] = useState('60');
const [ z5, setZ5 ] = useState('60');
const [ z6, setZ6 ] = useState('20');

const handleOnChange = (e)=>{
    setHeli(e.target.value);
    selectIndex = document.getElementById('select2').selectedIndex; 
    console.log(selectIndex);

    setZ1(heliGear[selectIndex].z1);
    setZ2(heliGear[selectIndex].z2);
    setZ3(heliGear[selectIndex].z3);
    setZ4(heliGear[selectIndex].z4);
    setZ5(heliGear[selectIndex].z5);
    setZ6(heliGear[selectIndex].z6);
}

const handleGearChange = ()=> {
    setZ1(document.getElementById('z1_2').value);
    setZ2(document.getElementById('z2_2').value);
    setZ3(document.getElementById('z3_2').value);
    setZ4(document.getElementById('z4_2').value);
    setZ5(document.getElementById('z5_2').value);
    setZ6(document.getElementById('z6_2').value);
}

    return (
<>
    <form className={styles2.wrapper} position='relative'>
        <div className={styles2.image}>
            <img src={gearPic2} class="img-thumbnail" alt="gears"></img>
        
            <div className={styles2.content}>
                <div>
                    <p>Type 2: two stage gear</p>
                </div>
                <div className="mt-4">
                    <select className={styles2.drop} id="select2" onChange={ handleOnChange } value={heli}>
                    {heliGear.map((g)=>
                        (g.type===2 && <option id={g.index} value={g.name}>{g.name}</option>)
                    )}
                    </select>
                </div>
            </div>
            <div>
                <input className={styles2.z1} type='number' id="z1_2" onChange={ handleGearChange } value={z1}></input>
                <input className={styles2.z2} type='number' id="z2_2" onChange={ handleGearChange } value={z2}></input>
                <input className={styles2.z3} type='number' id="z3_2" onChange={ handleGearChange } value={z3}></input>
                <input className={styles2.z4} type='number' id="z4_2" onChange={ handleGearChange } value={z4}></input>
                <input className={styles2.z5} type='number' id="z5_2" onChange={ handleGearChange } value={z5}></input>
                <input className={styles2.z6} type='number' id="z6_2" onChange={ handleGearChange } value={z6}></input>
            </div>
            <div className={styles2.outContainer}>
                <div className={styles2.out}>
                    <span>
                        <input key='main1_2' disabled='true' type='number' value={z1*z3}></input>
                        <b> : </b>
                        <input key='main2_2' disabled='true' type='number' value={z2*z4}></input>
                        <b>Calculated Main Ratio</b>
                    </span>
                </div>
                <div className={styles2.out}>
                    <span >
                        <input key='tail1_2' disabled='true' type='number' value={z6}></input>
                        <b> : </b>
                        <input key='tail2_2' disabled='true' type='number' value={z5}></input>
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