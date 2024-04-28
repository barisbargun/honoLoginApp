import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/validate";
import { CustomButton, Form } from "./ui";
import ToastMessage from "@/lib/ToastMessage";
import { _useMutation } from "@/lib/actions";
import { Loader, FormInput } from ".";
import { PATH_LIST } from "@/constants/enum";

const RegisterForm = () => {
  const { mutateAsync, isPending } = _useMutation({
    models: "NONE",
  });
  const toast = ToastMessage();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "3",
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    try {
      await mutateAsync({ path: PATH_LIST.USER, body: values });
      toast({ type: "register" });
      form.reset();
    } catch (error) {
      toast({ type: "failed", desc: error });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="authFormInputSize flex flex-col">
          <FormInput
            form={form}
            label="Username"
            type="text"
            field="username"
          />
          <FormInput
            form={form}
            label="Password"
            type="password"
            field="password"
          />
          <FormInput form={form} label="Role" type="role" field="role" />
        </div>

        <CustomButton
          disabled={isPending}
          className="!mt-4"
          svg="authFinish"
        >
          {isPending ? <Loader /> : "Sign up"}
        </CustomButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
