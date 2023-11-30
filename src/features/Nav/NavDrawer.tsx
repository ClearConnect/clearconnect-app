import React from "react";
import {  Drawer,  List,  ListItemText, ListItemButton } from "@mui/material";
//import DeleteIcon from '@mui/icons-material/Delete';
import { LogoutButton, LoginButton } from "../../features/auth/login"
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks'

export interface MyContextInterface {
    data: string;
    setData: React.Dispatch<React.SetStateAction<string>>;
}

/* //const MyContext = React.createContext<MyContextInterface>({
//    data: "",
//    setData: () => { },
// //}); */

interface ItemHref {
    itemTitle: string;
    itemHref: string;
}

interface NavDrawerProps {
    items: ItemHref[];
    isOpen: boolean;
    onClose: () => void;
    onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

const NavDrawer: React.FC<NavDrawerProps> = ({ items, isOpen, onClose, onClick }) => {
    const userIdFromAuth0Metadata: number = useAppSelector(state => {
        if (state.tokens.auth0UserMetaData === undefined)
          return 0
        //const { cnt_contact_id } = state.tokens.auth0UserMetaData
        return state.tokens.auth0UserMetaData.cnt_contact_id
      })
    const navigate = useNavigate();
    const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const href: string = event.currentTarget.id as string 
        const navigateRoute = href.replace(':Id', String(userIdFromAuth0Metadata));
        navigate(navigateRoute); // Replace '/your-route' with the actual route you want to navigate to
        onClose()
    };
    //const [selectedOption, setSelectedOption] = useState<string>('');

    const { /* user, */ isAuthenticated/* , isLoading */ } = useAuth0();
    return (
        <div>
            <Drawer anchor="left" open={isOpen} onClose={onClose} sx={{
                position: 'absolute',
                top: '15px',
                left: '5px',
                zIndex: 2,
                opacity: 0.9,
            }}>
                <div style={{ width: 250 }}>
                    <List>
                        {isAuthenticated ? items.map((item, index) => (
                            <ListItemButton component="div" id = {item.itemHref} key={index} onClick={handleButtonClick}>
                                <ListItemText primary={item.itemTitle} />
                            </ListItemButton>
                        )) : ''}
                        <ListItemButton component="div" key={10000} onClick={onClose}>
                            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                        </ListItemButton>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default NavDrawer;