import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from './mocks/server';

/**
 * This file is fan before any other test file so service worker does not need to be defined before
 *  each test file.
 */

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());

//  Close server after all tests
afterAll(() => server.close());
