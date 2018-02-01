import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', function () {
  it('Should handle creating courses', function () {
    //arrange
    const store = createStore(rootReducer, initialState);
    const course = { title: 'Clean Code' };
    const course2 = { title: 'Dirty Code' };

    //act
    const action = courseActions.createCourseSuccess(course);
    const action2 = courseActions.createCourseSuccess(course2);

    store.dispatch(action);
    store.dispatch(action2);

    //assert
    const courses = store.getState().courses;
    const expected = [{ title: 'Clean Code' }, { title: 'Dirty Code' }];

    expect(courses).toEqual(expected);
    expect(courses.length).toEqual(2);
  });
});
