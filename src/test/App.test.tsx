import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', async () => {
    render(<App />);
    // Wait for dialog to close or main content to appear
    await waitFor(() => {
      const main = screen.queryByRole('main') || screen.queryByTestId('main-content');
      expect(main || document.querySelector('main')).toBeTruthy();
    });
  });

  it('has accessible main content', async () => {
    render(<App />);
    await waitFor(() => {
      const main = screen.queryByRole('main') || document.querySelector('#main-content');
      expect(main).toBeTruthy();
      if (main) {
        expect(main).toHaveAttribute('id', 'main-content');
      }
    });
  });
});

