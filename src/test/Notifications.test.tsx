import { render, screen } from '@testing-library/react';
import ContainerComment from '../components/notifications/ContainerComment';

render(<ContainerComment />)

describe('title on page notifications', () => {
    it('render a title', () => {
        expect(screen.getAllByText('Project | Tasks'))
    })
})