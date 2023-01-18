import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    items: [],
    sum: 0,
    count: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Добавление конкретной пиццы
        addItem(state, action) {
            state.count += 1;
            state.sum += action.payload.price;
            let foundPizza = state.items.find(el => el.id === action.payload.id);
            if (!foundPizza) {
                const { id, name, imageUrl, price, type, size } = action.payload;
                let newPizza = {
                    id,
                    name,
                    imageUrl,
                    price,
                    count: 1
                }

                newPizza[`${type}-${size}`] = 1;

                state.items = [...state.items, newPizza]
            }
            else {
                const { type, size } = action.payload;
                if (foundPizza.hasOwnProperty(`${type}-${size}`)) {
                    foundPizza[`${type}-${size}`] += 1;
                }
                else {
                    foundPizza[`${type}-${size}`] = 1;
                }
                foundPizza.count += 1
            }
        },

        // Удаление конкретной пиццы
        removeItem(state, action) {
            state.count -= 1;
            state.sum -= action.payload.price;
            const { type, size } = action.payload;
            let foundPizza = state.items.find(el => el.id === action.payload.id);
            foundPizza.count -= 1;
            foundPizza[`${type}-${size}`] -= 1
            if (foundPizza[`${type}-${size}`] < 1) {
                Reflect.deleteProperty(foundPizza, `${type}-${size}`)
            }
            if (foundPizza.count < 1) {
                state.items = state.items.filter(el => el.id !== action.payload.id);
            }
            
        },

        // Очистка по всем типам определенной пиццы
        clearItems(state, action) {
            const foundItems = state.items.find(el => el.id === action.payload.id);
            const { type, size } = action.payload;
            foundItems.count -= foundItems[`${type}-${size}`];
            state.count -= foundItems[`${type}-${size}`];
            state.sum -= foundItems[`${type}-${size}`] * foundItems.price;
            if (foundItems.count < 1) {
                state.items = state.items.filter(el => el.id !== action.payload.id);
            }
            else {
                Reflect.deleteProperty(foundItems, `${type}-${size}`)
            }
            
        },

        // Очистка корзины
        clearCart(state) {
            state.items = [];
            state.sum = 0;
            state.count = 0;
        }
    }
})

export const selectCart = (state) => state.cart;

export const {addItem, removeItem, clearItems, clearCart} = cartSlice.actions;

export default cartSlice.reducer;