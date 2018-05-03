import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice : 4
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        } 
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        this.setState({ingredients: updatedIngredients,totalPrice : newPrice});
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount  > 0) {
        const updatedCount = oldCount - 1;       
            const updatedIngredients = {
                ...this.state.ingredients
            }
            const priceReduction = INGREDIENT_PRICES[type];
            const newPrice = this.state.totalPrice - priceReduction; 
            updatedIngredients[type] = updatedCount;
            this.setState({ingredients: updatedIngredients, totalPrice : newPrice});
        }
    }
    render() {
        return (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls ingredientAdded = {this.addIngredientHandler} ingredientRemoved = {this.removeIngredientHandler}/>
                </Aux>
            
        );
    }

}

export default BurgerBuilder;