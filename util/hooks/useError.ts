import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface QueryData<T> {
  Response: T;
  Error: any[];
}

export const useError = <T>(data: QueryData<T>) => {
  const toast = useToast();
  const { push } = useRouter();

  React.useEffect(() => {
    if (data && data.Error) {
      data.Error.forEach((error: any) => {
        toast({
          title: "Error",
          description: error.ErrorMessage,
          status: "error",
          duration: 2000,
        });
      });
      push("/");
    }
  }, [data, toast, push]);
};
