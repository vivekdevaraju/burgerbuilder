import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

// This can be functional Component
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
                                  .map(igKey => { 
                                return( 
                                    <li key ={igKey}>
                                    <span style = {{textTransform : 'capitalize'}}>{igKey}</span>:
                                  {this.props.ingredients[igKey]}</li>);
                                  });

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients :</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p> <strong>Total Price :${this.props.totalPrice.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
            <div>
                <Button btnType = "Danger" clicked = {this.props.clickedBack}>CANCEL</Button>
                <Button btnType = "Success" clicked = {this.props.clickedBack}>CONTINUE</Button>
            </div>
        </Aux>
        );
    }

};

export default OrderSummary;