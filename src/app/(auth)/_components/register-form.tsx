"use client";
import { Button } from "@components/ui/button";
import { InputLabelled } from "@components/ui/input-labelled";
import { AlertCircle, CheckInCircle } from "@geist-ui/icons";
import { register } from "@service/auth.service";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { FormPlaybook } from "@utils/form-utils";

export default function RegisterForm() {
  const {
    register: formRegister,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<UserRegister>();

  const router = useRouter();

  const { mutate: handleRegister, isLoading } = useMutation(register, {
    onSuccess: () => {
      reset();
      toast("Registration successful!", {
        description: "Please login to continue",
      });
      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error(error.message || "An error occurred", {
        icon: <AlertCircle className="h-full " />,
      });
    },
  });

  const submit = (data: UserRegister) => handleRegister(data);

  return (
    <form
      className="w-full h-full  flex flex-col gap-8"
      onSubmit={handleSubmit(submit)}
    >
      <div className="w-full gap-4 flex flex-col">
        <InputLabelled
          placeholder="jose.tano@gmail.com"
          label="Email"
          type="email"
          {...formRegister("email", FormPlaybook.email)}
        >
          {errors.email && <p>{errors.email?.message}</p>}
        </InputLabelled>
        <InputLabelled
          placeholder="Jose Tano"
          label="Name"
          type="text"
          {...formRegister("name", FormPlaybook.name)}
        >
          {errors.name && <p>{errors.name?.message}</p>}
        </InputLabelled>
        <InputLabelled
          placeholder="josetano02"
          label="Username"
          type="text"
          {...formRegister("username", FormPlaybook.username)}
        >
          {errors.username && <p>{errors.username?.message}</p>}
        </InputLabelled>
        <InputLabelled
          placeholder="SuperSecretPassword"
          label="Password"
          type="password"
          {...formRegister("password", FormPlaybook.password)}
        >
          {errors.password && <p>{errors.password?.message}</p>}
        </InputLabelled>
        <InputLabelled
          placeholder="SuperSecretPassword"
          label="Confirm Password"
          type="password"
          {...formRegister("passwordConfirm", {
            validate: (value: string) =>
              value === watch("password") || "Passwords do not match",
          })}
        >
          {errors.passwordConfirm && <p>{errors.passwordConfirm?.message}</p>}
        </InputLabelled>
      </div>
      <div className="flex gap-4 w-full flex-col ">
        <Button disabled={isLoading} className="w-full" type="submit">
          Register
        </Button>
        <Button disabled={isLoading} variant={"outline"} className="w-full">
          Continue with Google
        </Button>
      </div>
    </form>
  );
}
