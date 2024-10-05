import { Flex, Input } from '@chakra-ui/react';

interface InputFieldProps {
  icon: JSX.Element;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  width?: any;
}

export const InputField: React.FC<InputFieldProps> = ({ icon, placeholder, value, name, onChange, type = 'text', width }) => (
  <Flex alignItems="center" flex={1}>
    {icon}
    <Input
      name={name}
      aria-label={placeholder}
      placeholder={placeholder}
      ml={2}
      type={type}
      value={value}
      onChange={onChange}
      borderRadius="md"
      borderColor="gray.300"
      _hover={{ borderColor: 'teal.400' }}
      _focus={{ borderColor: 'teal.500', boxShadow: '0 0 0 1px teal.500' }}
      minWidth={{ base: '240px' }}
      width={width}
    />
  </Flex>
);
