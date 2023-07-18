jest.mock('./firebase', () => ({
    __esModule: true,
    default: {
      initializeApp: jest.fn(),
      auth: jest.fn(),
      getFirestore: jest.fn(),
      getDatabase: jest.fn(),
    },
  }));  
import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
