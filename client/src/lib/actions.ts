import { useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { QUERY_KEYS } from "./react-query/queryKeys"

type Props = {
  models: models;
  methodType?: methods;
  id?: string
}
let queryKeys: string[][];
let _methodType: methods;

type methods = "DELETE" | "POST" | "PATCH";
type models = "EMPLOYEE" | "AUTH" | "NONE";

export const _useMutation = <T>({ models, methodType, id }: Props) => {
  _methodType = methodType || "POST";
  queryKeys = [];

  switch (models) {
    case "EMPLOYEE":
      if (id) queryKeys.push([QUERY_KEYS.GET_EMPLOYEES, id]);
      queryKeys.push([QUERY_KEYS.GET_EMPLOYEES]);
      break;

    default:
      break;
  }

  switch (_methodType) {
    case "DELETE":
      return _useDeleteMutation(queryKeys);

    case "PATCH":
      return _usePatchMutation<T>(queryKeys);

    default:
      return _usePostMutation<T>(queryKeys);
  }
}





/**
 * 
 * useMutation Functions
 *  
 */

// Post Methods
const _usePostMutation = <T>(queryKeys: string[][] = []) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IMutationData<T>) => axios.post(data.path, data.body),
    onSuccess: () => {
      queryKeys.forEach(v => {
        queryClient.invalidateQueries({ queryKey: v });
      })
    }
  })
}

// Patch Methods
const _usePatchMutation = <T>(queryKeys: string[][] = []) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IMutationData<T>) => axios.patch(`${data.path}`, data.body),
    onSuccess: () => {
      queryKeys.forEach(v => {
        queryClient.invalidateQueries({ queryKey: v });
      })
    }
  })
}

// Delete Methods
const _useDeleteMutation = (queryKeys: string[][] = []) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { path: string }) => axios.delete(`${data.path}`),
    onSuccess: () => {
      queryKeys.forEach(v => {
        queryClient.invalidateQueries({ queryKey: v });
      })
    }
  })
}