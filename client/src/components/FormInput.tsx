import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  CustomInput,
} from "./ui";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: UseFormReturn<any, any, undefined>;
  field: "username" | "password" | "role" | "email" | "name";
  label: string;
  type: React.HTMLInputTypeAttribute;
};

const FormInput = ({ form, field, label, type }: Props) => {
  return (
    <FormField
      control={form.control}
      name={field}
      render={({ field: fd }) => (
        <FormItem className="relative">
          <FormLabel className="fonts-input">{label}</FormLabel>
          <CustomInput className="!mt-0.5" type={type} {...fd} />
          <FormMessage className="h-3 text-xs" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
