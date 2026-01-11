import React from 'react'

const p =   `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores`
const ChildInsideModal = () => {
  return (
    <div>
        {/* <div onClick={e => e.stopPropagation()}>
             <button onClick={handleClose}>X</button> */}
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>
                 {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>
                 <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p>     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat illum quas repellat deleniti illo ducimus 
            doloremque quae. Voluptatum eveniet sint culpa quas ut repudiandae mollitia, 
            minus voluptatem iusto iure asperiores.</p> */}
            <p>{p.repeat(10)}</p>
        {/* </div> */}
    </div>
  )
}

export default ChildInsideModal