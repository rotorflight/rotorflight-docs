import { useState } from 'react';
import Gears from './gears.json';
import 'bootstrap/dist/css/bootstrap.css';
import styles from './gears.module.css'
import gearPic from './img/gears.png'

const heliGear = Gears.heliGears
let selectIndex = 0;

function GetGears() {

const [ heli, setHeli ] = useState('Heli-Default');
const [ z1, setZ1 ] = useState('20');
const [ z2, setZ2 ] = useState('50');
const [ z3, setZ3 ] = useState('20');
const [ z4, setZ4 ] = useState('60');
const [ z5, setZ5 ] = useState('30');
const [ z6, setZ6 ] = useState('20');

const handleOnChange = (e)=>{
    setHeli(e.target.value);
    selectIndex = document.getElementById('select').selectedIndex; 
    console.log(selectIndex);

    setZ1(heliGear[selectIndex].z1);
    setZ2(heliGear[selectIndex].z2);
    setZ3(heliGear[selectIndex].z3);
    setZ4(heliGear[selectIndex].z4);
    setZ5(heliGear[selectIndex].z5);
    setZ6(heliGear[selectIndex].z6);
}

const handleGearChange = ()=> {
    setZ1(document.getElementById('z1').value);
    setZ2(document.getElementById('z2').value);
    setZ3(document.getElementById('z3').value);
    setZ4(document.getElementById('z4').value);
    setZ5(document.getElementById('z5').value);
    setZ6(document.getElementById('z6').value);
}

    return (
<>
    <form className={styles.wrapper} position='relative'>
        <div className={styles.image}>
            <img src={gearPic} class="img-thumbnail" alt="gears"></img>
        
            <div className={styles.content}>
                <div>
                    <p>Type 1: two stage gear</p>
                </div>
                <div className="mt-4">
                    <select className={styles.drop} id="select" onChange={ handleOnChange } value={heli}>
                    {heliGear.map((g)=>
                        (g.type===1 && <option id={g.index} value={g.name}>{g.name}</option>)
                    )}
                    </select>
                </div>
            </div>
            <div>
                <input className={styles.z1} type='number' id="z1" onChange={ handleGearChange } value={z1}></input>
                <input className={styles.z2} type='number' id="z2" onChange={ handleGearChange } value={z2}></input>
                <input className={styles.z3} type='number' id="z3" onChange={ handleGearChange } value={z3}></input>
                <input className={styles.z4} type='number' id="z4" onChange={ handleGearChange } value={z4}></input>
                <input className={styles.z5} type='number' id="z5" onChange={ handleGearChange } value={z5}></input>
                <input className={styles.z6} type='number' id="z6" onChange={ handleGearChange } value={z6}></input>
            </div>
            <div className={styles.outContainer}>
                <div className={styles.out}>
                    <span>
                        <input key='maine' disabled='true' type='number' value={z1*z3}></input>
                        <b> : </b>
                        <input key='mains' disabled='true' type='number' value={z2*z4}></input>
                        <b>Calculated Main Ratio</b>
                    </span>
                </div>
                <div className={styles.out}>
                    <span >
                        <input key='maind' disabled='true' type='number' value={z3*z6}></input>
                        <b> : </b>
                        <input key='mains' disabled='true' type='number' value={z4*z5}></input>
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