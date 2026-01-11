import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom";
import DataTableWithSingleSort from "./DataTableWithSingleSort";

const data = [
  { id: 1, name: "Alice", email: "alice@test.com" },
  { id: 2, name: "Bob",   email: "bob@test.com" },
  { id: 3, name: "Charlie", email: "charlie@test.com" },
]

const header = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
]

test('render table with data', () => { 
    render(<DataTableWithSingleSort data={data} header={header}/>)
    expect(screen.getByText('Alice').toBeInTheDocument())
    expect(screen.getByText('Bob').toBeInTheDocument())
 })

//  “Vitest exposes test globals, but TypeScript doesn’t pick them up automatically.
// We explicitly add vitest/globals to tsconfig.json.”