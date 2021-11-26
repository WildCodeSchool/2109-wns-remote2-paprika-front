import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { Link, useLocation, BrowserRouter, Switch, Route } from 'react-router-dom'
import {createMemoryHistory} from 'history'
import Home from '../pages/Home';
import Notification from '../pages/Notifications'




test('renders home', () => {
  render(<App />);
  const linkElement = screen.findAllByTitle('home');
  expect(linkElement).toBeInTheDocument;
});

describe('title', () => {
  it('renders title', () => {
    <BrowserRouter>
    render(<Home />)
    </BrowserRouter>
    expect(screen.findByText('home')).toBeInTheDocument
  })
})
    