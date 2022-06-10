import { screen, waitFor } from '@testing-library/react';
import AppNotification from '../index';

test('should be render notification', () => {
  AppNotification("error","Test","show messgae");
  waitFor(() =>expect(screen.findByText("Test")).toBeVisible());
});
