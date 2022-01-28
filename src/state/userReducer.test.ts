import {userReducer} from "./userReducer";

const startState = {age: 20, childrenCount: 2, name: 'Bogdan'}

test.skip('user reducer should increment only age', () => {

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21)
    expect(endState.name).toBe('Bogdan')
    expect(endState.childrenCount).toBe(2)
})

test.skip('user reducer should increment only childrenCount', () => {
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.childrenCount).toBe(3)
})


