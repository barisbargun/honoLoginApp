import FormInput from "./FormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/validate";
import { CustomButton, Form } from "./ui";
import ToastMessage from "@/lib/ToastMessage";
import { Loader } from ".";
import { _useMutation } from "@/lib/actions";
import { _useContext } from "@/context";
import { setAccessToken } from "@/lib/axios";

const LoginForm = () => {
  const { mutateAsync, isPending } = _useMutation({
    models: "AUTH",
  });
  const { setIsLogin } = _useContext();
  const toast = ToastMessage();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setIsLogin(false);
      const res = await mutateAsync({ path: "auth", body: values });
      const token = res?.data?.accessToken;
      if (token) {
        await setAccessToken(token);
      }
      toast({ type: "login" });
      setIsLogin(true);
      // form.reset();
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
        </div>
        <CustomButton disabled={isPending} className="!mt-4" svg="authFinish">
          {isPending ? <Loader /> : "Sign in"}
        </CustomButton>
      </form>
    </Form>
  );
};

export default LoginForm;
