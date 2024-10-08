import {
  Form,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  CustomButton,
} from "@/components/ui";
import FormInput from "@/components/form/FormInput";
import Loader from "@/components/Loader";

import { _useMutation } from "@/lib/actions";
import ToastMessage from "@/lib/ToastMessage";
import { employeeAddSchema } from "@/lib/validate";

import { PATH_LIST } from "@/constants/enum";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { svgPaths } from "@/constants";

const EmployeeAdd = () => {
  const { mutateAsync, isPending } = _useMutation({
    models: "EMPLOYEE",
  });

  const toast = ToastMessage();
  const form = useForm<z.infer<typeof employeeAddSchema>>({
    resolver: zodResolver(employeeAddSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof employeeAddSchema>) {
    try {
      await mutateAsync({ path: PATH_LIST.EMPLOYEES, body: values });
      toast({ type: "employeeAdd" });
      form.reset();
    } catch (error) {
      toast({ type: "failed", desc: error });
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <CustomButton svg="auth" className="max-w-[130px]">
          Add
        </CustomButton>
      </SheetTrigger>
      <SheetContent
        className="gradientPanel border-0 bg-transparent"
        style={{ backgroundImage: `url('${svgPaths.panel.path}')` }}
      >
        <SheetHeader className="pt-4">
          <SheetTitle className="text-white">Add an employee</SheetTitle>
          <SheetDescription>
            Add a new employee to the company. Fill in the form below to add a
            new employee.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="authFormInputSize mt-4 flex flex-col">
              <FormInput form={form} label="Name" type="text" field="name" />
              <FormInput form={form} label="Email" type="email" field="email" />
            </div>
            <CustomButton
              className="mt-4"
              disabled={isPending}
              svg="authFinish"
            >
              {isPending ? <Loader /> : `Add`}
            </CustomButton>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EmployeeAdd;
