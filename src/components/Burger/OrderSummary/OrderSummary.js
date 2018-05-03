import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key ={igKey}><span style = {{textTransform : 'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}</li>
        }
    );
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price : <strong>${props.totalPrice}</strong></p>
            <p>Continue to Checkout?</p>
            <div>
                <Button btnType = "Danger" clicked = {props.clickedBack}>CANCEL</Button>
                <Button btnType = "Success" clicked = {props.clickedBack}>CONTINUE</Button>
            </div>
        </Aux>
    );
};

export default orderSummary;