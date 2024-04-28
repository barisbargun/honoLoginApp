import { PATH_LIST } from "@/constants/enum";
import { QUERY_KEYS } from "./react-query/queryKeys";
import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "@/lib/axios";

/**
 * 
 * @returns IEmployee model
 * @description Get all employees
 */
export const useGetEmployees = () => {
  return _useQuery<IEmployee[]>(QUERY_KEYS.GET_EMPLOYEES, PATH_LIST.EMPLOYEES);
}






/**
 * 
 * useQuery Function
 *  
 */
const _useQuery = <T>(query_key: QUERY_KEYS, path: string,
  options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, 'queryKey'>) => {
  return useQuery({
    queryKey: [query_key],
    queryFn: () => axios.get(path)
      .then(res => res.data as T)
      .catch((error: AxiosError) => {
        if (error.response)
          throw error.response;
        throw error;
      }),
    enabled: true,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 30,
    ...options
  })
}