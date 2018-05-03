import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice : 4,
        purchasable:false,
        purchasing :false
    }
    updatePurchaseState = (ingredients) => {
        let sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];})
        .reduce((sum,el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0});
    }
    purchaseHandler = () => {
        const purchasing = !this.state.purchasing
        this.setState({purchasing :purchasing});
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
        this.updatePurchaseState(updatedIngredients);
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
            this.updatePurchaseState(updatedIngredients);
        }
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo)
        {
            disabledInfo[key] = disabledInfo[key] <=0
        }
        return (
                <Aux>
                    <Modal show = {this.state.purchasing} modalClosed = {this.purchaseHandler}>
                        <OrderSummary
                         ingredients = {this.state.ingredients}
                         clickedBack = {this.purchaseHandler}
                         totalPrice = {this.state.totalPrice}
                         />
                    </Modal>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler} 
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabledInfo = {disabledInfo}
                        totalPrice = {this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler}
                    />
                </Aux>
            
        );
    }

}

export default BurgerBuilder;