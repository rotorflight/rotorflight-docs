import { useState } from 'react';
import Gears2 from './gears2.json';
import 'bootstrap/dist/css/bootstrap.css';
import styles2 from './gears2.module.css'
import gearPic from './img/gears2.png'

const heliGear = Gears2.heliGears
let selectIndex = 0;

function GetGears() {

const [ heli, setHeli ] = useState('Heli-Default');
const [ z1, setZ1 ] = useState('0');
const [ z2, setZ2 ] = useState('0');
const [ z3, setZ3 ] = useState('0');
const [ z4, setZ4 ] = useState('0');
const [ z5, setZ5 ] = useState('0');
const [ z6, setZ6 ] = useState('0');

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
    setZ1(document.getElementById('-z1').value);
    setZ2(document.getElementById('-z2').value);
    setZ3(document.getElementById('-z3').value);
    setZ4(document.getElementById('-z4').value);
    setZ5(document.getElementById('-z5').value);
    setZ6(document.getElementById('-z6').value);
}

    return (
<>
    <form className={styles2.wrapper} position='relative'>
        <div className={styles2.image}>
            <img src={gearPic} class="img-thumbnail" alt="gears"></img>
        
            <div className={styles2.content}>
                <div>
                    <p>SAB Style two stage gear</p>
                </div>
                <div className="mt-4">
                    <select className="dropdown" id="select2" onChange={ handleOnChange } value={heli}>
                    {heliGear.map((g)=>
                        <option id={g.index} value={g.name}>{g.name}</option>
                    )}
                    </select>
                </div>
            </div>
            <div>
                <input className={styles2.z1} type='number' id="-z1" onChange={ handleGearChange } value={z1}></input>
                <input className={styles2.z2} type='number' id="-z2" onChange={ handleGearChange } value={z2}></input>
                <input className={styles2.z3} type='number' id="-z3" onChange={ handleGearChange } value={z3}></input>
                <input className={styles2.z4} type='number' id="-z4" onChange={ handleGearChange } value={z4}></input>
                <input className={styles2.z5} type='number' id="-z5" onChange={ handleGearChange } value={z5}></input>
                <input className={styles2.z6} type='number' id="-z6" onChange={ handleGearChange } value={z6}></input>
            </div>
            <div  >
                <table className={styles2.output} >
                    <tr> 
                        <td><input key='main1' disabled='true' type='number' value={z1*z3}></input></td>
                        <td>:</td>
                        <td><input key='main2' disabled='true' type='number' value={z2*z4}></input></td>
                        <td>Calculated Main Ratio</td>
                    </tr>
                    <tr>
                        <td><input key='tail1'  disabled='true' type='number' value={z3*z6}></input></td>
                        <td>:</td>
                        <td><input key='tail2'  disabled='true' type='number' value={z4*z5}></input></td>
                        <td>Calculated Tail Ratio</td>
                    </tr>
                </table>
            </div>
        </div>
    </form>
</>
    )
}

export default GetGears