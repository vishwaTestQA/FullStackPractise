import { cva } from "class-variance-authority";

export const tableCVA = cva('table',{
   variants:{
      variant: {
        basic:"",
        bordered: "table--bordered",
        striped: "table--striped",
      },
    density: {
      normal: "",
      compact: "table--compact",
    },

    hoverable: {
      true: "table--hoverable",
    },

    stickyHeader: {
      true: "table--sticky",
    },

   },
   defaultVariants:{
     variant: 'basic',
     density: 'normal'
   }
})