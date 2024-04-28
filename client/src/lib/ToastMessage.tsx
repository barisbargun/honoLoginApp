import { useToast } from "@/components/ui";
import { AxiosError } from "axios";

type typeVariant = "default" | "destructive";
type actions = "failed" | "register" | "login" | "delete" | "employeeAdd";

const toastActions: Record<
  actions,
  { title: string; description?: string; variant?: typeVariant }
> = {
  failed: {
    title: "Failed!",
    description: "Something went wrong. Please try again.",
  },
  register: {
    title: "Signed up Successfully!",
  },

  login: {
    title: "Signed in Successfully!",
  },

  delete: {
    title: "Deleted Successfully!",
  },

  employeeAdd: {
    title: "Employee added Successfully!",
  },
};

type Props = {
  type: actions;
  title?: string | AxiosError<{ title: string }>;
  desc?: any;
};

const ToastMessage = () => {
  const { toast } = useToast();

  const App = ({ type, desc }: Props) => {
    const defaultMsg = toastActions[type];

    const responseMsg = desc?.response?.data?.message;
    defaultMsg.description =
      typeof responseMsg == "string" ? responseMsg : defaultMsg.description;

      if (type.toLowerCase().includes("fail"))
      return toast({ ...toastActions[type], variant: "destructive" });

    return toast(toastActions[type]);
  };

  return App;
};

export default ToastMessage;
