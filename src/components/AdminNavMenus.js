import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import BuildIcon from '@material-ui/icons/Build';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ComputerIcon from '@material-ui/icons/Computer';
import CommentIcon from '@material-ui/icons/Comment';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import BusinessIcon from '@material-ui/icons/Business';

export const menus =[
    {
        title:"Dashboard",
        logo:<HomeIcon style={{marginBottom:'6px'}}/>,
        route:"/dashboard"
    },
    {
        title:"Users",
        logo:<ComputerIcon style={{marginBottom:'6px'}}/>,
        route:"/users"
    },
    {
        title:"Suppliers",
        logo:<EmojiTransportationIcon style={{marginBottom:'6px'}}/>,
        route:"/suppliers"
    },
    {
        title:"Vendors",
        logo:<GroupIcon style={{marginBottom:'6px'}}/>,
        route:"/vendors"
    },
    {
        title:"Clients",
        logo:<AccessibilityIcon style={{marginBottom:'6px'}}/>,
        route:"/clients"
    },
    {
        title:"Plant",
        logo:<BusinessIcon style={{marginBottom:'6px'}}/>,
        route:"/plant"
    },
    {
        title:"Products",
        logo:<LocalTaxiIcon style={{marginBottom:'6px'}}/>,
        route:"/products"
    },
    {
        title:"Production",
        logo:<BuildIcon style={{marginBottom:'6px'}}/>,
        route:"/production"
    },
    {
        title:"Client Orders",
        logo:<AccessAlarmIcon/>,
        route:"/client-orders"
    },
]