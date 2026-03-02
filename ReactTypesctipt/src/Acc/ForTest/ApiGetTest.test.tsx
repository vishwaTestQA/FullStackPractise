import {render, screen, fireEvent, getByRole} from "@testing-library/react"
import { describe, expect, test, vi } from "vitest"
import ApiGet from "./ApiGet"
import axios from "axios"

describe('', () => {
    vi.mock('axios')

    test('' ,() => {
    (axios.get as any).mockResolvedValue({
        data:[{title: "some title"}]
    })    
    render(<ApiGet/>)

   const list =  screen.getByRole('listitem')
   expect(screen.getByText('some title')).toBeTruthy()
})
})
