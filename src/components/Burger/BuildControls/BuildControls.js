import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label:'Salad',type :'salad'},
    {label:'Tomato',type :'tomato'},
    {label:'Patty',type :'patty'},
    {label:'Cheese',type :'cheese'},
]

const buildControls = (props) => (
        <div className = {classes.BuildControls}> 
        <p>Current Price : <strong>${props.totalPrice.toFixed(2)}</strong></p>
           {controls.map(ctrl => {
               return <BuildControl 
                        key = {ctrl.label}
                        label = {ctrl.label} 
                        added = {() => props.ingredientAdded(ctrl.type)}
                        removed = {() => props.ingredientRemoved(ctrl.type)}
                        disabledInfo = {props.disabledInfo[ctrl.type]}/>                        
           }) }
           <button className = {classes.OrderButton} disabled = {!props.purchasable} onClick = {props.ordered}>ORDER NOW</button>
        </div>
        );




export default buildControls;