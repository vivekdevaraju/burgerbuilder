import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    patty : 1.3,
    tomato : 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients :null,
        totalPrice : 4,
        purchasable:false,
        purchasing :false,
        loading:false,
        error :false
    }

    componentDidMount = () => {
        axios.get('https://burgerbuilder-acb57.firebaseio.com/ingredients.json')
        .then (response => {
            this.setState({ingredients : response.data});
        })
        .catch(error => {this.setState({error:true});});
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

    purchaseCancelHandler = () => {
        this.setState({purchasing :false});
    }
    purchaseContinueHandler = () => {
        this.setState({loading:true});
        const order = {
            ingredients : this.state.ingredients,
            price:this.state.totalPrice,
            customer :{
                name : 'Vivek Devaraju',
                address : {
                    street : 'White Fields Road',
                    zipCode : '500018',
                    country : 'India'
                },
                email : 'test@test.com'
            },
            deliveryMethod :  'fastest'
        }
        axios.post('orders.json',order)
        .then(response => {
           this.setState({loading:false,purchasing:false});})
        .catch(error => {this.setState({loading:false,purchsing:false});});
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
        let orderSummary = null;  
        let burger = this.state.error? <p style = {{textAlign  :'center'}}>Ingredients Cant be Loaded..!!</p>:<Spinner/>
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded = {this.addIngredientHandler} 
                        ingredientRemoved = {this.removeIngredientHandler}
                        disabledInfo = {disabledInfo}
                        totalPrice = {this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler}
                    />
            </Aux>);
            orderSummary =  <OrderSummary
            ingredients = {this.state.ingredients}
            clickedBack = {this.purchaseHandler}
            totalPrice = {this.state.totalPrice}
            clickedContinue = {this.purchaseContinueHandler}
            />
        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        return (
                <Aux>
                    <Modal show = {this.state.purchasing} modalClosed = {this.purchaseHandler}>
                       {orderSummary}
                    </Modal>
                    {burger}
                </Aux>
            
        );
    }

}

export default withErrorHandler(BurgerBuilder,axios);