import * as actions from './actions';
import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import fetchMock from 'fetch-mock';

const mockStore = configureMockStore([thunkMiddleware]);

it('should create an action to search robots', () => {
    const text = "wooo";
    const expectAction = {
        type: CHANGE_SEARCHFIELD,
        payload: text
    }

    expect(actions.setSearchField(text)).toEqual(expectAction);
});

it('handles REQUEST_ROBOTS_PENDING robots API', () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots());
    const action = store.getActions();

    const expectAction = {
        type: REQUEST_ROBOTS_PENDING
    };

    // action[0] this is first dispatch result in requestRobots
    expect(action[0]).toEqual(expectAction);
})

it('handles REQUEST_ROBOTS_SUCCESS robots API', () => {
    afterEach(() => {
        fetchMock.reset()
        fetchMock.restore()
    });

    fetchMock
        .getOnce('https://jsonplaceholder.typicode.com/users', {
            body: {
                robots: [{
                    email: "Sincere@april.biz",
                    id: 1,
                    name: "Leanne Graham",
                    phone: "1-770-736-8031 x56442",
                    username: "Bret",
                    website: "hildegard.org"
                }]
            },
            headers: {
                'content-type': 'application/json'
            }
        });

    const store = mockStore();

    const expectAction = {
        type: REQUEST_ROBOTS_SUCCESS,
        payload: {
            robots: [{
                email: "Sincere@april.biz",
                id: 1,
                name: "Leanne Graham",
                phone: "1-770-736-8031 x56442",
                username: "Bret",
                website: "hildegard.org"
            }]
        }
    };

    return store.dispatch(actions.requestRobots()).then(() => {
        expect(store.getActions()[1]).toEqual(expectAction);
    })
})