import HomeIcon from '@material-ui/icons/Home';
import CommentIcon from '@material-ui/icons/Comment';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
export const menus =[
    {
        title:"Dashboard",
        logo:<HomeIcon style={{marginBottom:'6px'}}/>,
        route:"/dashboard"
    },
    {
        title:"Orders",
        logo:<ShoppingBasketOutlinedIcon/>,
        route:"/orders"
    },
    {
        title:"Parts",
        logo:<StoreIcon/>,
        route:"/parts"
    },
    {
        title:"Complaints",
        logo:<CommentIcon/>,
        route:"/complaints"
    },
    
]