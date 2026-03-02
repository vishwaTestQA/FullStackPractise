import "@testing-library/jest-dom";
import {beforeAll, afterEach, afterAll} from "vitest"
import {server} from "./src/Mocks/server"

//this enabkes expect(element).toBeInTheDocument();

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

// Close server
afterAll(() => server.close())