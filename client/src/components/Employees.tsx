import { svgPaths } from "@/constants";
import { useGetEmployees } from "@/lib/data";
import { useContext, useEffect, useMemo } from "react";
import EmployeeTable from "./EmployeeTable";
import { CustomButton } from "./ui";
import { Loader } from ".";
import { _useContext } from "@/context";

const Employees = () => {
  const { data, isPending, isSuccess, error, refetch, isRefetching } = useGetEmployees();
  const refactoredData = useMemo(() => {
    if (data?.length) {
      return data.map((employee) => {
        return {
          ...employee,
          email: employee.email || "",
        };
      });
    }
  }, [data]);

  useEffect(() => {
    refetch();
  },[])
  return (
    <div className="lg:flex-1 gradientPanel min-h-[450px] rounded-2xl max-lg:w-full px-5 py-3 text-white">
      {!isPending && !isSuccess && (
        <CustomButton
        disabled={isPending || isSuccess}
        className="!mt-4"
        svg="authFinish"
        onClick={() => refetch()}
      >
        {isPending ? <Loader /> : "Refetch"}
      </CustomButton>
      )}
      {isPending || isRefetching ? (
        <p>Loading...</p>
      ) : isSuccess && refactoredData ? (
        <EmployeeTable data={refactoredData} />
      ) : (
        <p className="mt-2">{(error as any)?.data?.message}</p>
      )}
    </div>
  );
};

export default Employees;
