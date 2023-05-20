import React, { useState } from "react";
import { Avatar, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
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


interface NavDrawerProps {
    items: string[];
    isOpen: boolean;
    onClose: () => void;
}


const NavDrawer: React.FC<NavDrawerProps> = ({ items, isOpen, onClose }) => {
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
                            <ListItem button key={index} onClick={onClose}>
                                <ListItemText primary={item} />
                            </ListItem>
                        )) : ''}
                        <ListItem button key={10000} onClick={onClose}>
                            {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

export default NavDrawer;