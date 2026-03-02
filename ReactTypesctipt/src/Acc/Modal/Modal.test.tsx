import { describe, it , expect, vi} from "vitest"
import {render, screen} from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import ParentModal from "./ParentModal"
import { server } from "../../Mocks/server"
import { http, HttpResponse } from "msw"
// import matchers from '@testing-library/jest-dom/matchers'


// expect.extend(matchers)

// vi.mock('axios')

describe(() => {
  const mockData = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  };
    

    it.only('test', async() => {
 
       render(<ParentModal/>)

       await userEvent.click(screen.getByText('Clik to open modal'))

        expect(screen.getByRole('dialog')).toBeInTheDocument()

        const data =  await screen.findByText('sunt aut facere repellat provident occaecati excepturi optio reprehenderit')

        expect(data).toBeInTheDocument()
    })

    it('shows error if api fails', async () => {
       server.use(
       http.get('https://jsonplaceholder.typicode.com/', () => {
       return new HttpResponse(null, { status: 500 })
    })
  )
  
         render(<ParentModal />)

         await userEvent.click(screen.getByText('Open'))

         const error = await screen.findByText(/error/i)

          expect(error).toBeInTheDocument()
    })
})