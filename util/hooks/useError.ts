import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

interface QueryData<T> {
  Response: T;
  Errors: any[];
}

export const useError = <T>(data: QueryData<T>) => {
  const toast = useToast();
  const { push } = useRouter();

  React.useEffect(() => {
    if (data && data.Errors) {
      console.log(data.Errors);
      if (typeof data.Errors === "object")
        data.Errors.forEach((error: any) => {
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
