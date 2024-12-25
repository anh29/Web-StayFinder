import { InputField } from "components/elements/InputField";
import { FiUser, FiMail, FiPhone, FiLock, FiMapPin } from "react-icons/fi";
import { FormValues } from "./Register";

interface RenderInputFieldsProps {
  formValues: FormValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RenderInputFields: React.FC<RenderInputFieldsProps> = ({
  formValues,
  handleChange,
}) => {
  return (
    <>
      <InputField
        icon={<FiUser />}
        placeholder="Enter your name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        width={{ base: "full", md: "80%" }}
      />
      <InputField
        icon={<FiMail />}
        placeholder="Enter your email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        width={{ base: "full", md: "80%" }}
        type="email"
      />
      <InputField
        icon={<FiPhone />}
        placeholder="Enter your phone"
        name="phone"
        value={formValues.phone}
        onChange={handleChange}
        width={{ base: "full", md: "80%" }}
      />
      <InputField
        icon={<FiMapPin aria-label="Enter your country" />}
        placeholder="Enter your country"
        name="country"
        value={formValues.country}
        onChange={handleChange}
        width={{ base: "full", md: "80%" }}
      />
      <InputField
        icon={<FiLock />}
        placeholder="Enter your password"
        name="password"
        value={formValues.password}
        onChange={handleChange}
        width={{ base: "full", md: "80%" }}
        type="password"
      />
      <InputField
        icon={<FiLock />}
        placeholder="Confirm your password"
        name="passwordConfirm"
        value={formValues.passwordConfirm}
        onChange={handleChange}
        width={{ base: "full", md: "80%" }}
        type="password"
      />
    </>
  );
};

export default RenderInputFields;
