import { IconButton } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchIconButton = ({ onOpen }: any) => {
  return (
    <IconButton
      aria-label="Search"
      icon={<SearchIcon />}
      onClick={onOpen}
      position="fixed"
      top="50%"
      zIndex={3}
      right="20px"
      size="lg"
      colorScheme="teal"
      variant="solid"
      borderRadius="full"
      boxShadow="lg"
      _hover={{ transform: 'scale(1.1)', boxShadow: '2xl' }}
      transition="transform 0.2s, box-shadow 0.2s"
    />
  );
};

export default SearchIconButton;
