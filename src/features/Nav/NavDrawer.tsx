import React, { useState } from "react";
import { Avatar, Drawer, IconButton, List, ListItem, ListItemText,ListItemButton } from "@mui/material";
//import { MenuIcon } from '@mui/icons-material/Menu'
import DeleteIcon from '@mui/icons-material/Delete';
import { LogoutButton, LoginButton } from "../../features/auth/login"
import { useAuth0 } from "@auth0/auth0-react";

export interface MyContextInterface {
    data: string;
    setData: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const MyContext = React.createContext<MyContextInterface>({
    data: "",
    setData: () => {},
  });

  interface ItemHref {
    itemTitle: string;
    itemHref: string;
  }

interface NavDrawerProps {
    items: ItemHref[];
    isOpen: boolean;
    onClose: () => void;
    onClick: React.MouseEventHandler<HTMLAnchorElement> ;
}

  
  


const NavDrawer: React.FC<NavDrawerProps> = ({ items, isOpen, onClose, onClick }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');

    const { user, isAuthenticated, isLoading } = useAuth0();
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
                            <ListItemButton  href={item.itemHref} key={index} onClick = {onClick}>
                                <ListItemText primary={item.itemTitle} />
                            </ListItemButton>
                        )) : ''}
                        <ListItemButton key={10000} onClick={onClose}>
                            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                        </ListItemButton>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default NavDrawer;