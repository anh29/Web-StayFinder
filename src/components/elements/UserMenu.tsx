import React from 'react';
import { Box, Avatar, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { User } from 'types/user';

const UserMenu: React.FC<{ user: User | null; handleLogout: () => void }> = ({ user, handleLogout }) => {
  return (
    <Box display="flex" justifyContent="flex-end" px="1rem">
      {user ? (
        <Menu>
          <MenuButton display="flex" alignItems="center" gap="1rem">
            <Avatar name={user.name} size="md" bg="#06B3C4" />
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to="/profile">
              Profile
            </MenuItem>
            <MenuItem as={Link} to="/history">
              History Order
            </MenuItem>
            <MenuItem onClick={handleLogout} color="red.500">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Link to="/login">
          <Text
            color="#06B3C4"
            textDecoration="underline"
            fontSize="20px"
            fontWeight="bold"
          >
            Login
          </Text>
        </Link>
      )}
    </Box>
  );
};

export default UserMenu;
