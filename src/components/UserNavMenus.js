import GroupIcon from '@material-ui/icons/Group';
import HomeIcon from '@material-ui/icons/Home';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import BuildIcon from '@material-ui/icons/Build';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import CommentIcon from '@material-ui/icons/Comment';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import BusinessIcon from '@material-ui/icons/Business';

export const menus =[
    {
        title:"Dashboard",
        logo:<HomeIcon style={{marginBottom:'6px'}}/>,
        route:"/user-dashboard"
    },
    {
        title:"Suppliers",
        logo:<EmojiTransportationIcon style={{marginBottom:'6px'}}/>,
        route:"/suppliers1"
    },
    {
        title:"Vendors",
        logo:<GroupIcon style={{marginBottom:'6px'}}/>,
        route:"/vendors1"
    },
    {
        title:"Clients",
        logo:<AccessibilityIcon style={{marginBottom:'6px'}}/>,
        route:"/clients1"
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
        title:"Upcoming Deliveries",
        logo:<AccessAlarmIcon/>,
        route:"/upcoming-deliveries"
    },
    {


        title:"Vehicles",
        logo:<EmojiTransportationIcon style={{marginBottom:'6px'}}/>,
        route:"/vehicles"
    },
{

        title:"New Production",
        logo:<BuildIcon style={{marginBottom:'6px'}}/>,
        route:"/upcoming-production"
    },
    



    {
        title:"Complaints",
        logo:<CommentIcon/>,
        route:"/scomplaints"
    },
    {
        title:"Revenue",
        logo:<CommentIcon/>,
        route:"/revenue"
    }
    
]